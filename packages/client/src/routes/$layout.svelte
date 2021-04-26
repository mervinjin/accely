<script>
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import {} from '$app/paths'
  import { getToken } from '$lib/utils/token'
  import { MessageBox } from '$lib/components/message'
  import '../app.postcss'

  onMount(() => {
    console.log(location.pathname)
    const authRoute = ['/signin', '/signup']
    if (!authRoute.includes(location.pathname) && !getToken()) {
      goto('/signin')
    }
  })
</script>

<MessageBox />

<slot />
