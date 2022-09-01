<List
        class="no-margin task-list"
        mediaList
        ul={false}
        noHairlines
        accordionList
        virtualList
        virtualListParams={{
          items: tasks,
          renderExternal,
          height: 80.8
        }}
>
    <ul>
        {#each vlData.items as task, index (index)}
            <ListItem class="task-list-item"
                      title={`${task.name}`}
                      link
                      header={`消息:${task.msg}`}
                      footer={`余额:${task.coin}`}
                      accordionItem
                      virtualListIndex={tasks.indexOf(task)}
                      style={`top: ${vlData.topPosition}px`}
            >
                <div slot="media"
                     class="display-flex align-items-center width-100 justify-content-center flex-direction-column">
                    <Row noGap>
                        {#if task.status === 0}
                            <Icon md="material:error" size="24"/>
                        {:else if task.status === 1}
                            <Icon md="material:pending" size="24"/>
                        {/if}
                    </Row>
                    <Row noGap class="text-align-center font-weight-bold">
                        <span class="font-size-12px">
                            {#if task.status === 0}
                                离线
                            {:else if task.status === 1}
                                在线
                            {/if}
                        </span>
                    </Row>
                </div>
                <AccordionContent>
                    <Card noShadow class="no-margin">
                        <CardContent class="no-padding-top">
                            <div class="display-flex flex-flow-wrap">
                                {#if type === '' || type === '6'}
                                    <div>
                                        <Button tooltip="发送验证码" on:click={onSendVerifyCodeButtonClick(task)}>
                                            <Icon class="font-weight-bold" md="material:outgoing_mail"/>
                                        </Button>
                                    </div>
                                {/if}

                                <div>
                                    <Button tooltip="登录" on:click={onSignInButtonClick(task)}>
                                        <Icon class="font-weight-bold" md="material:login"/>
                                    </Button>
                                </div>

                                {#if type === '2' || type === '3' || type === '4' || type === '5'}
                                    <div>
                                        <Button tooltip="重设支付密码"
                                                on:click={onResetPaymentPasswordButtonClick(task)}>
                                            <Icon class="font-weight-bold" md="material:shopping_cart"/>
                                        </Button>
                                    </div>
                                {/if}

                                <div>
                                    <Button tooltip="删除" on:click={onDeleteButtonClick(task)}>
                                        <Icon class="font-weight-bold" md="material:delete"/>
                                    </Button>
                                </div>
                            </div>
                            <Row noGap class="margin-top-half">
                                <Col width="100">
                                    <span>下次执行时间:{new Date(task.next_executed_at).toLocaleString()}</span>
                                </Col>
                            </Row>
                            <Row noGap>
                                <Col width="100">
                                    <span>创建时间:{new Date(task.created_at).toLocaleString()}</span>
                                </Col>
                            </Row>
                            <Row noGap>
                                <Col width="100">
                                    <span>上级手机号:</span>
                                </Col>
                            </Row>
                            <Row noGap>
                                <Col width="100">
                                    <span>上级ID:</span>
                                </Col>
                            </Row>
                        </CardContent>
                    </Card>
                </AccordionContent>
            </ListItem>
        {/each}
    </ul>
</List>

<script>
  import './task_list.scss'
  import {
    AccordionContent,
    Button,
    Card,
    CardContent,
    Col,
    f7,
    Icon,
    ListItem,
    Row,
    List
  } from 'framework7-svelte'
  import api from '@/js/api'
  import util from '@/js/utils'

  export let folder
  export let type = ''
  export let tasks

  let vlData = {
    items: []
  }

  function renderExternal (virtualList, virtualListData) {
    vlData = virtualListData
  }

  function onDeleteButtonClick (task) {
    return function () {
      f7.dialog.confirm('确定删除该任务吗?', '删除任务', () => {
        api.req(() => api.task.deleteTask(type, task.name), '删除成功', '删除失败', '正在删除')
          .then(() => {
            util.progress.refresh(() => util.store.getTasks(type, folder.id), true)
          })
      })
    }
  }

  function onSendVerifyCodeButtonClick (task) {
    return function () {
      api.req(() => api.task.sendLoginVerifyCode(type, task.name), '发送成功', '发送失败', '正在发送')
    }
  }

  function onSignInButtonClick (task) {
    return function () {
      if (type === '' || type === '6') {
        f7.dialog.prompt('请输入验证码', '登录', (code) => {
          api.req(() => api.task.loginByMobile(type, task.name, code), '登录成功', '登录失败', '正在登录')
            .then(() => {
              util.progress.refresh(() => util.store.getTasks(type, folder.id), true)
            })
        })
      } else if (type === '2' || type === '3' || type === '4' || type === '5') {
        f7.dialog.prompt('请输入密码', '登录', (password) => {
          api.req(() => api.task.loginByUsername(type, task.name, password), '登录成功', '登录失败', '正在登录')
            .then(() => {
              util.progress.refresh(() => util.store.getTasks(type, folder.id), true)
            })
        })
      }
    }
  }

  function onResetPaymentPasswordButtonClick (task) {
    return function () {
      f7.dialog.password('请输入密码', '重设支付密码', (password) => {
        api.req(() => api.task.resetPaymentPassword(type, task.name, password), '重设成功', '重设失败', '正在重设')
          .then(() => {
            util.progress.refresh(() => util.store.getTasks(type, folder.id), true)
          })
      })
    }
  }
</script>
