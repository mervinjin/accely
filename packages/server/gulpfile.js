const esbuild = require('esbuild')
const { watch, parallel, series } = require('gulp')
const nodemon = require('gulp-nodemon')
const { nodeExternalsPlugin } = require('esbuild-node-externals')

/** @type {Parameters<typeof esbuild.build>[0]} */
const options = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  sourcemap: true,
  outdir: 'dist',
  platform: 'node',
  target: ['node14', 'es2020'],
  external: ['@generated'],
  plugins: [nodeExternalsPlugin()],
}

async function build() {
  return esbuild.build(options).catch(() => process.exit(1))
}

async function watchSrc() {
  return watch(['src/**/*'], build)
}

async function serve(done) {
  return nodemon({
    script: 'dist/index.js',
    done: done,
  })
}

exports.build = build
exports.dev = parallel(series(build, watchSrc), serve)
