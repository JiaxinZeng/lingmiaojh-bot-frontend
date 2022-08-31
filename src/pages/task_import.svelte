<Page class="padding display-flex flex-flow-column" pageContent={false}>
    <TaskImport f7router={f7router} type={type} folder={folder}/>
</Page>

<script>
  import {
    Page
  } from 'framework7-svelte'
  import TaskImport from '@/components/taskImport'

  export let type
  export let f7router
  export let folder
</script>
