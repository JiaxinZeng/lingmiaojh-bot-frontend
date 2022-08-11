<Card noShadow class="no-margin margin-bottom" slot="fixed">
        <CardContent padding={false} slot="content">
            <slot></slot>
        </CardContent>
</Card>

<script>
  import {
    Card,
    CardContent
  } from 'framework7-svelte'
</script>
