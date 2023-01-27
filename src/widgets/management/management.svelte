<script>
  import ActionBar from '@/components/actionBar'
  import {
    Button,
    f7,
    Icon,
    List,
    ListItem,
    PageContent,
    Popover,
    useStore
  } from 'framework7-svelte'
  import FolderList from '@/components/folderList'
  import api from '@/js/api'
  import utils from '@/js/utils'
  import framework7 from 'framework7'
  import { onMount } from 'svelte'

  export let f7router
  export let type = ''
  let popover
  let clickedFolder = null

  const paramNoDelete = framework7.utils.parseUrlQuery(window.location.href)?.noDelete
  const paramFolder = framework7.utils.parseUrlQuery(window.location.href)?.folder

  let folders = useStore('taskFolders', newFolders => {
    folders = newFolders
    jumpToParamFolder()
  })

  onMount(() => {
    utils.store.getTaskFolders(type)
  })

  function jumpToParamFolder () {
    const targetFolder = paramFolder ? parseInt(paramFolder) : null
    if (!targetFolder || Number.isNaN(targetFolder)) {
      return
    }

    if (paramFolder) {
      const folder = folders[type]?.find(f => f.id === targetFolder)
      if (folder) {
        console.log(folder)
        setTimeout(() => {
          f7router.navigate('/management_task/', {
            props: {
              folder,
              type
            }
          })
        }, 500)
      }
    }
  }

  function onCreateButtonClick () {
    f7.dialog.prompt('请输入新文件夹名称', '新建文件夹', (name) => {
      api.req(() => api.folder.createTaskFolder(type, name), '新建文件夹成功', '新建文件夹失败', '正在新建文件夹')
        .then(() => {
          utils.progress.loading(() => utils.store.getTaskFolders(type), true)
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
      api.req(() => api.folder.changeTaskFolderName(type, clickedFolder.id, name), '重命名成功', '重命名失败',
        '正在重命名文件夹')
        .then(() => {
          utils.progress.loading(() => utils.store.getTaskFolders(type), true)
        })
    }, () => {}, clickedFolder?.name)
  }

  function onDeleteFolderButtonClick () {
    f7.dialog.confirm('确定删除文件夹吗?', '删除文件夹', () => {
      api.req(() => api.folder.deleteTaskFolder(type, clickedFolder.id), '删除成功', '删除失败', '正在删除文件夹')
        .then(() => {
          utils.progress.loading(() => utils.store.getTaskFolders(type), true)
        })
    })
  }

  function onRefreshButtonClick () {
    utils.progress.loading(() => utils.store.getTaskFolders(type), false)
  }

  function onFolderClick () {
    f7router.navigate('/management_task/', {
      props: {
        folder: clickedFolder,
        type
      }
    })
  }
</script>

{#if !paramFolder}
    <ActionBar class="margin-bottom-half">
        <div class="display-flex">
            <div>
                <Button on:click={onCreateButtonClick}>
                    <Icon class="font-weight-bold" md="material:add"/>
                    <span class="font-weight-bold">添加</span>
                </Button>
            </div>
            <div>
                <Button on:click={onRefreshButtonClick}>
                    <Icon class="font-weight-bold" md="material:refresh"/>
                    <span class="font-weight-bold">刷新</span>
                </Button>
            </div>
        </div>
    </ActionBar>
    <PageContent>
        <FolderList type={type} action={onFolderListAction}/>
        <Popover bind:this={popover}>
            <List noHairlines noHairlinesBetween>
                <ListItem popoverClose>
                    <span slot="title" class="font-weight-bold">{clickedFolder?.name}</span>
                </ListItem>
                <ListItem link
                          popoverClose
                          on:click={onFolderClick}
                          title="打开"/>
                <ListItem link popoverClose on:click={onChangeFolderNameButtonClick} title="重命名"/>
                {#if !paramNoDelete}
                    <ListItem link popoverClose on:click={onDeleteFolderButtonClick} title="删除"/>
                {/if}
            </List>
        </Popover>
    </PageContent>
{:else}
    <PageContent>跳转到目标文件夹中...</PageContent>
{/if}
