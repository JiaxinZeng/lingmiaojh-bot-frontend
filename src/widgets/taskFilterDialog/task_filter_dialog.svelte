<div bind:this={dialogElement} class="task-filter-dialog dialog dialog-buttons-2" style="display: none;">
    <div class="dialog-inner">
        <div class="dialog-title">筛选任务</div>
        <List noHairlines class="no-padding no-margin">
            <ListInput
                    outline
                    label="手机号码"
                    floatingLabel
                    type="text"
                    placeholder="请输入手机号码"
                    value={dialogMobileInputValue}
                    on:input={e => (dialogMobileInputValue = e.detail[0].target.value)}
            >
                <Input
                        slot="content-start"
                        outline
                        type="select"
                        class="condition"
                        value={dialogMobileConditionValue}
                        on:input={e => (dialogMobileConditionValue = e.detail[0].target.value)}
                >
                    <option value="all">不限</option>
                    <option value="include">包含</option>
                    <option value="equal">相等</option>
                </Input>
            </ListInput>
            <ListInput
                    outline
                    label="邀请人"
                    floatingLabel
                    type="text"
                    placeholder="请输入邀请人"
                    value={dialogInviterInputValue}
                    on:input={e => (dialogInviterInputValue = e.detail[0].target.value)}
            >
                <Input
                        slot="content-start"
                        outline
                        type="select"
                        class="condition"
                        value={dialogInviterConditionValue}
                        on:input={e => (dialogInviterConditionValue = e.detail[0].target.value)}
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
                    value={dialogCoinInputValue}
                    on:input={e => (dialogCoinInputValue = e.detail[0].target.value)}
            >
                <Input
                        slot="content-start"
                        outline
                        type="select"
                        class="condition"
                        value={dialogCoinConditionValue}
                        on:input={e => (dialogCoinConditionValue = e.detail[0].target.value)}
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
                    value={dialogMsgInputValue}
                    on:input={e => (dialogMsgInputValue = e.detail[0].target.value)}
            >
                <Input
                        slot="content-start"
                        outline
                        type="select"
                        class="condition"
                        value={dialogMsgConditionValue}
                        on:input={e => (dialogMsgConditionValue = e.detail[0].target.value)}
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
                    value={dialogCreateTimeInputValue}
                    on:input={e => (dialogCreateTimeInputValue = e.detail[0].target.value)}
            >
                <Input
                        slot="content-start"
                        outline
                        type="select"
                        class="condition"
                        value={dialogCreateTimeConditionValue}
                        on:input={e => (dialogCreateTimeConditionValue = e.detail[0].target.value)}
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
                    value={dialogStatusConditionValue}
                    on:input={e => (dialogStatusConditionValue = e.detail[0].target.value)}
            >
                <option value="all">不限</option>
                <option value="online">在线</option>
                <option value="offline">离线</option>
            </ListInput>
        </List>
    </div>
    <div class="dialog-buttons">
        <span class="dialog-button" on:keypress={onCloseButtonClick} on:click={onCloseButtonClick}>取消</span>
        <span class="dialog-button dialog-button-bold" on:keypress={onConfirmButtonClick} on:click={onConfirmButtonClick}>确定</span>
    </div>
</div>

<script>
  import {
    f7,
    Input,
    List,
    ListInput
  } from 'framework7-svelte'
  import api from '@/js/api'
  import utils from '@/js/utils'
  import './task_filter_dialog.scss'

  let dialogElement
  let dialog
  let dialogMobileInputValue = ''
  let dialogMobileConditionValue = 'all'
  let dialogInviterInputValue = ''
  let dialogInviterConditionValue = 'all'
  let dialogCoinInputValue = ''
  let dialogCoinConditionValue = 'all'
  let dialogMsgInputValue = ''
  let dialogMsgConditionValue = 'all'
  let dialogCreateTimeInputValue = ''
  let dialogCreateTimeConditionValue = 'all'
  let dialogStatusConditionValue = 'all'

  function onCloseButtonClick () {
    dialog.close()
  }

  function onConfirmButtonClick () {
    dialog.close()

    api.req(() => utils.store.filterTasks(task => {
      if (dialogMobileConditionValue === 'include') {
        if (!task.name.includes(dialogMobileInputValue)) {
          return false
        }
      } else if (dialogMobileConditionValue === 'equal') {
        if (task.name !== dialogMobileInputValue) {
          return false
        }
      }

      if (dialogInviterConditionValue === 'include') {
        if (!task.inviter.includes(dialogInviterInputValue)) {
          return false
        }
      } else if (dialogInviterConditionValue === 'equal') {
        if (task.inviter !== dialogInviterInputValue) {
          return false
        }
      }

      if (dialogCoinConditionValue === 'equal') {
        if (task.coin !== Number(dialogCoinInputValue)) {
          return false
        }
      } else if (dialogCoinConditionValue === 'more') {
        if (task.coin < Number(dialogCoinInputValue)) {
          return false
        }
      } else if (dialogCoinConditionValue === 'less') {
        if (task.coin > Number(dialogCoinInputValue)) {
          return false
        }
      }

      if (dialogMsgConditionValue === 'include') {
        if (!task.msg.includes(dialogMsgInputValue)) {
          return false
        }
      } else if (dialogMsgConditionValue === 'equal') {
        if (task.msg !== dialogMsgInputValue) {
          return false
        }
      }

      if (dialogCreateTimeConditionValue === 'before') {
        if (!task.created_at || new Date(task.created_at) >= new Date(dialogCreateTimeInputValue)) {
          return false
        }
      } else if (dialogCreateTimeConditionValue === 'after') {
        if (!task.created_at || new Date(task.created_at) <= new Date(dialogCreateTimeInputValue)) {
          return false
        }
      }

      if (dialogStatusConditionValue === 'online') {
        if (task.status !== 1) {
          return false
        }
      } else if (dialogStatusConditionValue === 'offline') {
        if (task.status !== 0) {
          return false
        }
      }

      return true
    }), '筛选完成', '筛选失败', '正在筛选')
      .catch(() => dialog.open())
  }

  export function open () {
    dialog = f7.dialog.create({
      el: dialogElement
    })
    dialog.open()
  }
</script>
