<List class="no-margin task-list" mediaList noHairlines>
    {#each tasks as task}
        <TaskListItem folder={folder} type={type} task={task}/>
    {/each}
</List>

<script>
  import './task_list.scss'
  import {
    List
  } from 'framework7-svelte'
  import TaskListItem from './task_list_item.svelte'

  export let folder
  export let type = ''
  export let tasks
</script>
