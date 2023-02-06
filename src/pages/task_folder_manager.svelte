<Page class="main-page" pageContent={false}>
    <FolderManager type={f7route.params.type} f7router={f7router} />
</Page>

<script>
  import { Page, useStore } from 'framework7-svelte'
  import FolderManager from '@/widgets/taskFolderManager'
  import { onMount } from 'svelte'

  export let f7router
  export let f7route

  const titles = {
    1: 'lylml',
    2: 'hjst',
    13: 'ly',
    18: 'jhmz'
  }

  const userInfo = useStore('userInfo')
  onMount(() => {
    document.title = `${userInfo?.nickname} ${titles?.[f7route.params.type]}`
  })
</script>
