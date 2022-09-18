<div bind:this={queryDialogElement} class="task-query-dialog dialog dialog-buttons-2" style="display: none;">
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
                    label="邀请人"
                    floatingLabel
                    type="text"
                    placeholder="请输入邀请人"
                    value={queryDialogInviterInputValue}
                    on:input={e => (queryDialogInviterInputValue = e.detail[0].target.value)}
            >
                <Input
                        slot="content-start"
                        outline
                        type="select"
                        class="condition"
                        value={queryDialogInviterConditionValue}
                        on:input={e => (queryDialogInviterConditionValue = e.detail[0].target.value)}
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
  import {
    f7,
    Input,
    List,
    ListInput
  } from 'framework7-svelte'
  import api from '@/js/api'
  import utils from '@/js/utils'
  import './task_query_dialog.scss'

  let queryDialogElement
  let queryDialog
  let queryDialogMobileInputValue = ''
  let queryDialogMobileConditionValue = 'all'
  let queryDialogInviterInputValue = ''
  let queryDialogInviterConditionValue = 'all'
  let queryDialogCoinInputValue = ''
  let queryDialogCoinConditionValue = 'all'
  let queryDialogMsgInputValue = ''
  let queryDialogMsgConditionValue = 'all'
  let queryDialogCreateTimeInputValue = ''
  let queryDialogCreateTimeConditionValue = 'all'
  let queryDialogStatusConditionValue = 'all'

  function onQueryDialogCloseButtonClick () {
    queryDialog.close()
  }

  function onQueryDialogConfirmButtonClick () {
    queryDialog.close()

    api.req(() => utils.store.filterTasks(task => {
      if (queryDialogMobileConditionValue === 'include') {
        if (!task.name.includes(queryDialogMobileInputValue)) {
          return false
        }
      } else if (queryDialogMobileConditionValue === 'equal') {
        if (task.name !== queryDialogMobileInputValue) {
          return false
        }
      }

      if (queryDialogInviterConditionValue === 'include') {
        if (!task.inviter.includes(queryDialogInviterInputValue)) {
          return false
        }
      } else if (queryDialogInviterConditionValue === 'equal') {
        if (task.inviter !== queryDialogInviterInputValue) {
          return false
        }
      }

      if (queryDialogCoinConditionValue === 'equal') {
        if (task.coin !== Number(queryDialogCoinInputValue)) {
          return false
        }
      } else if (queryDialogCoinConditionValue === 'more') {
        if (task.coin < Number(queryDialogCoinInputValue)) {
          return false
        }
      } else if (queryDialogCoinConditionValue === 'less') {
        if (task.coin > Number(queryDialogCoinInputValue)) {
          return false
        }
      }

      if (queryDialogMsgConditionValue === 'include') {
        if (!task.msg.includes(queryDialogMsgInputValue)) {
          return false
        }
      } else if (queryDialogMsgConditionValue === 'equal') {
        if (task.msg !== queryDialogMsgInputValue) {
          return false
        }
      }

      if (queryDialogCreateTimeConditionValue === 'before') {
        if (!task.created_at || new Date(task.created_at) >= new Date(queryDialogCreateTimeInputValue)) {
          return false
        }
      } else if (queryDialogCreateTimeConditionValue === 'after') {
        if (!task.created_at || new Date(task.created_at) <= new Date(queryDialogCreateTimeInputValue)) {
          return false
        }
      }

      if (queryDialogStatusConditionValue === 'online') {
        if (task.status !== 1) {
          return false
        }
      } else if (queryDialogStatusConditionValue === 'offline') {
        if (task.status !== 0) {
          return false
        }
      }

      return true
    }), '查询完成', '查询失败', '正在查询')
      .catch(() => queryDialog.open())
  }

  export function open () {
    queryDialog = f7.dialog.create({
      el: queryDialogElement
    })
    queryDialog.open()
  }
</script>
