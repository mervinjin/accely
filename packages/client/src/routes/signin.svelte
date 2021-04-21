<script>
  import { fade, fly } from 'svelte/transition'

  let username = ''
  let password = ''
  let error = ''

  function handleSubmit() {
    if (!username) {
      error = '请输入用户名！'
    }
  }
</script>

<slot />

<div class="signin-cotainer">
  <div class="logo-box">
    <img class="logo" alt="logo" src="/logo.svg" />
    <span class="title">Accely</span>
  </div>

  <form class="signin-form" on:submit|preventDefault={handleSubmit}>
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
    {#if error}
      <span class="error" transition:fade>{error}</span>
    {/if}
    <button class="submitbutton" type="submit">登录</button>
  </form>
</div>

<style>
  .signin-cotainer {
    @apply p-10 pt-20 w-full h-full;
    @apply grid gap-16 content-start items-center;
  }

  .logo-box {
    @apply w-full grid justify-self-stretch justify-items-center gap-4;

    > .logo {
      @apply w-32;
    }

    > .title {
      @apply text-3xl text-center font-mono;
    }
  }

  .signin-form {
    @apply mb-10 w-full grid justify-self-stretch gap-4;

    .input {
      @apply px-4 py-2  border-b;
    }

    .error {
      @apply text-sm text-red-500;
    }

    .submitbutton {
      @apply mt-16 p-4 bg-black text-white rounded;
    }
  }
</style>
