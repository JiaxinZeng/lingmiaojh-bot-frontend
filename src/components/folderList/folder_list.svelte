<Block class="no-margin no-padding">
    {#each folders as folderRow}
        <Row noGap>
            {#each new Array(colNum) as _, i}
                <Col>
                    {#if folderRow[i]}
                        <FolderListItem action={e => {
                          action(e, folderRow[i])
                        }} folderName={folderRow[i].name}/>
                    {/if}
                </Col>
            {/each}
        </Row>
    {/each}
</Block>

<script>
  import {
    Block,
    Row,
    Col,
    useStore
  } from 'framework7-svelte'
  import FolderListItem from './folder_list_item.svelte'
  import { onMount } from 'svelte'
  import _ from 'lodash'
  import Util from '@/js/utils'

  export let action = () => {}
  export let type = ''

  onMount(() => {
    Util.store.getTaskFolders(type)
  })

  const colNum = Math.ceil((window.innerWidth - 32) / 250)
  let folders = useStore(`task${type}Folders`, newFolders => (folders = _.chunk(newFolders, colNum)))
</script>
