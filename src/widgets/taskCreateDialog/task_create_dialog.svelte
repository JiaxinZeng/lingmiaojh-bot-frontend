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

  let dialogElement
  let dialogMobileInputValue = ''
  let dialogCodeInputValue = ''
  let dialogPaymentPasswordInputValue = ''
  let dialog

  const memo = new Map()
  memo.getOrDefault = function (key) {
    const defaultValue = {
      created: false,
      loginSuccess: false
    }

    if (this.has(key)) {
      return this.get(key)
    } else {
      this.set(key, defaultValue)
      return defaultValue
    }
  }

  function onSendButtonClick () {
    dialog.close()

    if (type === '5' || type === '18') {
      if (!dialogPaymentPasswordInputValue) {
        f7.dialog.alert('请先输入支付密码', '提示', () => dialog.open())
        return
      }
    }

    ;(async function () {
      try {
        try {
          await api.req(
            () => api.task.createTaskByMobile(
              type,
              dialogMobileInputValue,
              folder.id,
              dialogPaymentPasswordInputValue
            ),
            null,
            null,
            '正在添加账号'
          )
        } catch (err) {
        }
        memo.getOrDefault(dialogMobileInputValue).created = true
        await api.req(
          () => api.task.sendLoginVerifyCode(
            type,
            dialogMobileInputValue
          ),
          '发送成功',
          '发送失败',
          '正在发送'
        )
      } catch (err) {
      }
      dialog.open()
    })()
  }

  function onCancelButtonClick () {
    dialog.close()
    ;(async function () {
      try {
        for (const key of memo.keys()) {
          if (memo.get(key) && memo.get(key).created && !memo.get(key).loginSuccess) {
            await api.req(
              () => api.task.cancelCreate(type, dialogMobileInputValue),
              null,
              '取消失败',
              '正在取消添加账号'
            )
            memo.get(key).created = false
          }
        }
      } catch (err) {
      }
    })()
  }

  function onConfirmButtonClick () {
    dialog.close()
    if (!dialogCodeInputValue) {
      f7.dialog.alert('请先输入验证码', '提示', () => dialog.open())
      return
    }

    if (type === '5' || type === '18') {
      if (!dialogPaymentPasswordInputValue) {
        f7.dialog.alert('请先输入支付密码', '提示', () => dialog.open())
        return
      }
    }

    (async function () {
      try {
        if (!memo.getOrDefault(dialogMobileInputValue).created) {
          try {
            await api.req(
              () => api.task.createTaskByMobile(
                type,
                dialogMobileInputValue,
                folder.id,
                dialogPaymentPasswordInputValue
              ),
              null,
              null,
              '正在添加账号'
            )
          } catch (err) {
          }
        }
        memo.get(dialogMobileInputValue).created = true
        await api.req(
          () => api.task.loginByCode(
            type,
            dialogMobileInputValue,
            dialogCodeInputValue
          ),
          '登录成功',
          '登录失败',
          '正在登录'
        )
        memo.get(dialogMobileInputValue).loginSuccess = true
      } catch (err) {
        dialog.open()
        return
      }
      await utils.progress.loading(() => utils.store.getTasks(type, folder.id), true)
    })()
  }

  export function open () {
    if (type === '1' || type === '5' || type === '6' || type === '8' || type === '14' || type === '18') {
      dialog = f7.dialog.create({
        el: dialogElement
      })
      dialog.open()
    } else if (type === '2' || type === '3' || type === '4' || type === '10' || type === '13' || type === '16' || type === '17') {
      f7.dialog.login(null, '添加账号', (username, password) => {
        f7.dialog.password('请输入支付密码', '添加账号', (paymentPassword) => {
          api.req(() => api.task.createTaskByUsername(type, username, password, folder.id, paymentPassword), '添加成功',
            '添加失败', '正在添加账号')
            .then(() => {
              utils.progress.loading(() => utils.store.getTasks(type, folder.id), true)
            })
        })
      })
    } else if (type === '7' || type === '9' || type === '11' || type === '12' || type === '15') {
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

<div bind:this={dialogElement} class="task-create-dialog dialog dialog-buttons-2" style="display: none;">
    <div class="dialog-inner">
        <div class="dialog-title">添加账号</div>
        <List noHairlines class="no-padding no-margin">
            <ListInput
                    outline
                    label="手机号码"
                    floatingLabel
                    type="text"
                    placeholder="请输入手机号码"
                    on:input={e => (dialogMobileInputValue = e.detail[0].target.value)}
            />
            {#if type === '5' || type === '18'}
                <ListInput
                        outline
                        label="支付密码"
                        floatingLabel
                        type="text"
                        placeholder="请输入支付密码"
                        on:input={e => (dialogPaymentPasswordInputValue = e.detail[0].target.value)}
                />
            {/if}
            <ListInput
                    outline
                    label="验证码"
                    floatingLabel
                    type="text"
                    placeholder="请输入验证码"
                    on:input={e => (dialogCodeInputValue = e.detail[0].target.value)}
            >
                <Button
                        slot="content-end"
                        class="content-end margin-left-half"
                        tooltip="发送验证码"
                        on:click={onSendButtonClick}
                >
                    <Icon class="font-weight-bold font-size-24px" md="material:send"/>
                </Button>
            </ListInput>
        </List>
    </div>
    <div class="dialog-buttons">
        <span class="dialog-button" on:keypress={onCancelButtonClick} on:click={onCancelButtonClick}>取消</span>
        <span class="dialog-button dialog-button-bold" on:keypress={onConfirmButtonClick} on:click={onConfirmButtonClick}>确定</span>
    </div>
</div>
