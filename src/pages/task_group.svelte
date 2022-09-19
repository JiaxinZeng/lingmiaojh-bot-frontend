<Page class="main-page" pageContent={false}>
    <TaskGroup f7router={f7router}/>
</Page>

<script>
  import {
    Page
  } from 'framework7-svelte'
  import TaskGroup from '@/components/taskGroup'

  export let f7router
</script>
