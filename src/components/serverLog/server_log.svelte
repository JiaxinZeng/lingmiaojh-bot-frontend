<PageContent class="flex-grow-1">
    <div bind:this={viewport} class="scrollable-container">
        <Highlight class="no-margin" language={basic} code={logs} />
    </div>
    <Svrollbar {viewport} {contents} />
</PageContent>

<script>
  import {
    PageContent
  } from 'framework7-svelte'
  import { onMount } from 'svelte'
  import api from '@/js/api'
  import { Highlight } from 'svelte-highlight'
  import basic from 'svelte-highlight/languages/basic'
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

    contents = document.querySelector('.hljs')
  })
</script>
