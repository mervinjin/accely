<script>
  let username = ''
  let password = ''
</script>

<div class="signin-cotainer">
  <div class="logo-box">
    <img class="logo" alt="logo" src="/logo.svg" />
    <span class="title">Accely</span>
  </div>

  <form class="signin-form">
    <input
      class="input"
      name="username"
      placeholder="用户名"
      bind:value={username}
    />
    <input
      class="input"
      name="passowrd"
      placeholder="密码"
      bind:value={password}
    />
    <button class="submitbutton">登录</button>
  </form>
</div>

<style lang="postcss">
  .signin-cotainer {
    @apply p-8 w-full h-full;
    @apply grid gap-16 justify-center content-center items-center;
  }

  .logo-box {
    @apply w-full grid justify-center justify-items-center gap-4;

    > .logo {
      @apply w-32;
    }

    > .title {
      @apply text-3xl text-center font-mono;
    }
  }

  .signin-form {
    @apply grid justify-center gap-4;

    .input {
      @apply px-4 py-2 w-72 border-b;
    }

    .submitbutton {
      @apply mt-16 p-4  bg-black text-white rounded;
    }
  }
</style>
