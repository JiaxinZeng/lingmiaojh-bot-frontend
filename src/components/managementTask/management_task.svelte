{#if folder}
    <ActionBar>
        <Row noGap>
            <Searchbar noHairline
                       noShadow
                       customSearch
                       backdrop={false}
                       form={false}
                       disableButton={false}
                       placeholder="搜索任务"
                       bind:this={searchbar}
                       on:searchbarSearch={() => Util.store.filterTasks(type, folder.id, searchbar.instance().query)}
            />
        </Row>
        <Row noGap class="margin-top">
            <Col width="100">
                <BlockTitle class="no-margin font-weight-bold font-size-16px">{`[${folder.name}]文件夹`}</BlockTitle>
            </Col>
        </Row>
        <Row class="margin-top-half" noGap>
            <Col width="5">
                <Button tooltip="返回" on:click={() => f7router.back()}>
                    <Icon class="font-weight-bold" md="material:arrow_back"/>
                </Button>
            </Col>
            <Col width="5">
                <Button tooltip="刷新" on:click={onRefreshButtonClicked}>
                    <Icon class="font-weight-bold" md="material:refresh"/>
                </Button>
            </Col>
            <Col width="5">
                <Button tooltip="添加账号" on:click={onCreateButtonClicked}>
                    <Icon class="font-weight-bold" md="material:add"/>
                </Button>
            </Col>
            <Col width="85"></Col>
        </Row>
    </ActionBar>
    <PageContent class="flex-grow-1">
        <TaskList type={type} folder={folder}/>
    </PageContent>
{/if}

<script>
  import ActionBar from '@/components/actionBar'
  import {
    BlockTitle,
    Button,
    Col,
    f7,
    Icon,
    PageContent,
    Row,
    Searchbar
  } from 'framework7-svelte'
  import TaskList from '@/components/taskList'
  import Api from '@/js/api'
  import Util from '@/js/util'

  export let folder
  export let f7router
  export let type = ''

  let searchbar

  function onCreateButtonClicked () {
    f7.dialog.prompt('请输入新账号', '添加账号', (value) => {
      if (type === '') {
        Api.req(() => Api.Task.createTaskByMobile(type, value, folder.id),
          true,
          '添加成功',
          '添加失败',
          true,
          '正在添加账号')
          .then(() => {
            Util.alert.refresh(() => Util.store.getTasks(type, folder.id), true)
          })
      } else if (type === '2') {
        f7.dialog.prompt('请输入密码', '添加账号', (password) => {
          f7.dialog.prompt('请输入支付密码', '添加账号', (paymentPassword) => {
            Api.req(() => Api.Task.createTaskByUsername(type, value, password, folder.id, paymentPassword),
              true,
              '添加成功',
              '添加失败',
              true,
              '正在添加账号')
              .then(() => {
                Util.alert.refresh(() => Util.store.getTasks(type, folder.id), true)
              })
          })
        })
      }
    })
  }

  function onRefreshButtonClicked () {
    Util.alert.refresh(() => Util.store.filterTasks(type, folder.id, searchbar.instance().query), false)
  }
</script>
