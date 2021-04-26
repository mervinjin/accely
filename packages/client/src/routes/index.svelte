<script>
  import { message } from '$lib/components/message'
</script>

<h1>Welcome to SvelteKit</h1>

<button on:click={() => message.info('this is a message')}
  >create message</button
>

<slot />
