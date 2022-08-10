<ListItem class="task-list-item"
          title={`${task?.mobile ?? task?.username}`}
          link
          header={`最新消息:${task.msg}`}
          footer={`余额:${task.coin}`}
>
    <div slot="media" class="display-flex align-items-center justify-content-center flex-direction-column">
        <Row noGap>
            {#if task.status === 0}
                <Icon md="material:warning" size="24"/>
            {:else if task.status === 1}
                <Icon md="material:pending" size="24"/>
            {/if}
        </Row>
        <Row noGap class="text-align-center">
            <span class="font-size-12px">
                {#if task.status === 0}
                    待登录
                {:else if task.status === 1}
                    运行中
                {/if}
            </span>
        </Row>
    </div>
</ListItem>

<script>
  import '@/css/task_list_item.scss'
  import {
    Icon,
    ListItem,
    Row
  } from 'framework7-svelte'

  export let task
</script>
