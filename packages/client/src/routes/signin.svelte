<script>
  import * as yup from 'yup/lib'
  import { createForm } from '$lib/createForm'
  import { Container, LogoBox, InputControl } from '$lib/blocks/auth'
  import { auth } from '$lib/actions'
  import { message } from '$lib/components/message'

  const { handleSubmit, errors, state } = createForm({
    initialValues: {
      username: '',
      password: '',
    },
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

  function submit(state: { username: string; password: string }) {
    auth(state)
      .then(() => {
        message.success('登录成功!')
      })
      .catch(() => null)
  }
</script>

<svelte:head>
  <title>登录</title>
</svelte:head>

<Container>
  <LogoBox />
  <form on:submit={handleSubmit(submit)}>
    <InputControl
      placeholder="用户名"
      bind:value={$state.username}
      error={$errors.username}
    />
    <InputControl
      placeholder="密码"
      type="password"
      bind:value={$state.password}
      error={$errors.password}
    />
    <button class="submitbutton" type="submit">登录</button>
  </form>
</Container>
