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
    name: '云端',
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
  const paramPage = framework7.utils.parseUrlQuery(window.location.href)?.page

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

<App { ...f7params } colorTheme="blue">
    {#if !loading}
        {#if !paramPage}
            <Panel
                    bind:this={sidebar}
                    cover
                    left
                    visibleBreakpoint={960}
            >
                <View>
                    <Page>
                        <List
                                class="margin-top margin-bottom margin-left border-radius-card overflow-hidden"
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
                                      title="账号管理"
                                      disabled
                            >
                                <span slot="media">
                                    <Icon md="material:person_filled"/>
                                </span>
                            </ListItem>
                            <ListItem link
                                      title="旅游LML"
                                      selected={currentPage === 'management/1'}
                                      onClick={changePage('management/1')}
                            >
                            </ListItem>
                            <ListItem link
                                      title="汇J生T"
                                      selected={currentPage === 'management/2'}
                                      onClick={changePage('management/2')}
                            >
                            </ListItem>
                            <!--                            <ListItem link-->
                            <!--                                      title="游Y商C"-->
                            <!--                                      selected={currentPage === 'management3'}-->
                            <!--                                      onClick={changePage('management3')}-->
                            <!--                            >-->
                            <!--                            </ListItem>-->
                            <!--                            <ListItem link-->
                            <!--                                      title="酷Y"-->
                            <!--                                      selected={currentPage === 'management4'}-->
                            <!--                                      onClick={changePage('management4')}-->
                            <!--                            >-->
                            <!--                            </ListItem>-->
                            <!--                            <ListItem link-->
                            <!--                                      title="嗨PJ"-->
                            <!--                                      selected={currentPage === 'management5'}-->
                            <!--                                      onClick={changePage('management5')}-->
                            <!--                            >-->
                            <!--                            </ListItem>-->
                            <!--                            <ListItem link-->
                            <!--                                      title="每日XC"-->
                            <!--                                      selected={currentPage === 'management6'}-->
                            <!--                                      onClick={changePage('management6')}-->
                            <!--                            >-->
                            <!--                            </ListItem>-->
                            <!--                            <ListItem link-->
                            <!--                                      title="七C人S"-->
                            <!--                                      selected={currentPage === 'management7'}-->
                            <!--                                      onClick={changePage('management7')}-->
                            <!--                            >-->
                            <!--                            </ListItem>-->
                            <ListItem link
                                      title="淘F生H"
                                      selected={currentPage === 'management/8'}
                                      onClick={changePage('management/8')}
                            >
                            </ListItem>
<!--                            <ListItem link-->
<!--                                      title="点D跳D"-->
<!--                                      selected={currentPage === 'management9'}-->
<!--                                      onClick={changePage('management9')}-->
<!--                            >-->
<!--                            </ListItem>-->
                            <ListItem link
                                      title="果T生X"
                                      selected={currentPage === 'management/10'}
                                      onClick={changePage('management/10')}
                            >
                            </ListItem>
<!--                            <ListItem link-->
<!--                                      title="J娱Meta"-->
<!--                                      selected={currentPage === 'management11'}-->
<!--                                      onClick={changePage('management11')}-->
<!--                            >-->
<!--                            </ListItem>-->
                            <ListItem link
                                      title="星JH"
                                      selected={currentPage === 'management/12'}
                                      onClick={changePage('management/12')}
                            >
                            </ListItem>
                            <ListItem link
                                      title="恋Y"
                                      selected={currentPage === 'management/13'}
                                      onClick={changePage('management/13')}
                            >
                            </ListItem>
<!--                            <ListItem link-->
<!--                                      title="东M优P"-->
<!--                                      selected={currentPage === 'management14'}-->
<!--                                      onClick={changePage('management14')}-->
<!--                            >-->
<!--                            </ListItem>-->
                            <ListItem link
                                      title="红Y旅Y"
                                      selected={currentPage === 'management/15'}
                                      onClick={changePage('management/15')}
                            >
                            </ListItem>
                            <ListItem link
                                      title="邻C家Y"
                                      selected={currentPage === 'management/16'}
                                      onClick={changePage('management/16')}
                            >
                            </ListItem>
                            <ListItem link
                                      title="中Q数J联M"
                                      selected={currentPage === 'management/17'}
                                      onClick={changePage('management/17')}
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

        <View main class="safe-areas" url={paramPage ? `/${paramPage}/` : '/home/'} />
    {/if}
</App>
