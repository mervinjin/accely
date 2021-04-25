<div class="container">
  <slot />
</div>

<style>
  .container {
    @apply p-10 pt-20 w-full h-full;
    @apply grid gap-16 content-start items-center;
  }

  .container :global(form) {
    @apply mb-10 w-full grid justify-self-stretch gap-4;
  }

  .container :global(form > .submitbutton) {
    @apply mt-16 p-4 bg-black text-white rounded;
  }
</style>
