const sveltePreprocess = require('svelte-preprocess')
const vercel = require('@sveltejs/adapter-vercel')
const pkg = require('./package.json')

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
  preprocess: [
    sveltePreprocess({
      defaults: {
        script: 'typescript',
        style: 'postcss',
      },
      postcss: {
        plugins: [require('postcss-nested')],
      },
    }),
  ],
  kit: {
    adapter: vercel(),
    target: '#svelte',
    vite: {
      ssr: {
        noExternal: Object.keys(pkg.dependencies || {}),
      },
    },
  },
}
