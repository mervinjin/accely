<script>
  import * as yup from 'yup'
  import type { TypeOf } from 'yup'
  import { goto } from '$app/navigation'
  import { Container, LogoBox, InputControl } from '$lib/blocks/auth'
  import { createForm } from '$lib/createForm'
  import { signUp } from '$lib/actions'
  import { message } from '$lib/components/message'

  const schema = yup.object().shape({
    username: yup
      .string()
      .default('')
      .min(6, '账号长度需要大于 6 位')
      .required('请输入账户'),
    password: yup
      .string()
      .default('')
      .min(6, '密码长度需要 6 位')
      .required('请输入密码'),
    confirmPassword: yup
      .string()
      .default('')
      .oneOf([yup.ref('password'), null], '密码不匹配'),
  })

  const { handleSubmit, errors, state } = createForm({
    schema,
  })

  function submit(state: TypeOf<typeof schema>) {
    const { confirmPassword: _, ...input } = state

    signUp(input)
      .then(() => {
        message.success('注册成功!')
        goto('/')
      })
      .catch(() => null)
  }
</script>

<svelte:head>
  <title>注册</title>
</svelte:head>

<Container>
  <LogoBox />
  <form on:submit={handleSubmit(submit)}>
    <InputControl
      placeholder="账号"
      bind:value={$state.username}
      error={$errors.username}
    />
    <InputControl
      placeholder="密码"
      type="password"
      bind:value={$state.password}
      error={$errors.password}
    />
    <InputControl
      placeholder="确认密码"
      type="password"
      bind:value={$state.confirmPassword}
      error={$errors.confirmPassword}
    />
    <button class="submitbutton" type="submit">登录</button>
  </form>
</Container>
