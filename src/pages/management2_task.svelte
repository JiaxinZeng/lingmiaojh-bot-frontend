<Page class="main-page" pageContent={false}>
    <ManagementTask type="2" folder={folder} f7router={f7router} />
</Page>

<script>
  import { Page } from 'framework7-svelte'
  import ManagementTask from '@/components/managementTask'

  export let f7router
  export let folder
</script>
