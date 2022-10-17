<Page class="main-page" pageContent={false}>
    <Management type="12" f7router={f7router} />
</Page>

<script>
  import {
    Page, useStore
  } from 'framework7-svelte'
  import Management from '@/components/management'

  let userInfo = useStore('userInfo', newUserInfo => (userInfo = newUserInfo))
  $: document.title = `${userInfo?.nickname} xjh`

  export let f7router
</script>
