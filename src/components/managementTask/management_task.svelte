<script>
  import ActionBar from '@/components/actionBar'
  import {
    BlockTitle,
    Button,
    Col,
    Icon,
    PageContent,
    Row,
    useStore
  } from 'framework7-svelte'
  import TaskList from '@/components/taskList'
  import TaskFilterDialog from '@/components/taskFilterDialog'
  import TaskCreateDialog from '@/components/taskCreateDialog'
  import utils from '@/js/utils'
  import './management_task.scss'
  import { afterUpdate, onMount } from 'svelte'
  import _ from 'lodash'
  import { Svrollbar } from 'svrollbar'
  import framework7 from 'framework7'

  export let folder
  export let f7router
  export let type = ''

  const paramFolder = framework7.utils.parseUrlQuery(window.location.href)?.folder

  onMount(() => {
    if (folder?.id) {
      utils.store.getTasks(type, folder.id)
    }
  })
  afterUpdate(() => {
    contents = document.querySelector('.task-list')
  })

  let tasks = useStore('tasks', newTasks => (tasks = _.sortBy(newTasks, function (task) {
    return task.status
  })))

  let viewport
  let contents

  let queryDialog
  let createDialog

  function onImportButtonClick () {
    f7router.navigate('/task_import/', {
      props: {
        type,
        folder
      }
    })
  }

  function onCreateButtonClick () {
    createDialog.open()
  }

  function onRefreshButtonClick () {
    utils.progress.loading(() => utils.store.getTasks(type, folder.id), false)
  }

  function onFilterButtonClick () {
    queryDialog.open()
  }

  function onGroupButtonClick () {
    f7router.navigate('/task_group/')
  }
</script>

{#if folder}
    <ActionBar class="margin-bottom-half">
        <Row noGap>
            <Col width="100">
                <BlockTitle class="title">{folder.name}</BlockTitle>
            </Col>
        </Row>
        <div class="margin-top-half display-flex flex-flow-wrap">
            {#if !paramFolder}
                <div>
                    <Button on:click={() => f7router.back()}>
                        <Icon class="font-weight-bold" md="material:arrow_back"/>
                        <span class="font-weight-bold">返回</span>
                    </Button>
                </div>
            {/if}
            <div>
                <Button on:click={onRefreshButtonClick}>
                    <Icon class="font-weight-bold" md="material:refresh"/>
                    <span class="font-weight-bold">刷新</span>
                </Button>
            </div>
            <div>
                <Button on:click={onCreateButtonClick}>
                    <Icon class="font-weight-bold" md="material:add"/>
                    <span class="font-weight-bold">添加</span>
                </Button>
            </div>
            <div>
                <Button on:click={onImportButtonClick}>
                    <Icon class="font-weight-bold" md="material:download"/>
                    <span class="font-weight-bold">导入</span>
                </Button>
            </div>
            <div>
                <Button on:click={onFilterButtonClick}>
                    <Icon class="font-weight-bold" md="material:filter_alt"/>
                    <span class="font-weight-bold">筛选</span>
                </Button>
            </div>
            <div>
                <Button on:click={onGroupButtonClick}>
                    <Icon class="font-weight-bold" md="material:account_tree"/>
                    <span class="font-weight-bold">统计</span>
                </Button>
            </div>
        </div>
    </ActionBar>
    <PageContent class="management-task-page-content">
        <div bind:this={viewport} class="scrollable-container">
            {#key tasks}
                <TaskList parent={viewport} type={type} folder={folder} tasks={tasks}/>
            {/key}
        </div>
        {#key contents}
            <Svrollbar {viewport} {contents}/>
        {/key}
    </PageContent>
    <div class="font-weight-bold font-size-12px margin-top-half">总计{tasks.length}&nbsp;|&nbsp;离线{
      tasks.reduce((total, task) => {
        if (task.status === 0) {
          total++
        }
        return total
      }, 0)}&nbsp;|&nbsp;在线{
      tasks.reduce((total, task) => {
        if (task.status === 1) {
          total++
        }
        return total
      }, 0)}&nbsp;|&nbsp;新增{
      tasks.reduce((total, task) => {
        const createdAt = new Date(task.created_at)
        if (createdAt <= new Date().setHours(23, 59, 59, 999) && createdAt >= new Date().setHours(0, 0, 0, 0)) {
          total++
        }
        return total
      }, 0)}
    </div>
{/if}
<TaskCreateDialog bind:this={createDialog} type={type} folder={folder} />
<TaskFilterDialog bind:this={queryDialog} />
