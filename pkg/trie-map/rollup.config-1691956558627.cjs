'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var nodeUtil = require('@bemoje/node-util');
var commonjs = require('@rollup/plugin-commonjs');
var json = require('@rollup/plugin-json');
var resolve = require('@rollup/plugin-node-resolve');
var camelCase = require('camel-case');
var fs = require('fs');
var path = require('path');
var minify = require('rollup-plugin-babel-minify');
var typescript = require('rollup-plugin-typescript2');
var walkdir = require('walkdir');
var PKG = require('./package.json');

function walkTsFiles(srcdir, filter, options) {
  const result = [];
  walkdir.sync(srcdir, options, (filepath, stat) => {
    if (!stat.isFile()) return
    if (!/\.ts$/i.test(filepath)) return
    if (/\..+\.ts$/i.test(filepath)) return
    if (!filter(filepath, stat)) return
    result.push(filepath);
  });
  return result
}

function getImportedBuiltins(pkgroot) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
  const builtins = new Set(require('module').builtinModules);
  const srcdir = path.join(pkgroot, 'src');
  const fpaths = walkTsFiles(srcdir, (fpath) => !/node_modules/i.test(fpath));
  const imports = new Set();
  fpaths.forEach((fpath) => {
    nodeUtil.tsExtractImports(fs.readFileSync(fpath, 'utf8')).forEach(({ match }) => {
      const imp = nodeUtil.strUnwrap(match.substring(match.indexOf('from ') + 5).trim(), "'", "'");
      if (builtins.has(imp)) imports.add(imp);
    });
  });
  return [...imports]
}

function pkgDependenciesRecursive(pkg) {
  const result = new Set(['walkdir', '@bemoje/node-util']);
  // eslint-disable-next-line no-undef
  const root = path.dirname(path.dirname(process.cwd()));
  function recurse(pkg) {
    const deps = Object.keys(pkg.dependencies);
    deps.forEach((dep) => result.add(dep));
    deps
      .filter((dep) => dep.startsWith('@bemoje/'))
      .map((dep) => dep.substring(8))
      .forEach((dep) => {
        const deppath = path.join(root, 'pkg', dep, 'package.json');
        if (!fs.existsSync(deppath)) return
        getImportedBuiltins(path.join(root, 'pkg', dep)).forEach((imp) => result.add(imp));
        // eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires
        recurse(require(deppath));
      });
  }
  recurse(pkg);
  return [...result]
}

// eslint-disable-next-line no-undef
const builtins = getImportedBuiltins(__dirname);
const external = [...pkgDependenciesRecursive(PKG), ...builtins];

if (PKG.browser && (PKG.preferGlobal || builtins.length)) {
  Reflect.deleteProperty(PKG, 'browser');
  fs.writeFileSync('./package.json', JSON.stringify(PKG, null, 2));
}
if (PKG.module && PKG.preferGlobal) {
  Reflect.deleteProperty(PKG, 'module');
  fs.writeFileSync('./package.json', JSON.stringify(PKG, null, 2));
}

const name = camelCase.camelCase(PKG.name.replace(/^@bemoje/i, ''));

const banner = `/*!
 * ${PKG.name} v${PKG.version}
 * (c) ${PKG.author.name}
 * Released under the ${PKG.license} License.
 */
`;
const output = [];
if (PKG.browser)
  output.push({
    banner,
    name,
    file: PKG.browser,
    format: 'umd',
  });
if (PKG.main)
  output.push({
    banner,
    name,
    exports: 'named',
    sourcemap: true,
    file: PKG.main,
    format: 'commonjs',
  });
if (PKG.module)
  output.push({
    banner,
    name,
    exports: 'named',
    sourcemap: true,
    file: PKG.module,
    format: 'esm',
  });

var rollup_config = {
  input: './src/index.ts',
  external,
  output,
  plugins: [
    typescript({
      clean: true,
      useTsconfigDeclarationDir: true,
      tsconfig: './tsconfig.bundle.json',
    }),
    resolve(),
    commonjs(),
    json(),
    minify({ comments: false, builtIns: false, mangle: false, removeConsole: false }),
  ],
};

exports.default = rollup_config;
