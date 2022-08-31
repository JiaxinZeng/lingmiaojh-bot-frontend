<ActionBar>
    <Row noGap>
        <Searchbar noHairline
                   noShadow
                   customSearch
                   backdrop={false}
                   form={false}
                   disableButton={false}
                   placeholder="搜索文件夹"
                   bind:this={searchbar}
                   on:searchbarSearch={search}
        />
    </Row>
    <Row noGap class="margin-top-half">
        <Col width="10">
            <Button on:click={onCreateButtonClick}>
                <Icon class="font-weight-bold" md="material:add"/>
                <span class="font-weight-bold">添加</span>
            </Button>
        </Col>
        <Col width="10">
            <Button on:click={onRefreshButtonClick}>
                <Icon class="font-weight-bold" md="material:refresh"/>
                <span class="font-weight-bold">刷新</span>
            </Button>
        </Col>
        <Col width="80"></Col>
    </Row>
</ActionBar>
<PageContent class="flex-grow-1">
    <FolderList type={type} action={onFolderListAction}/>
    <Popover bind:this={popover}>
        <List noHairlines noHairlinesBetween>
            <ListItem popoverClose>
                <span slot="title" class="font-weight-bold">{clickedFolder?.name}</span>
            </ListItem>
            <ListItem link
                      popoverClose
                      on:click={ () => {
                        f7router.navigate(`/management${type}_task/`, {
                          props: {
                            folder: clickedFolder
                          }
                        })
                      }}
                      title="打开"/>
            <ListItem link popoverClose on:click={onChangeFolderNameButtonClick} title="重命名"/>
            <ListItem link popoverClose on:click={onDeleteFolderButtonClick} title="删除"/>
        </List>
    </Popover>
</PageContent>

<script>
  import ActionBar from '@/components/actionBar'
  import {
    Button,
    Col,
    f7,
    Icon,
    List,
    ListItem,
    PageContent,
    Popover,
    Row,
    Searchbar
  } from 'framework7-svelte'
  import FolderList from '@/components/folderList'
  import _ from 'lodash'
  import Api from '@/js/api'
  import Util from '@/js/util'

  export let f7router
  export let type = ''

  const search = _.debounce(() => Util.store.filterTaskFolders(type, searchbar.instance().query), 500)

  let popover
  let clickedFolder = null
  let searchbar

  function onCreateButtonClick () {
    f7.dialog.prompt('请输入新文件夹名称', '新建文件夹', (name) => {
      Api.req(() => Api.Folder.createTaskFolder(type, name), '新建文件夹成功', '新建文件夹失败', '正在新建文件夹')
        .then(() => {
          Util.alert.refresh(() => Util.store.getTaskFolders(type), true)
        })
    })
  }

  function onFolderListAction (e, folder) {
    clickedFolder = folder

    let target = e.detail.target
    while (true) {
      if (target.classList.contains('folder-list-item')) {
        popover.instance().open(target, true)
        break
      }

      target = target.parentElement

      if (!target) {
        break
      }
    }
  }

  function onChangeFolderNameButtonClick () {
    f7.dialog.prompt('请输入新文件夹名称', '重命名文件夹', (name) => {
      Api.req(() => Api.Folder.changeTaskFolderName(type, clickedFolder.id, name), '重命名成功', '重命名失败',
        '正在重命名文件夹')
        .then(() => {
          Util.alert.refresh(() => Util.store.getTaskFolders(type), true)
        })
    }, () => {}, clickedFolder?.name)
  }

  function onDeleteFolderButtonClick () {
    f7.dialog.confirm('确定删除文件夹吗?', '删除文件夹', () => {
      Api.req(() => Api.Folder.deleteTaskFolder(type, clickedFolder.id), '删除成功', '删除失败', '正在删除文件夹')
        .then(() => {
          Util.alert.refresh(() => Util.store.getTaskFolders(type), true)
        })
    })
  }

  function onRefreshButtonClick () {
    Util.alert.refresh(() => Util.store.filterTaskFolders(type, searchbar.instance().query), false)
  }
</script>
