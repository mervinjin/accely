<script>
  export let error: string
</script>

<div class="form-controller">
  <slot />
  {#if error}
    <span class="error">{error}</span>
  {/if}
</div>

<style>
  .form-controller {
    @apply grid gap-1;
  }

  .form-controller > .error {
    @apply text-sm text-red-500;
  }
</style>
