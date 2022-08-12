<ListItem class="task-list-item"
          title={`${task?.mobile ?? task?.username}`}
          link
          header={`最新消息:${task.msg}`}
          footer={`余额:${task.coin}`}
          accordionItem
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
    <AccordionContent>
        <Card noShadow class="no-margin">
            <CardContent class="no-padding-top">
                <Row noGap>
                    {#if type === ''}
                        <Col width="5">
                            <Button tooltip="发送验证码" on:click={onSendVerifyCodeButtonClicked}>
                                <Icon class="font-weight-bold" md="material:outgoing_mail"/>
                            </Button>
                        </Col>
                        <Col width="5">
                            <Button tooltip="重输验证码">
                                <Icon class="font-weight-bold" md="material:mark_email_read"/>
                            </Button>
                        </Col>
                    {:else if type === '2'}
                        <Col width="5">
                            <Button tooltip="重设密码">
                                <Icon class="font-weight-bold" md="material:lock"/>
                            </Button>
                        </Col>
                    {/if}

                    <Col width="5">
                        <Button tooltip="删除" on:click={onDeleteButtonClicked}>
                            <Icon class="font-weight-bold" md="material:delete"/>
                        </Button>
                    </Col>

                    {#if type === ''}
                        <Col width="85"></Col>
                    {:else if type === '2'}
                        <Col width="90"></Col>
                    {/if}
                </Row>
                <Row noGap class="margin-top-half">
                    <Col width="100">
                        <span>下次执行时间:{new Date(task.next_executed_at).toLocaleString()}</span>
                    </Col>
                </Row>
                <Row noGap>
                    <Col width="100">
                        <span class="word-break-break-all">Token:{task.token}</span>
                    </Col>
                </Row>
            </CardContent>
        </Card>
    </AccordionContent>
</ListItem>

<script>
  import './task_list_item.scss'
  import {
    AccordionContent,
    Button,
    Card,
    CardContent,
    Col,
    f7,
    Icon,
    ListItem,
    Row
  } from 'framework7-svelte'
  import Api from '@/js/api'
  import Util from '@/js/util'

  export let task
  export let folder
  export let type = ''

  function onDeleteButtonClicked () {
    f7.dialog.confirm('确定删除该任务吗?', '删除任务', () => {
      let deleteFunc = Api.Task.deleteTaskByMobile
      if (type === '2') {
        deleteFunc = Api.Task.deleteTaskByUsername
      }
      Api.req(() => deleteFunc(type, task.mobile ?? task.username),
        true,
        '删除成功',
        '删除失败',
        () => Util.store.getTasks(type, folder.id),
        null,
        true,
        '正在删除'
      )
    })
  }

  function onSendVerifyCodeButtonClicked () {
    Api.req(() => Api.Task.sendVerifyCode(type, task.mobile),
      true,
      '发送成功',
      '发送失败',
      null,
      null,
      true,
      '正在发送'
    )
  }
</script>
