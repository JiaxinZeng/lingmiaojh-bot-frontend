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
                    {/if}

                    <Col width="5">
                        <Button tooltip="登录" on:click={onSignInButtonClicked}>
                            <Icon class="font-weight-bold" md="material:login"/>
                        </Button>
                    </Col>

                    {#if type === '2'}
                        <Col width="5">
                            <Button tooltip="重设支付密码" on:click={onResetPaymentPasswordButtonClicked}>
                                <Icon class="font-weight-bold" md="material:shopping_cart"/>
                            </Button>
                        </Col>
                    {/if}

                    <Col width="5">
                        <Button tooltip="删除" on:click={onDeleteButtonClicked}>
                            <Icon class="font-weight-bold" md="material:delete"/>
                        </Button>
                    </Col>

                    {#if type === '' || type === '2'}
                        <Col width="85"></Col>
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
        true,
        '正在删除')
        .then(() => {
          Util.alert.refresh(() => Util.store.getTasks(type, folder.id), true)
        })
    })
  }

  function onSendVerifyCodeButtonClicked () {
    Api.req(() => Api.Task.sendVerifyCode(type, task.mobile),
      true,
      '发送成功',
      '发送失败',
      true,
      '正在发送')
  }

  function onSignInButtonClicked () {
    if (type === '') {
      f7.dialog.prompt('请输入验证码', '登录', (code) => {
        Api.req(() => Api.Task.signInByMobile(type, task.mobile, code),
          true,
          '登录成功',
          '登录失败',
          true,
          '正在登录')
          .then(() => {
            Util.alert.refresh(() => Util.store.getTasks(type, folder.id), true)
          })
      })
    } else if (type === '2') {
      f7.dialog.prompt('请输入密码', '登录', (password) => {
        Api.req(() => Api.Task.signInByUsername(type, task.username, password),
          true,
          '登录成功',
          '登录失败',
          true,
          '正在登录')
          .then(() => {
            Util.alert.refresh(() => Util.store.getTasks(type, folder.id), true)
          })
      })
    }
  }

  function onResetPaymentPasswordButtonClicked () {
    f7.dialog.prompt('请输入密码', '重设支付密码', (password) => {
      Api.req(() => Api.Task.resetPaymentPasswordByUsername(type, task.username, password),
        true,
        '重设成功',
        '重设失败',
        true,
        '正在重设')
        .then(() => {
          Util.alert.refresh(() => Util.store.getTasks(type, folder.id), true)
        })
    })
  }
</script>
