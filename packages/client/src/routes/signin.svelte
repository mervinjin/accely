<script>
  import * as yup from 'yup'
  import type { TypeOf } from 'yup'
  import { goto } from '$app/navigation'
  import { Container, LogoBox, InputControl } from '$lib/blocks/auth'
  import { createForm } from '$lib/createForm'
  import { signIn } from '$lib/actions'
  import { message } from '$lib/components/message'

  const schema = yup.object().shape({
    username: yup.string().default('').required('请输入用户名'),
    password: yup.string().default('').required('请输入密码'),
  })

  const { handleSubmit, errors, state } = createForm({
    schema,
  })

  function submit(state: TypeOf<typeof schema>) {
    signIn(state)
      .then(() => {
        message.success('登录成功!')

        if (location.pathname === '/signin') {
          goto('/')
        }
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
