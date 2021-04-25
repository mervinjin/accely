<script>
  import Message from './message.svelte'
  import { messages } from './store'
</script>

<div class="accely-message-box">
  {#each $messages as message (message.id)}
    <Message {...message} />
  {/each}
</div>
