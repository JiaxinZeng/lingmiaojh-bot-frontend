<List class="no-margin folder-list-item" mediaList>
    <ListItem tooltip={folderName} on:click={action} link>
        <ListItemRow>
            <ListItemCell>
                <Icon md="material:folder" size="100" class="text-align-center width-100" />
            </ListItemCell>
        </ListItemRow>
        <ListItemRow>
            <div bind:this={title} class="text-align-center item-title item-cell">{folderName}</div>
        </ListItemRow>
    </ListItem>
</List>

<script>
  import './folder_list_item.scss'
  import {
    Icon,
    List,
    ListItem,
    ListItemCell,
    ListItemRow
  } from 'framework7-svelte'
  import clamp from 'clamp-js'
  import { onMount } from 'svelte'

  export let folderName = '未命名'
  export let action = () => {}

  let title

  onMount(() => {
    clamp(title, { clamp: 2 })
  })
</script>
