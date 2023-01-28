<Page class="main-page" pageContent={false}>
    <TaskManager type={f7route.params.type} folder={folder} f7router={f7router}/>
</Page>

<script>
  import { Page } from 'framework7-svelte'
  import TaskManager from '@/widgets/taskManager'

  export let f7router
  export let f7route
  export let folder
</script>
