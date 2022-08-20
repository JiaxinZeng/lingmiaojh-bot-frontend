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
                            <Button tooltip="发送验证码" on:click={onSendVerifyCodeButtonClick}>
                                <Icon class="font-weight-bold" md="material:outgoing_mail"/>
                            </Button>
                        </Col>
                    {/if}

                    <Col width="5">
                        <Button tooltip="登录" on:click={onSignInButtonClick}>
                            <Icon class="font-weight-bold" md="material:login"/>
                        </Button>
                    </Col>

                    {#if type === '2'}
                        <Col width="5">
                            <Button tooltip="重设支付密码" on:click={onResetPaymentPasswordButtonClick}>
                                <Icon class="font-weight-bold" md="material:shopping_cart"/>
                            </Button>
                        </Col>
                    {/if}

                    <Col width="5">
                        <Button tooltip="删除" on:click={onDeleteButtonClick}>
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

  function onDeleteButtonClick () {
    f7.dialog.confirm('确定删除该任务吗?', '删除任务', () => {
      let deleteFunc = Api.Task.deleteTaskByMobile
      if (type === '2') {
        deleteFunc = Api.Task.deleteTaskByUsername
      }
      Api.req(() => deleteFunc(type, task.mobile ?? task.username), true, true, '删除成功', '删除失败', '正在删除')
        .then(() => {
          Util.alert.refresh(() => Util.store.getTasks(type, folder.id), true)
        })
    })
  }

  function onSendVerifyCodeButtonClick () {
    Api.req(() => Api.Task.sendVerifyCode(type, task.mobile), true, true, '发送成功', '发送失败', '正在发送')
  }

  function onSignInButtonClick () {
    if (type === '') {
      f7.dialog.prompt('请输入验证码', '登录', (code) => {
        Api.req(() => Api.Task.signInByMobile(type, task.mobile, code), true, true, '登录成功', '登录失败', '正在登录')
          .then(() => {
            Util.alert.refresh(() => Util.store.getTasks(type, folder.id), true)
          })
      })
    } else if (type === '2') {
      f7.dialog.prompt('请输入密码', '登录', (password) => {
        Api.req(() => Api.Task.signInByUsername(type, task.username, password), true, true, '登录成功', '登录失败',
          '正在登录')
          .then(() => {
            Util.alert.refresh(() => Util.store.getTasks(type, folder.id), true)
          })
      })
    }
  }

  function onResetPaymentPasswordButtonClick () {
    f7.dialog.password('请输入密码', '重设支付密码', (password) => {
      Api.req(() => Api.Task.resetPaymentPasswordByUsername(type, task.username, password), true, true, '重设成功',
        '重设失败', '正在重设')
        .then(() => {
          Util.alert.refresh(() => Util.store.getTasks(type, folder.id), true)
        })
    })
  }
</script>
