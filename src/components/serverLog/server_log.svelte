<PageContent>
    <HighlightAuto class="no-margin" code={logs} />
</PageContent>

<script>
  import {
    PageContent
  } from 'framework7-svelte'
  import { onMount } from 'svelte'
  import Api from '@/js/api'
  import { HighlightAuto } from 'svelte-highlight'

  let logs = ''

  onMount(() => {
    Api.Log.getServerLogs().then(resp => {
      (JSON.parse(resp.data)?.data ?? [])?.forEach(log => {
        if ((log?.log?.length ?? 0) === 0) {
          return
        }
        logs += `${log?.log}\n`
      })
    })
  })
</script>
