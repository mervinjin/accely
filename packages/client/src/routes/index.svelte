<script>
  import Notification from '$lib/components/message/message.svelte'
  import { message, MessageBox } from '$lib/components/message'
  import { onMount } from 'svelte'
</script>

<MessageBox />

<h1>Welcome to SvelteKit</h1>

<button on:click={() => message.info('this is a message')}
  >create message</button
>
