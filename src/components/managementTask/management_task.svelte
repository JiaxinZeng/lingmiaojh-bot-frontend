{#if folder}
    <ActionBar class="margin-bottom-half">
        <Row noGap>
            <Col width="100">
                <BlockTitle class="title">{folder.name}</BlockTitle>
            </Col>
        </Row>
        <div class="margin-top-half display-flex flex-flow-wrap">
            <div>
                <Button on:click={() => f7router.back()}>
                    <Icon class="font-weight-bold" md="material:arrow_back"/>
                    <span class="font-weight-bold">返回</span>
                </Button>
            </div>
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
                <Button on:click={onQueryButtonClick}>
                    <Icon class="font-weight-bold" md="material:search"/>
                    <span class="font-weight-bold">查询</span>
                </Button>
            </div>
        </div>
    </ActionBar>
    <PageContent class="flex-grow-1 management-task-page-context">
        {#key tasks}
            <TaskList type={type} folder={folder} tasks={tasks}/>
        {/key}
    </PageContent>
    <div class="font-weight-bold font-size-12px margin-top-half">[总计:{tasks.length}]&nbsp;[离线:{
      tasks.reduce((total, task) => {
        if (task.status === 0) {
          total++
        }
        return total
      }, 0)}]&nbsp;[在线:{
      tasks.reduce((total, task) => {
        if (task.status === 1) {
          total++
        }
      return total
    }, 0)}]
    </div>
{/if}

<div bind:this={createMobileDialogElement} class="create-mobile-dialog dialog dialog-buttons-2" style="display: none;">
    <div class="dialog-inner">
        <div class="dialog-title">添加账号</div>
        <List noHairlines class="no-padding no-margin">
            <ListInput
                    outline
                    label="手机号码"
                    floatingLabel
                    type="text"
                    placeholder="请输入手机号码"
                    on:input={e => (createMobileDialogMobileInputValue = e.detail[0].target.value)}
            />
            <ListInput
                    outline
                    label="验证码"
                    floatingLabel
                    type="text"
                    placeholder="请输入验证码"
                    on:input={e => (createMobileDialogCodeInputValue = e.detail[0].target.value)}
            >
                <Button
                        slot="content-end"
                        class="content-end margin-left-half"
                        tooltip="发送验证码"
                        on:click={onCreateMobileDialogSendButtonClick}
                >
                    <Icon class="font-weight-bold font-size-24px" md="material:send"/>
                </Button>
            </ListInput>
        </List>
    </div>
    <div class="dialog-buttons">
        <span class="dialog-button" on:click={onCreateMobileDialogCancelButtonClick}>取消</span>
        <span class="dialog-button dialog-button-bold" on:click={onCreateMobileDialogConfirmButtonClick}>确定</span>
    </div>
</div>

<div bind:this={queryDialogElement} class="query-task-dialog dialog dialog-buttons-2" style="display: none;">
    <div class="dialog-inner">
        <div class="dialog-title">查询任务</div>
        <List noHairlines class="no-padding no-margin">
            <ListInput
                    outline
                    label="手机号码"
                    floatingLabel
                    type="text"
                    placeholder="请输入手机号码"
                    value={queryDialogMobileInputValue}
                    on:input={e => (queryDialogMobileInputValue = e.detail[0].target.value)}
            >
                <Input
                        slot="content-start"
                        outline
                        type="select"
                        class="condition"
                        value={queryDialogMobileConditionValue}
                        on:input={e => (queryDialogMobileConditionValue = e.detail[0].target.value)}
                >
                    <option value="all">不限</option>
                    <option value="include">包含</option>
                    <option value="equal">相等</option>
                </Input>
            </ListInput>
            <ListInput
                    outline
                    label="上级手机号码"
                    floatingLabel
                    type="text"
                    placeholder="请输入手机号码"
                    value={queryDialogInviterMobileInputValue}
                    on:input={e => (queryDialogInviterMobileInputValue = e.detail[0].target.value)}
            >
                <Input
                        slot="content-start"
                        outline
                        type="select"
                        class="condition"
                        value={queryDialogInviterMobileConditionValue}
                        on:input={e => (queryDialogInviterMobileConditionValue = e.detail[0].target.value)}
                >
                    <option value="all">不限</option>
                    <option value="include">包含</option>
                    <option value="equal">相等</option>
                </Input>
            </ListInput>
            <ListInput
                    outline
                    label="余额"
                    floatingLabel
                    type="number"
                    placeholder="请输入余额"
                    value={queryDialogCoinInputValue}
                    on:input={e => (queryDialogCoinInputValue = e.detail[0].target.value)}
            >
                <Input
                        slot="content-start"
                        outline
                        type="select"
                        class="condition"
                        value={queryDialogCoinConditionValue}
                        on:input={e => (queryDialogCoinConditionValue = e.detail[0].target.value)}
                >
                    <option value="all">不限</option>
                    <option value="less">小于</option>
                    <option value="more">大于</option>
                    <option value="equal">等于</option>
                </Input>
            </ListInput>
            <ListInput
                    outline
                    label="消息"
                    floatingLabel
                    type="text"
                    placeholder="请输入消息"
                    value={queryDialogMsgInputValue}
                    on:input={e => (queryDialogMsgInputValue = e.detail[0].target.value)}
            >
                <Input
                        slot="content-start"
                        outline
                        type="select"
                        class="condition"
                        value={queryDialogMsgConditionValue}
                        on:input={e => (queryDialogMsgConditionValue = e.detail[0].target.value)}
                >
                    <option value="all">不限</option>
                    <option value="include">包含</option>
                    <option value="equal">相等</option>
                </Input>
            </ListInput>
            <ListInput
                    outline
                    label="创建时间"
                    floatingLabel
                    type="datetime-local"
                    placeholder="请选择日期"
                    value={queryDialogCreateTimeInputValue}
                    on:input={e => (queryDialogCreateTimeInputValue = e.detail[0].target.value)}
            >
                <Input
                        slot="content-start"
                        outline
                        type="select"
                        class="condition"
                        value={queryDialogCreateTimeConditionValue}
                        on:input={e => (queryDialogCreateTimeConditionValue = e.detail[0].target.value)}
                >
                    <option value="all">不限</option>
                    <option value="before">之前</option>
                    <option value="after">之后</option>
                </Input>
            </ListInput>
            <ListInput
                    outline
                    label="运行状态"
                    type="select"
                    placeholder="请选择日期"
                    value={queryDialogStatusConditionValue}
                    on:input={e => (queryDialogStatusConditionValue = e.detail[0].target.value)}
            >
                <option value="all">不限</option>
                <option value="online">在线</option>
                <option value="offline">离线</option>
            </ListInput>
        </List>
    </div>
    <div class="dialog-buttons">
        <span class="dialog-button" on:click={onQueryDialogCloseButtonClick}>取消</span>
        <span class="dialog-button dialog-button-bold" on:click={onQueryDialogConfirmButtonClick}>确定</span>
    </div>
</div>

<script>
  import ActionBar from '@/components/actionBar'
  import {
    BlockTitle,
    Button,
    Col,
    f7,
    Icon,
    Input,
    List,
    ListInput,
    PageContent,
    Row,
    useStore
  } from 'framework7-svelte'
  import TaskList from '@/components/taskList'
  import api from '@/js/api'
  import utils from '@/js/utils'
  import './management_task.scss'
  import { onMount } from 'svelte'
  import _ from 'lodash'

  export let folder
  export let f7router
  export let type = ''

  onMount(() => {
    if (folder?.id) {
      utils.store.getTasks(type, folder.id)
    }
  })

  let tasks = useStore(`task${type}s`, newTasks => (tasks = _.sortBy(newTasks, function (task) {
    return task.status
  })))

  let createMobileDialogElement
  let createMobileDialogMobileInputValue
  let createMobileDialogCodeInputValue
  let createMobileDialog
  let createMobileDialogSendButtonClicked = false

  let queryDialogElement
  let queryDialog
  let queryDialogMobileInputValue = ''
  let queryDialogMobileConditionValue = 'all'
  let queryDialogInviterMobileInputValue = ''
  let queryDialogInviterMobileConditionValue = 'all'
  let queryDialogCoinInputValue = ''
  let queryDialogCoinConditionValue = 'all'
  let queryDialogMsgInputValue = ''
  let queryDialogMsgConditionValue = 'all'
  let queryDialogCreateTimeInputValue = ''
  let queryDialogCreateTimeConditionValue = 'all'
  let queryDialogStatusConditionValue = 'all'

  function onCreateButtonClick () {
    if (type === '' || type === '6') {
      createMobileDialog = f7.dialog.create({
        el: createMobileDialogElement
      })
      createMobileDialog.open()
    } else if (type === '2' || type === '3' || type === '4' || type === '5') {
      f7.dialog.login(null, '添加账号', (username, password) => {
        f7.dialog.password('请输入支付密码', '添加账号', (paymentPassword) => {
          api.req(() => api.task.createTaskByUsername(type, username, password, folder.id, paymentPassword), '添加成功',
            '添加失败', '正在添加账号')
            .then(() => {
              utils.progress.refresh(() => utils.store.getTasks(type, folder.id), true)
            })
        })
      })
    } else if (type === '7') {
      f7.dialog.login(null, '添加账号', (username, password) => {
        api.req(() => api.task.createTaskByUsername(type, username, password, folder.id), '添加成功',
          '添加失败', '正在添加账号')
          .then(() => {
            utils.progress.refresh(() => utils.store.getTasks(type, folder.id), true)
          })
      })
    }
  }

  function onImportButtonClick () {
    f7router.navigate('/task_import/', {
      props: {
        type,
        folder
      }
    })
  }

  function onRefreshButtonClick () {
    utils.progress.refresh(() => utils.store.getTasks(type, folder.id), false)
  }

  function onCreateMobileDialogSendButtonClick () {
    createMobileDialog.close();
    (async function () {
      try {
        await api.req(() => api.task.createTaskByMobile(type, createMobileDialogMobileInputValue, folder.id), null,
          '添加失败', '正在添加账号')
        await api.req(() => api.task.sendLoginVerifyCode(type, createMobileDialogMobileInputValue), '发送成功',
          '发送失败', '正在发送')
        createMobileDialogSendButtonClicked = true
      } catch (err) {
      }
      createMobileDialog.open()
    })()
  }

  function onCreateMobileDialogCancelButtonClick () {
    createMobileDialog.close()
    if (createMobileDialogSendButtonClicked) {
      api.req(() => api.task.deleteTask(type, createMobileDialogMobileInputValue), null, '取消失败', '正在取消添加账号')
        .then(() => createMobileDialog.destroy())
        .catch(() => createMobileDialog.open())
    }
  }

  function onCreateMobileDialogConfirmButtonClick () {
    createMobileDialog.close()
    if (createMobileDialogCodeInputValue) {
      (async function () {
        try {
          if (!createMobileDialogSendButtonClicked) {
            await api.req(() => api.task.createTaskByMobile(type, createMobileDialogMobileInputValue, folder.id), null,
              '添加失败', '正在添加账号')
          }
          await api.req(
            () => api.task.loginByMobile(type, createMobileDialogMobileInputValue, createMobileDialogCodeInputValue),
            '登录成功', '登录失败', '正在登录')
        } catch (err) {
          createMobileDialog.open()
          return
        }
        await utils.progress.refresh(() => utils.store.getTasks(type, folder.id), true)
        createMobileDialogSendButtonClicked = false
      })()
      return
    }

    f7.dialog.alert('请先输入验证码', '提示', () => createMobileDialog.open())
  }

  function onQueryButtonClick () {
    queryDialog = f7.dialog.create({
      el: queryDialogElement
    })
    queryDialog.open()
  }

  function onQueryDialogCloseButtonClick () {
    queryDialog.close()
  }

  function onQueryDialogConfirmButtonClick () {
    queryDialog.close()

    api.req(() => utils.store.filterTasks(type, folder.id, task => {
      if (queryDialogMobileConditionValue === 'include') {
        if (!task?.name?.includes(queryDialogMobileInputValue)) {
          return false
        }
      } else if (queryDialogMobileConditionValue === 'equal') {
        if (task?.name !== queryDialogMobileInputValue) {
          return false
        }
      }

      // if (queryDialogInviterMobileConditionValue === 'include') {
      //   if (!task?.inviterMobile?.includes(queryDialogInviterMobileInputValue)) {
      //     return false
      //   }
      // } else if (queryDialogInviterMobileConditionValue === 'equal') {
      //   if (task?.inviterMobile !== queryDialogInviterMobileInputValue) {
      //     return false
      //   }
      // }

      if (queryDialogCoinConditionValue === 'equal') {
        if (task?.coin !== Number(queryDialogCoinInputValue)) {
          return false
        }
      } else if (queryDialogCoinConditionValue === 'more') {
        if (task?.coin < Number(queryDialogCoinInputValue)) {
          return false
        }
      } else if (queryDialogCoinConditionValue === 'less') {
        if (task?.coin > Number(queryDialogCoinInputValue)) {
          return false
        }
      }

      if (queryDialogMsgConditionValue === 'include') {
        if (!task?.msg?.includes(queryDialogMsgInputValue)) {
          return false
        }
      } else if (queryDialogMsgConditionValue === 'equal') {
        if (task?.msg !== queryDialogMsgInputValue) {
          return false
        }
      }

      if (queryDialogCreateTimeConditionValue === 'before') {
        if (!task?.created_at || new Date(task?.created_at) >= new Date(queryDialogCreateTimeInputValue)) {
          return false
        }
      } else if (queryDialogCreateTimeConditionValue === 'after') {
        if (!task?.created_at || new Date(task?.created_at) <= new Date(queryDialogCreateTimeInputValue)) {
          return false
        }
      }

      if (queryDialogStatusConditionValue === 'online') {
        if (task?.status !== 1) {
          return false
        }
      } else if (queryDialogStatusConditionValue === 'offline') {
        if (task?.status !== 0) {
          return false
        }
      }

      return true
    }), '查询完成', '查询失败', '正在查询')
      .catch(() => queryDialog.open())
  }
</script>
