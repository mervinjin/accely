<script context="module">
  import type { Load } from '@sveltejs/kit'

  const authPages = ['/signin', '/signup']

  export function load({ page }: Parameters<Load>[0]): ReturnType<Load> {
    return {
      props: {
        isAuthPage: authPages.includes(page.path),
      },
    }
  }
</script>

<script>
  import { MessageBox } from '$lib/components/message'
  import { accessToken } from '$lib/stores'
  import Signin from './signin.svelte'
  import '../app.postcss'

  export let isAuthPage: boolean

  $: needAuth = !isAuthPage && $accessToken === null
</script>

<MessageBox />

{#if needAuth}
  <Signin />
{:else}
  <slot />
{/if}
