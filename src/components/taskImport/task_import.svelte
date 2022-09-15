<ActionBar class="margin-bottom-half">
    <Row noGap>
        <Col width="100">
            <BlockTitle class="title">任务导入</BlockTitle>
        </Col>
    </Row>
    <div class="margin-top-half display-flex">
        <div>
            <Button tooltip="返回" on:click={onBackButtonClick}>
                <Icon class="font-weight-bold" md="material:arrow_back"/>
            </Button>
        </div>
        <div>
            <Button tooltip="确定" on:click={onCheckButtonClick}>
                <Icon class="font-weight-bold" md="material:check"/>
            </Button>
        </div>
    </div>
</ActionBar>
<PageContent class="flex-grow-1 task-import">
    <TextEditor bind:this={textEditor}
                buttons={[['bold', 'italic', 'underline', 'strikeThrough'], ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify']]}
                placeholder={placeholder}/>
</PageContent>

<script>
  import {
    BlockTitle,
    Button,
    Col,
    f7,
    Icon,
    PageContent,
    Row,
    TextEditor
  } from 'framework7-svelte'
  import ActionBar from '@/components/actionBar'
  import './task_import.scss'
  import Dom7 from 'dom7'
  import api from '@/js/api'
  import utils from '@/js/utils'

  export let f7router
  export let type
  export let folder

  let textEditor = null
  let isImported = false

  const placeholder = `一行一个账号
<br/>
格式:账号|密码|支付密码
<br/>
例1 (有三个账号,密码/支付密码都不一致):
<br/>
&emsp;12345678910|a1234567|123456
<br/>
&emsp;12345678911|a1234568|123457
<br/>
&emsp;12345678912|a1234569|123458
<br/>
例2 (有三个账号,密码/支付密码都一致):
<br/>
&emsp;12345678910|a1234567|123456
<br/>
&emsp;12345678911
<br/>
&emsp;12345678912
<br/>
例3 (有三个账号,第一个与其余支付密码不一致,第二个与第三个支付密码一致):
<br/>
&emsp;12345678910|a1234567|123456
<br/>
&emsp;12345678911||123457
<br/>
&emsp;12345678912
<br/>
例4 (有三个账号,第一个与其余密码不一致,第二个与第三个密码一致):
<br/>
&emsp;12345678910|a1234567|123456
<br/>
&emsp;12345678911|123457 或者 12345678911|123457|
<br/>
&emsp;12345678912
`

  function onCheckButtonClick () {
    const instance = textEditor.instance()
    const el = instance.$el[0]
    const content = instance.$contentEl[0].innerText

    if (content.trim().length === 0 || Dom7(el).find('.text-editor-placeholder').length !== 0) {
      f7.dialog.alert('请输入内容', '提示')
      return
    }

    const contentLines = content.split('\n')
    const accounts = []

    let usingPassword = null
    let usingPaymentPassword = null
    for (let i = 0; i < contentLines.length; i++) {
      const accountInfos = contentLines[i].split('|')

      if (accountInfos.length === 0 || accountInfos[0].trim().length === 0) {
        continue
      }
      if (accountInfos?.[1] && accountInfos[1].trim().length !== 0) {
        usingPassword = accountInfos[1]
      }
      if (accountInfos?.[2] && accountInfos[2].trim().length !== 0) {
        usingPaymentPassword = accountInfos[2]
      }

      if (type === '2' || type === '3' || type === '4') {
        if (!usingPassword || !usingPaymentPassword) {
          f7.dialog.alert('没有输入密码或者支付密码', '提示')
          return
        }
      } else if (type === '7' || type === '8' || type === '9') {
        if (!usingPassword) {
          f7.dialog.alert('没有输入密码', '提示')
          return
        }
      } else if (type === '5') {
        if (!usingPaymentPassword) {
          f7.dialog.alert('没有输入支付密码', '提示')
          return
        }
      }

      accounts.push({
        account: accountInfos[0],
        password: usingPassword,
        paymentPassword: usingPaymentPassword
      })
    }

    if (accounts.length === 0) {
      f7.dialog.alert('格式不正确', '提示')
      return
    }

    let importedCount = 0
    const dialog = f7.dialog.progress('正在导入', 0)
    const getProgressText = () => `${importedCount} / ${accounts.length}`
    dialog.setText(getProgressText())

    api.req(async function () {
      let lastResp
      for (let i = 0; i < accounts.length; i++) {
        const account = accounts[i]

        if (type === '' || type === '6') {
          lastResp = await api.task.createTaskByMobile(type, account.account, folder.id)
        } else if (type === '2' || type === '3' || type === '4' || type === '5') {
          lastResp = await api.task.createTaskByUsername(type,
            account.account,
            account.password,
            folder.id,
            account.paymentPassword)
        } else if (type === '7' || type === '8' || type === '9') {
          lastResp = await api.task.createTaskByUsername(type,
            account.account,
            account.password,
            folder.id)
        }

        dialog.setProgress(Math.round(i / accounts.length * 100))
        dialog.setText(getProgressText())

        importedCount++
        if (!isImported) {
          isImported = true
        }
      }
      return lastResp
    }, () => `导入成功 ${getProgressText()}`, () => `导入失败 ${getProgressText()}`)
      .finally(() => {
        dialog.close()
      })
  }

  function onBackButtonClick () {
    if (isImported) {
      utils.progress.loading(() => utils.store.getTasks(type, folder.id), true)
    }
    f7router.back()
  }
</script>
