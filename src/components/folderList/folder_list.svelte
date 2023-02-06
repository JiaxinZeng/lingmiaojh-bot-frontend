<Block class="no-margin no-padding">
    {#if folders}
        {#each _.chunk(folders[type], colNum) as folderRow}
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
    {/if}
</Block>

<script>
  import {
    Block,
    Row,
    Col,
    useStore
  } from 'framework7-svelte'
  import FolderListItem from './folder_list_item.svelte'
  import _ from 'lodash'

  export let action = () => {}
  export let type

  let colNum = calcColNum()

  window.addEventListener('resize', () => {
    colNum = calcColNum()
  })
  let folders = useStore('taskFolders', newFolders => { folders = newFolders })

  function calcColNum () {
    return Math.ceil((window.innerWidth - 32) / 250)
  }
</script>
