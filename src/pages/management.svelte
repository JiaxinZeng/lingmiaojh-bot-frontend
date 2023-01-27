<Page class="main-page" pageContent={false}>
    <Management type={f7route.params.type} f7router={f7router} />
</Page>

<script>
  import { Page } from 'framework7-svelte'
  import Management from '@/components/management'

  export let f7router
  export let f7route
</script>
