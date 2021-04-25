<script>
  import * as yup from 'yup/lib'

  import { createForm } from '$lib/createForm'
  import InputControl from '$lib/blocks/auth/input-control.svelte'
  import Container from '$lib/blocks/auth/container.svelte'
  import LogoBox from '$lib/blocks/auth/logo-box.svelte'

  const { handleSubmit, errors, state } = createForm({
    schema: yup.object().shape({
      username: yup
        .string()
        .min(6, '用户名长度不能小于 6 位')
        .defined('请输入用户名'),
      password: yup
        .string()
        .min(6, '密码长度不能小于 6 位')
        .defined('请输入密码'),
    }),
  })
</script>

<Container>
  <LogoBox />
  <form on:submit={handleSubmit(console.log)}>
    <InputControl
      placeholder="用户名"
      value={$state.username}
      error={$errors.username}
    />
    <InputControl
      placeholder="密码"
      type="password"
      value={$state.password}
      error={$errors.password}
    />
    <button class="submitbutton" type="submit">登录</button>
  </form>
</Container>
