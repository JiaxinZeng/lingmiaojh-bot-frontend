<script>
  import ActionBar from '@/components/actionBar'
  import {
    BlockTitle,
    Button,
    Col,
    Icon,
    PageContent,
    Row, Treeview, TreeviewItem,
    useStore
  } from 'framework7-svelte'
  import _ from 'lodash'
  import { onMount } from 'svelte'
  import { Svrollbar } from 'svrollbar'

  export let f7router

  const tasks = useStore('tasks')
  let groupedTasks
  let viewport
  let contents

  onMount(() => {
    groupedTasks = _.groupBy(tasks, 'inviter')
  })
</script>

<ActionBar class="margin-bottom-half">
    <Row noGap>
        <Col width="100">
            <BlockTitle class="title">邀请人统计</BlockTitle>
        </Col>
    </Row>
    <div class="margin-top-half display-flex flex-flow-wrap">
        <div>
            <Button on:click={() => f7router.back()}>
                <Icon class="font-weight-bold" md="material:arrow_back"/>
                <span class="font-weight-bold">返回</span>
            </Button>
        </div>
    </div>
</ActionBar>
<PageContent>
    <div bind:this={viewport} class="scrollable-container">
        <div bind:this={contents}>
            {#if groupedTasks}
                <Treeview>
                    {#each Object.keys(groupedTasks) as key}
                        <TreeviewItem itemToggle>
                            <div slot="label">
                                <span class="font-weight-bold">组&nbsp;</span>{key}&nbsp;&nbsp;<span class="font-weight-bold">合计&nbsp;</span>{groupedTasks[key].length}
                            </div>
                            {#each groupedTasks[key] as task}
                                <TreeviewItem itemToggle label={task.name}>
                                    <TreeviewItem>
                                        <div slot="label">
                                            <span class="font-weight-bold">消息&nbsp;</span>{task.msg}
                                        </div>
                                    </TreeviewItem>
                                    <TreeviewItem>
                                        <div slot="label">
                                            <span class="font-weight-bold">余额&nbsp;</span>{task.coin}
                                        </div>
                                    </TreeviewItem>
                                    <TreeviewItem>
                                        <div slot="label">
                                            <span class="font-weight-bold">创建时间&nbsp;</span>{new Date(task.created_at).toLocaleString()}
                                        </div>
                                    </TreeviewItem>
                                </TreeviewItem>
                            {/each}
                        </TreeviewItem>
                    {/each}
                </Treeview>
            {/if}
        </div>
    </div>
    <Svrollbar {viewport} {contents} />
</PageContent>
