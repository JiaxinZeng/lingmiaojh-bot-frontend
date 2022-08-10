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
                       on:input={e => (store.dispatch(`filterTask${type}s`, { folderId: folder.id, titleName: e.detail[0].target.value }))}
            />
        </Row>
        <Row noGap class="margin-top">
            <Col width="100">
                <BlockTitle class="no-margin font-weight-bold font-size-16px">{`[${folder.name}]文件夹`}</BlockTitle>
            </Col>
        </Row>
        <Row class="margin-top-half" noGap>
            <Col width="5">
                <Button tooltip="返回" on:click={() => {
                  f7router.back()
                }}>
                        <Icon class="font-weight-bold" md="material:arrow_back"/>
                </Button>
            </Col>
            <Col width="5">
                <Button tooltip="添加账号" on:click={() => {
                  f7.dialog.prompt('请输入新账号', '添加账号')
                }}>
                    <Icon class="font-weight-bold" md="material:add"/>
                </Button>
            </Col>
            <Col width="90"></Col>
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
  import store from '@/js/store'

  export let folder
  export let f7router
  export let type = ''
</script>
