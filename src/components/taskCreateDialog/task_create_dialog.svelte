<div bind:this={createMobileDialogElement} class="task-create-dialog dialog dialog-buttons-2" style="display: none;">
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
            {#if type === '5'}
                <ListInput
                        outline
                        label="支付密码"
                        floatingLabel
                        type="text"
                        placeholder="请输入支付密码"
                        on:input={e => (createMobileDialogPaymentPasswordInputValue = e.detail[0].target.value)}
                />
            {/if}
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
  import {
    Button,
    f7,
    Icon,
    List,
    ListInput
  } from 'framework7-svelte'
  import api from '@/js/api'
  import utils from '@/js/utils'
  import './task_create_dialog.scss'

  export let type
  export let folder

  let createMobileDialogElement
  let createMobileDialogMobileInputValue = ''
  let createMobileDialogCodeInputValue = ''
  let createMobileDialogPaymentPasswordInputValue = ''
  let createMobileDialog
  let createMobileDialogSendButtonClicked = false

  function onCreateMobileDialogSendButtonClick () {
    createMobileDialog.close();
    (async function () {
      try {
        await api.req(
          () => api.task.createTaskByMobile(
            type,
            createMobileDialogMobileInputValue,
            folder.id,
            createMobileDialogPaymentPasswordInputValue
          ),
          null,
          '添加失败',
          '正在添加账号'
        )
        await api.req(
          () => api.task.sendLoginVerifyCode(
            type,
            createMobileDialogMobileInputValue
          ),
          '发送成功',
          '发送失败',
          '正在发送'
        )
        createMobileDialogSendButtonClicked = true
      } catch (err) {
      }
      createMobileDialog.open()
    })()
  }

  function onCreateMobileDialogCancelButtonClick () {
    createMobileDialog.close()
    if (createMobileDialogSendButtonClicked) {
      api.req(
        () => api.task.cancelCreate(type, createMobileDialogMobileInputValue),
        null,
        '取消失败',
        '正在取消添加账号'
      )
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
            await api.req(
              () => api.task.createTaskByMobile(
                type,
                createMobileDialogMobileInputValue,
                folder.id,
                createMobileDialogPaymentPasswordInputValue
              ),
              null,
              '添加失败',
              '正在添加账号'
            )
          }
          await api.req(
            () => api.task.loginByCode(
              type,
              createMobileDialogMobileInputValue,
              createMobileDialogCodeInputValue
            ),
            '登录成功',
            '登录失败',
            '正在登录'
          )
        } catch (err) {
          createMobileDialog.open()
          return
        }
        await utils.progress.loading(() => utils.store.getTasks(type, folder.id), true)
        createMobileDialogSendButtonClicked = false
      })()
      return
    }

    f7.dialog.alert('请先输入验证码', '提示', () => createMobileDialog.open())
  }

  export function open () {
    if (type === '' || type === '5' || type === '6') {
      createMobileDialog = f7.dialog.create({
        el: createMobileDialogElement
      })
      createMobileDialog.open()
    } else if (type === '2' || type === '3' || type === '4' || type === '10') {
      f7.dialog.login(null, '添加账号', (username, password) => {
        f7.dialog.password('请输入支付密码', '添加账号', (paymentPassword) => {
          api.req(() => api.task.createTaskByUsername(type, username, password, folder.id, paymentPassword), '添加成功',
            '添加失败', '正在添加账号')
            .then(() => {
              utils.progress.loading(() => utils.store.getTasks(type, folder.id), true)
            })
        })
      })
    } else if (type === '7' || type === '8' || type === '9') {
      f7.dialog.login(null, '添加账号', (username, password) => {
        api.req(() => api.task.createTaskByUsername(type, username, password, folder.id), '添加成功',
          '添加失败', '正在添加账号')
          .then(() => {
            utils.progress.loading(() => utils.store.getTasks(type, folder.id), true)
          })
      })
    }
  }
</script>
