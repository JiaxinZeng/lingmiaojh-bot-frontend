<List class="no-margin folder-list-item" mediaList>
    <ListItem tooltip={folderName} on:click={action} link>
        <ListItemRow>
            <ListItemCell>
                <Icon md="material:folder" size="100" class="text-align-center width-100" />
            </ListItemCell>
        </ListItemRow>
        <ListItemRow>
            <ListItemCell class="text-align-center item-title">{folderName}</ListItemCell>
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

  export let folderName = '未命名'
  export let action = () => {}
</script>
