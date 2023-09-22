export interface ITSConfig {
  compileOnSave?: boolean
  compilerOptions?: {
    allowJs?: boolean
    allowSyntheticDefaultImports?: boolean
    allowUnreachableCode?: boolean
    allowUnusedLabels?: boolean
    alwaysStrict?: boolean
    baseUrl?: string
    charset?: string
    checkJs?: boolean
    declaration?: boolean
    declarationDir?: string
    declarationMap?: boolean
    diagnostics?: boolean
    downlevelIteration?: boolean
    emitBOM?: boolean
    emitDeclarationOnly?: boolean
    emitDecoratorMetadata?: boolean
    experimentalDecorators?: boolean
    forceConsistentCasingInFileNames?: boolean
    importHelpers?: boolean
    inlineSourceMap?: boolean
    inlineSources?: boolean
    isolatedModules?: boolean
    jsx?: 'preserve' | 'react-native' | 'react' | 'react-jsx' | 'react-jsxdev'
    lib?: string[]
    locale?: string
    mapRoot?: string
    maxNodeModuleJsDepth?: number
    module?: 'none' | 'commonjs' | 'amd' | 'system' | 'umd' | 'es6' | 'es2015' | 'es2020' | 'esnext'
    moduleResolution?: 'node' | 'classic'
    newLine?: 'CRLF' | 'LF'
    noEmit?: boolean
    noEmitHelpers?: boolean
    noEmitOnError?: boolean
    noErrorTruncation?: boolean
    noFallthroughCasesInSwitch?: boolean
    noImplicitAny?: boolean
    noImplicitReturns?: boolean
    noImplicitThis?: boolean
    noUnusedLocals?: boolean
    noUnusedParameters?: boolean
    noImplicitUseStrict?: boolean
    noLib?: boolean
    noResolve?: boolean
    outDir?: string
    outFile?: string
    paths?: { [key: string]: string[] }
    preserveConstEnums?: boolean
    preserveSymlinks?: boolean
    project?: string
    reactNamespace?: string
    removeComments?: boolean
    rootDir?: string
    rootDirs?: string[]
    skipLibCheck?: boolean
    sourceMap?: boolean
    sourceRoot?: string
    strict?: boolean
    strictNullChecks?: boolean
    suppressExcessPropertyErrors?: boolean
    suppressImplicitAnyIndexErrors?: boolean
    target?: 'ES3' | 'ES5' | 'ES6' | 'ES2015' | 'ES2016' | 'ES2017' | 'ES2018' | 'ES2019' | 'ES2020' | 'ESNext'
    traceResolution?: boolean
    types?: string[]
    typeRoots?: string[]
    useDefineForClassFields?: boolean
  }
  exclude?: string[]
  files?: string[]
  include?: string[]
  references?: { path: string }[]
  extends?: string
}
