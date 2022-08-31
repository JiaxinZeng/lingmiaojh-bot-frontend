<App { ...f7params } dark colorTheme="pink">
    {#if !onlyPage}
        <Panel cover left visibleBreakpoint={960}>
            <View>
                <Page>
                    <List class="margin-top margin-bottom margin-left" noHairlines menuList>
                        <ListItem link
                                  title="仪表盘"
                                  selected={currentPage === 'home'}
                                  onClick={() => {
                                currentPage = 'home'
                                changePage()
                              }}>
                        <span slot="media">
                            <Icon md="material:dashboard"/>
                        </span>
                        </ListItem>
                        <ListItem link
                                  title="访问管控"
                                  selected={false}
                                  disabled
                                  onClick={() => {}}>
                        <span slot="media">
                            <Icon md="material:beach_access"/>
                        </span>
                        </ListItem>
                        <ListItem link
                                  title="运行日志"
                                  selected={currentPage === 'server_log'}
                                  onClick={() => {
                                currentPage = 'server_log'
                                changePage()
                              }}>
                        <span slot="media">
                            <Icon md="material:history"/>
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
                                  selected={currentPage === 'management'}
                                  onClick={() => {
                                currentPage = 'management'
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
                                  selected={currentPage === 'management2'}
                                  onClick={() => {
                                currentPage = 'management2'
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
                        <ListItem link
                                  title="游鱼商城"
                                  selected={currentPage === 'management3'}
                                  onClick={() => {
                                currentPage = 'management3'
                                changePage()
                              }}>
                        <span slot="media">
                            <img class="display-block"
                                 width="24"
                                 height="24"
                                 src="assets/ic_you_yu_shop.png"
                                 alt=""/>
                        </span>
                        </ListItem>
                        <ListItem link
                                  title="酷游"
                                  selected={currentPage === 'management4'}
                                  onClick={() => {
                                currentPage = 'management4'
                                changePage()
                              }}>
                        <span slot="media">
                            <img class="display-block"
                                 width="24"
                                 height="24"
                                 src="assets/ic_ku_you.png"
                                 alt=""/>
                        </span>
                        </ListItem>
                        <ListItem link
                                  title="嗨品集"
                                  selected={currentPage === 'management5'}
                                  onClick={() => {
                                currentPage = 'management5'
                                changePage()
                              }}>
                        <span slot="media">
                            <img class="display-block"
                                 width="24"
                                 height="24"
                                 src="assets/ic_hi_pin_ji.png"
                                 alt=""/>
                        </span>
                        </ListItem>
                        <ListItem link
                                  title="每日乡村"
                                  selected={currentPage === 'management6'}
                                  onClick={() => {
                                currentPage = 'management6'
                                changePage()
                              }}>
                        <span slot="media">
                            <img class="display-block"
                                 width="24"
                                 height="24"
                                 src="assets/ic_mei_ri_xiang_cun.png"
                                 alt=""/>
                        </span>
                        </ListItem>
                    </List>
                </Page>
            </View>
        </Panel>
    {/if}

    <View main class="safe-areas" url={onlyPage ? `/${onlyPage}/` : '/home/'}/>

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
  import Util from '@/js/util'

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
      buttonCancel: '取消',
      usernamePlaceholder: '账号',
      passwordPlaceholder: '密码'
    }
  }

  const onlyPage = Util.getQueryParams(window.location.href)?.page

  let currentPage = 'home'
  const changePage = _.debounce(function () {
    f7.views.main.router.navigate(`/${currentPage}/`)
  }, 500)
</script>
