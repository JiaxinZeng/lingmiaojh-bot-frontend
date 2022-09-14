<PageContent class="flex-grow-1">
    <div bind:this={viewport} class="scrollable-container">
        <pre class="no-margin" bind:this={contents}>{logs}</pre>
    </div>
    <Svrollbar {viewport} {contents} />
</PageContent>

<script>
  import {
    PageContent
  } from 'framework7-svelte'
  import { onMount } from 'svelte'
  import api from '@/js/api'
  import { Svrollbar } from 'svrollbar'

  let logs = ''
  let viewport
  let contents

  onMount(() => {
    api.log.getServerLogs().then(resp => {
      (JSON.parse(resp.data)?.data ?? [])?.forEach(log => {
        if ((log?.log?.length ?? 0) === 0) {
          return
        }
        logs += `${log?.log}\n`
      })
    })
  })
</script>
