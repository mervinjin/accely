<div class="login-container">
  <div class="logo-box">
    <img class="logo" alt="logo" src="/logo.svg" />
    <span class="title">Accely</span>
  </div>
</div>

<style lang="postcss">
  .login-container {
    @apply w-full h-full;
    @apply grid justify-center content-center;
  }

  .logo-box {
    @apply w-full grid justify-center gap-4;

    .logo {
    }
  }

  .logo-box > .logo {
    @apply w-36;
  }

  .logo-box > .title {
    @apply text-4xl font-mono;
  }
</style>
