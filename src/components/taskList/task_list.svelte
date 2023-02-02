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
  import framework7 from 'framework7'

  export let folder
  export let type = ''
  export let tasks
  export let parent

  const noDelete = framework7.utils.parseUrlQuery(window.location.href)?.noDelete

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
            util.progress.loading(() => util.store.getTasks(type, folder.id), true)
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
      if (type === '1' || type === '5' || type === '6' || type === '8' || type === '13' || type === '14' || type === '18') {
        f7.dialog.prompt('请输入验证码', '登录', (code) => {
          api.req(() => api.task.loginByCode(type, task.name, code), '登录成功', '登录失败', '正在登录')
            .then(() => {
              util.progress.loading(() => util.store.getTasks(type, folder.id), true)
            })
        })
      } else if (type === '2' || type === '3' || type === '4' || type === '7' || type === '9' || type === '10' ||
        type === '11' || type === '12' || type === '15' || type === '16' || type === '17') {
        f7.dialog.prompt('请输入密码', '登录', (password) => {
          api.req(() => api.task.loginByPassword(type, task.name, password), '登录成功', '登录失败', '正在登录')
            .then(() => {
              util.progress.loading(() => util.store.getTasks(type, folder.id), true)
            })
        })
      }
    }
  }

  function onResetPaymentPasswordButtonClick (task) {
    return function () {
      f7.dialog.password('请输入支付密码', '重设支付密码', (password) => {
        api.req(() => api.task.resetPaymentPassword(type, task.name, password), '重设成功', '重设失败', '正在重设')
          .then(() => {
            util.progress.loading(() => util.store.getTasks(type, folder.id), true)
          })
      })
    }
  }
</script>

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
          height: 80.8,
          scrollableParentEl: parent
        }}
>
    <ul>
        {#each vlData.items as task, index (index)}
            <ListItem class="task-list-item"
                      link
                      header={`${task.msg || (task.status === 0 ? '未登录' : '无消息')}`}
                      accordionItem
                      virtualListIndex={tasks.indexOf(task)}
                      style={`top: ${vlData.topPosition}px`}
            >
                <div slot="title" style="text-decoration-line: {task.status === 1 ? 'none' : 'line-through'};">
                    {#if task.name.length === 11}
                        {task.name.slice(0, 3)}<span style="filter: {!task?.visibility ? 'blur(5px)' : 'none'}; transition: filter 0.3s ease;">{task.name.slice(3, 7)}</span>{task.name.slice(7)}
                    {:else}
                        {task.name}
                    {/if}
                </div>
                <div slot="footer">
                    <Row noGap>
                        <Col width="50"><span class="font-weight-bold">邀请人&nbsp;</span>{`${task.inviter}`}</Col>
                        <Col width="50"><span class="font-weight-bold">余额&nbsp;</span>{`${task.coin}`}</Col>
                    </Row>
                </div>
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
                                {#if type === '1' || type === '5' || type === '6' || type === '8' || type === '13' || type === '14' || type === '18'}
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

                                {#if type === '2' || type === '3' || type === '4' || type === '5' || type === '10' || type === '13' || type === '16' || type === '17' || type === '18'}
                                    <div>
                                        <Button tooltip="重设支付密码"
                                                on:click={onResetPaymentPasswordButtonClick(task)}>
                                            <Icon class="font-weight-bold" md="material:shopping_cart"/>
                                        </Button>
                                    </div>
                                {/if}

                                {#if !task?.visibility}
                                    <div>
                                        <Button tooltip="显示"
                                                on:click={() => {
                                                  if (!task?.changed_visibility) {
                                                      f7.dialog.prompt('请输入完整号码', '修改可见性', (name) => {
                                                        if (name === task.name) {
                                                          task.visibility = true
                                                          task.changed_visibility = true
                                                        } else {
                                                          f7.dialog.alert('完整号码不正确')
                                                        }
                                                      })
                                                  } else {
                                                    task.visibility = true
                                                  }
                                                }}>
                                            <Icon class="font-weight-bold" md="material:visibility"/>
                                        </Button>
                                    </div>
                                {:else}
                                    <div>
                                        <Button tooltip="取消显示"
                                                on:click={() => {
                                                    task.visibility = false
                                                }}>
                                            <Icon class="font-weight-bold" md="material:visibility_off"/>
                                        </Button>
                                    </div>
                                {/if}

                                {#if !noDelete}
                                    <div>
                                        <Button tooltip="删除" on:click={onDeleteButtonClick(task)}>
                                            <Icon class="font-weight-bold" md="material:delete"/>
                                        </Button>
                                    </div>
                                {/if}
                            </div>
                            <Row noGap class="margin-top-half">
                                <Col>
                                    <span class="font-weight-bold">下次执行时间&nbsp;</span>{
                                        new Date(task.next_executed_at).toLocaleString()
                                    }
                                </Col>
                            </Row>
                            <Row noGap>
                                <Col>
                                    <span class="font-weight-bold">创建时间&nbsp;</span>{
                                        new Date(task.created_at).toLocaleString()
                                    }
                                </Col>
                            </Row>
                        </CardContent>
                    </Card>
                </AccordionContent>
            </ListItem>
        {/each}
    </ul>
</List>
