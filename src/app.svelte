<App { ...f7params } dark colorTheme="pink">
    <Panel cover left visibleBreakpoint={960}>
        <View>
            <Page>
                <List class="margin" inset menuList>
                    <ListItem link
                              title="仪表盘"
                              selected={selected === 'home'}
                              onClick={() => {
                                selected = 'home'
                                changePage()
                              }}>
                        <span slot="media">
                            <Icon md="material:dashboard"/>
                        </span>
                    </ListItem>
                    <ListItem link
                              title="账号管理"
                              disabled>
                        <span slot="media">
                            <Icon md="material:person_filled"/>
                        </span>
                    </ListItem>
                    <ListItem link
                              title="旅游联盟链"
                              selected={selected === 'management'}
                              onClick={() => {
                                selected = 'management'
                                changePage()
                              }}>
                        <span slot="media">
                            <img class="display-block"
                                 width="24"
                                 height="24"
                                 src="assets/ic_lv_you_lian_meng_lian.png"
                                 alt=""/>
                        </span>
                    </ListItem>
                    <ListItem link
                              title="汇金生态"
                              selected={selected === 'management2'}
                              onClick={() => {
                                selected = 'management2'
                                changePage()
                              }}>
                        <span slot="media">
                            <img class="display-block"
                                 width="24"
                                 height="24"
                                 src="assets/ic_hui_jin_sheng_tai.png"
                                 alt=""/>
                        </span>
                    </ListItem>
                </List>
            </Page>
        </View>
    </Panel>

    <View main class="safe-areas" url="/home/"/>

</App>

<script>
  import {
    App,
    View,
    Panel,
    Page,
    List,
    ListItem,
    Icon,
    f7
  } from 'framework7-svelte'
  import routes from '@/js/routes'
  import store from '@/js/store'
  import _ from 'lodash'

  const f7params = {
    name: 'Lingmiaojh Bot',
    theme: 'md',
    store,
    routes,
    serviceWorker: process.env.NODE_ENV === 'production'
      ? {
          path: '/service-worker.js'
        }
      : {},
    dialog: {
      buttonOk: '确定',
      buttonCancel: '取消'
    }
  }

  let selected = 'home'
  const changePage = _.debounce(function () {
    f7.views.main.router.navigate(`/${selected}/`)
  }, 500)
</script>
