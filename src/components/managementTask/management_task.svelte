{#if folder}
    <ActionBar>
        <Row noGap>
            <Col width="100">
                <BlockTitle class="title">{folder.name}</BlockTitle>
            </Col>
        </Row>
        <Row class="margin-top-half" noGap>
            <Col width="10">
                <Button on:click={() => f7router.back()}>
                    <Icon class="font-weight-bold" md="material:arrow_back"/>
                    <span class="font-weight-bold">返回</span>
                </Button>
            </Col>
            <Col width="10">
                <Button on:click={onRefreshButtonClick}>
                    <Icon class="font-weight-bold" md="material:refresh"/>
                    <span class="font-weight-bold">刷新</span>
                </Button>
            </Col>
            <Col width="10">
                <Button on:click={onCreateButtonClick}>
                    <Icon class="font-weight-bold" md="material:add"/>
                    <span class="font-weight-bold">添加</span>
                </Button>
            </Col>
            <Col width="10">
                <Button on:click={onImportButtonClick}>
                    <Icon class="font-weight-bold" md="material:download"/>
                    <span class="font-weight-bold">导入</span>
                </Button>
            </Col>
            <Col width="10">
                <Button>
                    <Icon class="font-weight-bold" md="material:search"/>
                    <span class="font-weight-bold">查询</span>
                </Button>
            </Col>
            <Col width="50"></Col>
        </Row>
    </ActionBar>
    <PageContent class="flex-grow-1">
        <TaskList tasks={tasks} type={type} folder={folder}/>
    </PageContent>
    <div class="font-weight-bold font-size-12px margin-top-half">[总计:{tasks.length}]&nbsp;[离线:{(function () {
      let i = 0
      tasks.forEach((task) => {
        if (task.status === 0) {
          i++
        }
      })
      return i
    })()}]&nbsp;[在线:{(function () {
      let i = 0
      tasks.forEach((task) => {
        if (task.status === 1) {
          i++
        }
      })
      return i
    })()}]</div>
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

<script>
  import ActionBar from '@/components/actionBar'
  import {
    BlockTitle,
    Button,
    Col,
    f7,
    Icon,
    List,
    ListInput,
    PageContent,
    Row,
    useStore
  } from 'framework7-svelte'
  import TaskList from '@/components/taskList'
  import Api from '@/js/api'
  import Util from '@/js/util'
  import _ from 'lodash'
  import './management_task.scss'
  import { onMount } from 'svelte'

  export let folder
  export let f7router
  export let type = ''

  onMount(() => {
    if (folder?.id) {
      Util.store.getTasks(type, folder.id)
    }
  })

  // const search = _.debounce(() => Util.store.filterTasks(type, folder.id, searchbar.instance().query), 500)

  let tasks = useStore(`task${type}s`, newTasks => (tasks = _.sortBy(newTasks, function (task) {
    return task.status
  })))
  let createMobileDialogElement
  let createMobileDialogMobileInputValue
  let createMobileDialogCodeInputValue
  let createMobileDialog
  let createMobileDialogSendButtonClicked = false

  function onCreateButtonClick () {
    if (type === '' || type === '6') {
      createMobileDialog = f7.dialog.create({
        el: createMobileDialogElement
      })
      createMobileDialog.open()
    } else if (type === '2' || type === '3' || type === '4' || type === '5') {
      f7.dialog.login(null, '添加账号', (username, password) => {
        f7.dialog.password('请输入支付密码', '添加账号', (paymentPassword) => {
          Api.req(() => Api.Task.createTaskByUsername(type, username, password, folder.id, paymentPassword), '添加成功', '添加失败', '正在添加账号')
            .then(() => {
              Util.alert.refresh(() => Util.store.getTasks(type, folder.id), true)
            })
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
    Util.alert.refresh(() => Util.store.getTasks(type, folder.id), false)
  }

  function onCreateMobileDialogSendButtonClick () {
    createMobileDialog.close();
    (async function () {
      try {
        await Api.req(() => Api.Task.createTaskByMobile(type, createMobileDialogMobileInputValue, folder.id), null, '添加失败', '正在添加账号')
        await Api.req(() => Api.Task.sendLoginVerifyCode(type, createMobileDialogMobileInputValue), '发送成功', '发送失败', '正在发送')
        createMobileDialogSendButtonClicked = true
      } catch (err) {
      }
      createMobileDialog.open()
    })()
  }

  function onCreateMobileDialogCancelButtonClick () {
    createMobileDialog.close()
    if (createMobileDialogSendButtonClicked) {
      Api.req(() => Api.Task.deleteTask(type, createMobileDialogMobileInputValue), null, '取消失败', '正在取消添加账号')
        .then(() => createMobileDialog.destroy())
        .catch(() => createMobileDialog.open())
    }

    createMobileDialog.destroy()
  }

  function onCreateMobileDialogConfirmButtonClick () {
    createMobileDialog.close()
    if (createMobileDialogCodeInputValue) {
      (async function () {
        try {
          if (!createMobileDialogSendButtonClicked) {
            await Api.req(() => Api.Task.createTaskByMobile(type, createMobileDialogMobileInputValue, folder.id), null, '添加失败', '正在添加账号')
          }
          await Api.req(() => Api.Task.loginByMobile(type, createMobileDialogMobileInputValue, createMobileDialogCodeInputValue), '登录成功', '登录失败', '正在登录')
        } catch (err) {
          createMobileDialog.open()
          return
        }
        await Util.alert.refresh(() => Util.store.getTasks(type, folder.id), true)
        createMobileDialogSendButtonClicked = false
        createMobileDialog.destroy()
      })()
      return
    }

    f7.dialog.alert('请先输入验证码', '提示', () => createMobileDialog.open())
  }
</script>
