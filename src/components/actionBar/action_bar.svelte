<Card noShadow class="no-margin margin-bottom action-bar" slot="fixed">
        <CardContent padding={false} slot="content">
            <slot></slot>
        </CardContent>
</Card>

<script>
  import {
    Card,
    CardContent
  } from 'framework7-svelte'
  import './action_bar.scss'
</script>
