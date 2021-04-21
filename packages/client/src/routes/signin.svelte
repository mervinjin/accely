<div class="signin-cotainer">
  <div class="logo-box">
    <img class="logo" alt="logo" src="/logo.svg" />
    <span class="title">Accely</span>
  </div>
</div>

<style lang="postcss">
  .signin-cotainer {
    @apply w-full h-full;
    @apply grid justify-center content-center items-center;
  }

  .logo-box {
    @apply w-full grid justify-center gap-4;

    > .logo {
      @apply w-36;
    }

    > .title {
      @apply text-4xl text-center font-mono;
    }
  }
</style>
