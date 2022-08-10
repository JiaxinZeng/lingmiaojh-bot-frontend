<ActionBar>
    <Row noGap>
        <Searchbar noHairline
                   noShadow
                   customSearch
                   backdrop={false}
                   form={false}
                   disableButton={false}
                   placeholder="搜索文件夹"
                   on:input={e => (store.dispatch(`filterTask${type}Folders`, e.detail[0].target.value))}
        />
    </Row>
    <Row noGap class="margin-top-half">
        <Col width="5">
            <Button tooltip="新建文件夹" on:click={() => {
                  f7.dialog.prompt('请输入新文件夹名称', '新建文件夹')
                }}>
                <Icon class="font-weight-bold" md="material:add"/>
            </Button>
        </Col>
    </Row>
</ActionBar>
<PageContent class="flex-grow-1">
    <FolderList type={type} action={(e, folder) => {
      clickedFolder = folder
      _.forEach(e.detail.path, (item) => {
        if (item.className?.includes('folder-list-item')) {
          popover.instance().open(item, true)
        }
      })
    }}/>
    <Popover bind:this={popover}>
        <List noHairlines noHairlinesBetween>
            <ListItem popoverClose>
                <span slot="title" class="font-weight-bold">{clickedFolder?.name}</span>
            </ListItem>
            <ListItem link popoverClose on:click={ () => {
              f7router.navigate(`/management${type}_task/`, {
                props: {
                  folder: clickedFolder
                }
              })
            }} title="打开"/>
            <ListItem link popoverClose title="重命名"/>
            <ListItem link popoverClose title="删除"/>
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
  import store from '@/js/store'
  import FolderList from '@/components/folderList'
  import _ from 'lodash'

  export let f7router
  export let type = ''

  let popover
  let clickedFolder = null
</script>
