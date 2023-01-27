<Page class="main-page" pageContent={false}>
    <Management type={f7route.params.type} f7router={f7router} />
</Page>

<script>
  import { Page, useStore } from 'framework7-svelte'
  import Management from '@/widgets/management'
  import { onMount } from 'svelte'

  export let f7router
  export let f7route

  const titles = {
    1: 'lylml',
    2: 'hjst'
  }

  const userInfo = useStore('userInfo')
  onMount(() => {
    document.title = `${userInfo?.nickname} ${titles?.[f7route.params.type]}`
  })
</script>
