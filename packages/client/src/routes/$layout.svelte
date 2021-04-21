<script>
  import { MessageBox } from '$lib/components/message'
  import '../app.postcss'
</script>

<MessageBox />

<slot />

<style global>
  html,
  body,
  #svelte {
    width: 100%;
    height: 100%;
  }
</style>
