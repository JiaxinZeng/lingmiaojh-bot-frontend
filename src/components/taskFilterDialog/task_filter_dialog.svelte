<div bind:this={filterDialogElement} class="task-filter-dialog dialog dialog-buttons-2" style="display: none;">
    <div class="dialog-inner">
        <div class="dialog-title">筛选任务</div>
        <List noHairlines class="no-padding no-margin">
            <ListInput
                    outline
                    label="手机号码"
                    floatingLabel
                    type="text"
                    placeholder="请输入手机号码"
                    value={filterDialogMobileInputValue}
                    on:input={e => (filterDialogMobileInputValue = e.detail[0].target.value)}
            >
                <Input
                        slot="content-start"
                        outline
                        type="select"
                        class="condition"
                        value={filterDialogMobileConditionValue}
                        on:input={e => (filterDialogMobileConditionValue = e.detail[0].target.value)}
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
                    value={filterDialogInviterInputValue}
                    on:input={e => (filterDialogInviterInputValue = e.detail[0].target.value)}
            >
                <Input
                        slot="content-start"
                        outline
                        type="select"
                        class="condition"
                        value={filterDialogInviterConditionValue}
                        on:input={e => (filterDialogInviterConditionValue = e.detail[0].target.value)}
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
                    value={filterDialogCoinInputValue}
                    on:input={e => (filterDialogCoinInputValue = e.detail[0].target.value)}
            >
                <Input
                        slot="content-start"
                        outline
                        type="select"
                        class="condition"
                        value={filterDialogCoinConditionValue}
                        on:input={e => (filterDialogCoinConditionValue = e.detail[0].target.value)}
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
                    value={filterDialogMsgInputValue}
                    on:input={e => (filterDialogMsgInputValue = e.detail[0].target.value)}
            >
                <Input
                        slot="content-start"
                        outline
                        type="select"
                        class="condition"
                        value={filterDialogMsgConditionValue}
                        on:input={e => (filterDialogMsgConditionValue = e.detail[0].target.value)}
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
                    value={filterDialogCreateTimeInputValue}
                    on:input={e => (filterDialogCreateTimeInputValue = e.detail[0].target.value)}
            >
                <Input
                        slot="content-start"
                        outline
                        type="select"
                        class="condition"
                        value={filterDialogCreateTimeConditionValue}
                        on:input={e => (filterDialogCreateTimeConditionValue = e.detail[0].target.value)}
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
                    value={filterDialogStatusConditionValue}
                    on:input={e => (filterDialogStatusConditionValue = e.detail[0].target.value)}
            >
                <option value="all">不限</option>
                <option value="online">在线</option>
                <option value="offline">离线</option>
            </ListInput>
        </List>
    </div>
    <div class="dialog-buttons">
        <span class="dialog-button" on:click={onFilterDialogCloseButtonClick}>取消</span>
        <span class="dialog-button dialog-button-bold" on:click={onFilterDialogConfirmButtonClick}>确定</span>
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

  let filterDialogElement
  let filterDialog
  let filterDialogMobileInputValue = ''
  let filterDialogMobileConditionValue = 'all'
  let filterDialogInviterInputValue = ''
  let filterDialogInviterConditionValue = 'all'
  let filterDialogCoinInputValue = ''
  let filterDialogCoinConditionValue = 'all'
  let filterDialogMsgInputValue = ''
  let filterDialogMsgConditionValue = 'all'
  let filterDialogCreateTimeInputValue = ''
  let filterDialogCreateTimeConditionValue = 'all'
  let filterDialogStatusConditionValue = 'all'

  function onFilterDialogCloseButtonClick () {
    filterDialog.close()
  }

  function onFilterDialogConfirmButtonClick () {
    filterDialog.close()

    api.req(() => utils.store.filterTasks(task => {
      if (filterDialogMobileConditionValue === 'include') {
        if (!task.name.includes(filterDialogMobileInputValue)) {
          return false
        }
      } else if (filterDialogMobileConditionValue === 'equal') {
        if (task.name !== filterDialogMobileInputValue) {
          return false
        }
      }

      if (filterDialogInviterConditionValue === 'include') {
        if (!task.inviter.includes(filterDialogInviterInputValue)) {
          return false
        }
      } else if (filterDialogInviterConditionValue === 'equal') {
        if (task.inviter !== filterDialogInviterInputValue) {
          return false
        }
      }

      if (filterDialogCoinConditionValue === 'equal') {
        if (task.coin !== Number(filterDialogCoinInputValue)) {
          return false
        }
      } else if (filterDialogCoinConditionValue === 'more') {
        if (task.coin < Number(filterDialogCoinInputValue)) {
          return false
        }
      } else if (filterDialogCoinConditionValue === 'less') {
        if (task.coin > Number(filterDialogCoinInputValue)) {
          return false
        }
      }

      if (filterDialogMsgConditionValue === 'include') {
        if (!task.msg.includes(filterDialogMsgInputValue)) {
          return false
        }
      } else if (filterDialogMsgConditionValue === 'equal') {
        if (task.msg !== filterDialogMsgInputValue) {
          return false
        }
      }

      if (filterDialogCreateTimeConditionValue === 'before') {
        if (!task.created_at || new Date(task.created_at) >= new Date(filterDialogCreateTimeInputValue)) {
          return false
        }
      } else if (filterDialogCreateTimeConditionValue === 'after') {
        if (!task.created_at || new Date(task.created_at) <= new Date(filterDialogCreateTimeInputValue)) {
          return false
        }
      }

      if (filterDialogStatusConditionValue === 'online') {
        if (task.status !== 1) {
          return false
        }
      } else if (filterDialogStatusConditionValue === 'offline') {
        if (task.status !== 0) {
          return false
        }
      }

      return true
    }), '筛选完成', '筛选失败', '正在筛选')
      .catch(() => filterDialog.open())
  }

  export function open () {
    filterDialog = f7.dialog.create({
      el: filterDialogElement
    })
    filterDialog.open()
  }
</script>
