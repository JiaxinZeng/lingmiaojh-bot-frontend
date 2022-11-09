<Page class="main-page" pageContent={false}>
    <Management type="5" f7router={f7router} />
</Page>

<script>
  import {
    Page, useStore
  } from 'framework7-svelte'
  import Management from '@/components/management'
  import { onMount } from 'svelte'

  const userInfo = useStore('userInfo')
  onMount(() => {
    document.title = `${userInfo?.nickname} hpj`
  })

  export let f7router
</script>
