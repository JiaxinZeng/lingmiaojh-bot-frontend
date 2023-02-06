<Page class="main-page" pageContent={false}>
    <TaskImport f7router={f7router} type={type} folder={folder} taskFeatures={taskFeatures}/>
</Page>

<script>
  import {
    Page
  } from 'framework7-svelte'
  import TaskImport from '@/widgets/taskImport'

  export let type
  export let f7router
  export let folder
  export let taskFeatures
</script>
