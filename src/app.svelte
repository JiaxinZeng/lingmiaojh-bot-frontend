<App { ...f7params } colorTheme="blue">
    {#if !loading}
        {#if !onlyPage}
            <Panel
                    bind:this={sidebar}
                    cover
                    left
                    visibleBreakpoint={960}
            >
                <View>
                    <Page>
                        <List
                                class={`${window.innerWidth > 960 ? 'margin-top margin-bottom margin-left border-radius-card' : 'no-margin'} overflow-hidden`}
                                noHairlines
                                menuList
                        >
                            <ListItem link
                                      title="仪表盘"
                                      selected={currentPage === 'home'}
                                      onClick={changePage('home')}
                            >
                        <span slot="media">
                            <Icon md="material:dashboard"/>
                        </span>
                            </ListItem>
                            <ListItem link
                                      title="访问管控"
                                      selected={false}
                                      disabled
                            >
                        <span slot="media">
                            <Icon md="material:beach_access"/>
                        </span>
                            </ListItem>
                            <ListItem link
                                      title="运行日志"
                                      selected={currentPage === 'server_log'}
                                      onClick={changePage('server_log')}
                            >
                        <span slot="media">
                            <Icon md="material:history"/>
                        </span>
                            </ListItem>
                            <ListItem link
                                      title="账号管理"
                                      disabled
                            >
                        <span slot="media">
                            <Icon md="material:person_filled"/>
                        </span>
                            </ListItem>
                            <ListItem link
                                      title="旅游LML"
                                      selected={currentPage === 'management'}
                                      onClick={changePage('management')}
                            >
                                <!--                        <span slot="media">-->
                                <!--                            <img class="display-block"-->
                                <!--                                 width="24"-->
                                <!--                                 height="24"-->
                                <!--                                 src="assets/ic_lv_you_lian_meng_lian.png"-->
                                <!--                                 alt=""/>-->
                                <!--                        </span>-->
                            </ListItem>
                            <ListItem link
                                      title="汇J生T"
                                      selected={currentPage === 'management2'}
                                      onClick={changePage('management2')}
                            >
                                <!--                        <span slot="media">-->
                                <!--                            <img class="display-block"-->
                                <!--                                 width="24"-->
                                <!--                                 height="24"-->
                                <!--                                 src="assets/ic_hui_jin_sheng_tai.png"-->
                                <!--                                 alt=""/>-->
                                <!--                        </span>-->
                            </ListItem>
                            <ListItem link
                                      title="游Y商C"
                                      selected={currentPage === 'management3'}
                                      onClick={changePage('management3')}
                            >
                                <!--                        <span slot="media">-->
                                <!--                            <img class="display-block"-->
                                <!--                                 width="24"-->
                                <!--                                 height="24"-->
                                <!--                                 src="assets/ic_you_yu_shop.png"-->
                                <!--                                 alt=""/>-->
                                <!--                        </span>-->
                            </ListItem>
                            <ListItem link
                                      title="酷Y"
                                      selected={currentPage === 'management4'}
                                      onClick={changePage('management4')}
                            >
                                <!--                        <span slot="media">-->
                                <!--                            <img class="display-block"-->
                                <!--                                 width="24"-->
                                <!--                                 height="24"-->
                                <!--                                 src="assets/ic_ku_you.png"-->
                                <!--                                 alt=""/>-->
                                <!--                        </span>-->
                            </ListItem>
                            <ListItem link
                                      title="嗨PJ"
                                      selected={currentPage === 'management5'}
                                      onClick={changePage('management5')}
                            >
                                <!--                        <span slot="media">-->
                                <!--                            <img class="display-block"-->
                                <!--                                 width="24"-->
                                <!--                                 height="24"-->
                                <!--                                 src="assets/ic_hi_pin_ji.png"-->
                                <!--                                 alt=""/>-->
                                <!--                        </span>-->
                            </ListItem>
                            <ListItem link
                                      title="每日XC"
                                      selected={currentPage === 'management6'}
                                      onClick={changePage('management6')}
                            >
                                <!--                        <span slot="media">-->
                                <!--                            <img class="display-block"-->
                                <!--                                 width="24"-->
                                <!--                                 height="24"-->
                                <!--                                 src="assets/ic_mei_ri_xiang_cun.png"-->
                                <!--                                 alt=""/>-->
                                <!--                        </span>-->
                            </ListItem>
                            <ListItem link
                                      title="七C人S"
                                      selected={currentPage === 'management7'}
                                      onClick={changePage('management7')}
                            >
                            </ListItem>
                            <ListItem link
                                      title="淘F生H"
                                      selected={currentPage === 'management8'}
                                      onClick={changePage('management8')}
                            >
                            </ListItem>
                        </List>
                    </Page>
                </View>
            </Panel>

            {#if showingSidebarFab}
                <Fab
                        position="right-bottom"
                        class="z-index-5001"
                        on:click={() => { sidebar.instance().toggle() }}
                >
                    <Icon md="material:menu"></Icon>
                </Fab>
            {/if}
        {/if}

        <View main class="safe-areas" url={onlyPage ? `/${onlyPage}/` : '/home/'}/>
    {/if}
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
    f7,
    Fab
  } from 'framework7-svelte'
  import routes from '@/js/routes'
  import store from '@/js/store'
  import _ from 'lodash'
  import framework7 from 'framework7'
  import utils from '@/js/utils'
  import { onMount } from 'svelte'

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

  const onlyPage = framework7.utils.parseUrlQuery(window.location.href)?.page

  let currentPage = 'home'
  const _changePage = _.debounce(function (page) {
    f7.views.main.router.navigate(`/${page}/`)
  }, 500)
  const changePage = (page) => {
    return function () {
      currentPage = page
      _changePage(page)
    }
  }

  let sidebar
  let showingSidebarFab = false
  let loading = true

  onMount(() => {
    utils.progress.loading(() => utils.store.getUserInfo(), true, '正在加载用户信息').then(() => {
      loading = false
    })
  })

  showingSidebarFab = window.innerWidth < 960
  window.addEventListener('resize', () => {
    showingSidebarFab = window.innerWidth < 960
  })
</script>
