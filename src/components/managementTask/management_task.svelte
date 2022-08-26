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
                       on:searchbarSearch={search}
            />
        </Row>
        <Row noGap class="margin-top">
            <Col width="100">
                <BlockTitle class="title">{folder.name}</BlockTitle>
            </Col>
        </Row>
        <Row class="margin-top-half" noGap>
            <Col width="5">
                <Button tooltip="返回" on:click={() => f7router.back()}>
                    <Icon class="font-weight-bold" md="material:arrow_back"/>
                </Button>
            </Col>
            <Col width="5">
                <Button tooltip="刷新" on:click={onRefreshButtonClick}>
                    <Icon class="font-weight-bold" md="material:refresh"/>
                </Button>
            </Col>
            <Col width="5">
                <Button tooltip="添加账号" on:click={onCreateButtonClick}>
                    <Icon class="font-weight-bold" md="material:add"/>
                </Button>
            </Col>
            <Col width="5">
                <Button tooltip="导入" on:click={onImportButtonClick}>
                    <Icon class="font-weight-bold" md="material:download"/>
                </Button>
            </Col>
            <Col width="80"></Col>
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
  import _ from 'lodash'

  export let folder
  export let f7router
  export let type = ''

  const search = _.debounce(() => Util.store.filterTasks(type, folder.id, searchbar.instance().query), 500)

  let searchbar

  function onCreateButtonClick () {
    if (type === '') {
      f7.dialog.prompt('请输入新账号', '添加账号', (mobile) => {
        Api.req(() => Api.Task.createTaskByMobile(type, mobile, folder.id),
          true,
          true,
          '添加成功',
          '添加失败',
          '正在添加账号')
          .then(() => {
            Util.alert.refresh(() => Util.store.getTasks(type, folder.id), true)
          })
      })
    } else if (type === '2' || type === '4') {
      f7.dialog.login(null, '添加账号', (username, password) => {
        f7.dialog.password('请输入支付密码', '添加账号', (paymentPassword) => {
          Api.req(() => Api.Task.createTaskByUsername(type, username, password, folder.id, paymentPassword),
            true,
            true,
            '添加成功',
            '添加失败',
            '正在添加账号')
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
    Util.alert.refresh(() => Util.store.filterTasks(type, folder.id, searchbar.instance().query), false)
  }
</script>
