<PageContent class="flex-grow-1">
    <div bind:this={viewport} class="scrollable-container">
        <pre bind:this={contents}><code class="language-log">{logs}</code></pre>
    </div>
    <Svrollbar {viewport} {contents} />
</PageContent>

<script>
  import {
    PageContent
  } from 'framework7-svelte'
  import { afterUpdate, onMount } from 'svelte'
  import api from '@/js/api'
  import { Svrollbar } from 'svrollbar'
  import Prism from 'prismjs'

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
      console.log(logs)
    })
  })
  afterUpdate(() => {
    Prism.highlightAll()
  })
</script>
