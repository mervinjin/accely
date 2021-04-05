<svelte:options immutable />

<script>
  import { onDestroy } from 'svelte'
  import { fly } from 'svelte/transition'
  import { removeMessage } from './store'

  export let id: string
  export let type: 'success' | 'info' | 'warning' | 'error' = 'info'
  export let content: string
  export let duration: number = 3000

  $: timeout = setTimeout(() => {
    removeMessage(id)
  }, duration)

  onDestroy(() => {
    if (timeout) {
      clearTimeout(timeout)
    }
  })
</script>

<div
  class="accely-notification"
  class:-success={type === 'success'}
  class:-info={type === 'info'}
  class:-warning={type === 'warning'}
  class:-error={type === 'error'}
  transition:fly={{ duration: 500 }}
>
  {content}
</div>

<style>
  .accely-notification {
    @apply px-4 py-3 inline-flex  justify-center items-center rounded shadow-xl;
    @apply bg-blue-500 text-white;
  }

  .-success {
    @apply bg-green-500;
  }

  .-warning {
    @apply bg-yellow-500;
  }

  .-error {
    @apply bg-red-500;
  }
</style>
