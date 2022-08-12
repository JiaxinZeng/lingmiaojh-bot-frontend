<List class="no-margin task-list" mediaList noHairlines>
    {#each tasks as task}
        <TaskListItem folder={folder} type={type} task={task}/>
    {/each}
</List>

<script>
  import './task_list.scss'
  import {
    List,
    useStore
  } from 'framework7-svelte'
  import TaskListItem from './task_list_item.svelte'
  import { onMount } from 'svelte'
  import _ from 'lodash'
  import Util from '@/js/util'

  export let folder
  export let type = ''

  onMount(() => {
    Util.store.getTasks(type, folder.id)
  })

  let tasks = useStore(`task${type}s`, newTasks => (tasks = _.sortBy(newTasks, function (task) {
    return task.status
  })))
</script>
