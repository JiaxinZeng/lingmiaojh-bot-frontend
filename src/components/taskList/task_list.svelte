<List class="no-margin task-list" mediaList noHairlines>
    {#each tasks as task}
        <TaskListItem type={type} task={task}/>
    {/each}
</List>

<script>
  import '@/css/task_list.scss'
  import {
    List,
    useStore
  } from 'framework7-svelte'
  import TaskListItem from './task_list_item.svelte'
  import store from '@/js/store'
  import { onMount } from 'svelte'
  import _ from 'lodash'

  export let folder
  export let type = ''

  onMount(() => {
    store.dispatch(`getTask${type}s`, folder.id)
  })

  let tasks = useStore(`task${type}s`, newTasks => (tasks = _.sortBy(newTasks, function (task) {
    return task.status
  })))
</script>
