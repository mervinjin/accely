import sveltePreprocess from 'svelte-preprocess'
import vercel from '@sveltejs/adapter-vercel'
import nested from 'postcss-nested'
import fs from 'fs'

const pkg = JSON.parse(fs.readFileSync('./package.json'))

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: [
    sveltePreprocess({
      defaults: {
        script: 'typescript',
        style: 'postcss',
      },
      postcss: {
        plugins: [nested],
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
