<PageContent>
    <Highlight class="no-margin" language={basic} code={logs} />
</PageContent>

<script>
  import {
    PageContent
  } from 'framework7-svelte'
  import { onMount } from 'svelte'
  import Api from '@/js/api'
  import { Highlight } from 'svelte-highlight'
  import basic from 'svelte-highlight/languages/basic'

  let logs = ''

  onMount(() => {
    Api.log.getServerLogs().then(resp => {
      (JSON.parse(resp.data)?.data ?? [])?.forEach(log => {
        if ((log?.log?.length ?? 0) === 0) {
          return
        }
        logs += `${log?.log}\n`
      })
    })
  })
</script>
