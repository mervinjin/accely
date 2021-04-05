<script>
  import Message from './message.svelte'
  import { messages } from './store'
</script>

<div class="accely-messagebox">
  {#each $messages as message (message.id)}
    <Message {...message} />
  {/each}
</div>

<style>
  .accely-messagebox {
    @apply fixed left-2/4 pt-10 transform -translate-x-2/4;
    @apply grid gap-5;
  }
</style>
