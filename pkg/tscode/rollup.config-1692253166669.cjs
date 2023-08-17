'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var commonjs = require('@rollup/plugin-commonjs');
var json = require('@rollup/plugin-json');
var camelCase = require('camel-case');
var fs = require('fs');
var path = require('path');
var minify = require('rollup-plugin-babel-minify');
var typescript = require('rollup-plugin-typescript2');
var walkdir = require('walkdir');
var PKG = require('./package.json');

/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

function regexEscapeString(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

function strUnwrap(input, left, right, flags = '') {
  return input
    .replace(new RegExp('^' + regexEscapeString(left), flags), '')
    .replace(new RegExp(regexEscapeString(right) + '$', flags), '')
}

function tsExtractImports(code) {
  const isFirstLine = /^import /;
  const isFirstLineInMulti = /\{\s*$/;
  const isLastLineInMulti = /^\} from '/;
  const result = [];
  let isMulti = false;
  let impLines = [];
  const lines = code.split(/\r?\n/);
  for (let l = 0; l < lines.length; l++) {
    const line = lines[l];
    if (isFirstLine.test(line)) {
      if (isFirstLineInMulti.test(line)) {
        impLines.push(line);
        isMulti = true;
      } else {
        result.push({
          start: l,
          end: l,
          match: line,
        });
      }
    } else if (isMulti) {
      impLines.push(line);
      if (isLastLineInMulti.test(line)) {
        result.push({
          start: l - impLines.length + 1,
          end: l,
          match: impLines.join('\n'),
        });
        impLines = [];
        isMulti = false;
      }
    }
  }
  return result
}

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
  const builtins = new Set(require('module').builtinModules);
  const srcdir = path.join(pkgroot, 'src');
  const fpaths = walkTsFiles(srcdir, (fpath) => !/node_modules/i.test(fpath));
  const imports = new Set();
  fpaths.forEach((fpath) => {
    tsExtractImports(fs.readFileSync(fpath, 'utf8')).forEach(({ match }) => {
      const imp = strUnwrap(match.substring(match.indexOf('from ') + 5).trim(), "'", "'");
      if (builtins.has(imp)) imports.add(imp);
    });
  });
  return [...imports]
}

function pkgDependenciesRecursive(pkg) {
  const result = new Set([]);
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
        recurse(require(deppath));
      });
  }
  recurse(pkg);
  return [...result]
}

const builtins = require('module').builtinModules;
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
    // resolve(),
    commonjs(),
    json(),
    minify({ comments: false, builtIns: false, mangle: false, removeConsole: false }),
  ],
};

exports.default = rollup_config;
