<Card noShadow class={`no-margin action-bar ${classNames}`} slot="fixed">
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

  let classNames

  export { classNames as class }
</script>
