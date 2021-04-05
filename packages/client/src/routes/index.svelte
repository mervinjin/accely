<script>
  import { goto } from '$app/navigation'
  import { message } from '$lib/components/message'
  import { getToken } from '$lib/utils/token'
</script>

<h1>Welcome to SvelteKit</h1>

<button on:click={() => message.info('this is a message')}
  >create message</button
>

<slot />
