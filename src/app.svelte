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

  let curViewPath = '/home/'
  const navigateTo = (path) => {
    return function () {
      f7.views.main.router.navigate(`${path}`)
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

  function onViewInit () {
    f7.view.main.router.on('routeChange', (newRoute, previousRoute, router) => {
      curViewPath = newRoute.path
    })
  }
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
                                      selected={curViewPath === '/home/'}
                                      onClick={navigateTo('/home/')}
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
                                      selected={curViewPath.startsWith('/management/1/')}
                                      onClick={navigateTo('/management/1/')}
                            >
                            </ListItem>
                            <ListItem link
                                      title="汇J生T"
                                      selected={curViewPath.startsWith('/management/2/')}
                                      onClick={navigateTo('/management/2/')}
                            >
                            </ListItem>
                            <!--                            <ListItem link-->
                            <!--                                      title="游Y商C"-->
                            <!--                                      selected={curViewPath === 'management3'}-->
                            <!--                                      onClick={navigateTo('management3')}-->
                            <!--                            >-->
                            <!--                            </ListItem>-->
                            <!--                            <ListItem link-->
                            <!--                                      title="酷Y"-->
                            <!--                                      selected={curViewPath === 'management4'}-->
                            <!--                                      onClick={navigateTo('management4')}-->
                            <!--                            >-->
                            <!--                            </ListItem>-->
                            <!--                            <ListItem link-->
                            <!--                                      title="嗨PJ"-->
                            <!--                                      selected={curViewPath === 'management5'}-->
                            <!--                                      onClick={navigateTo('management5')}-->
                            <!--                            >-->
                            <!--                            </ListItem>-->
                            <!--                            <ListItem link-->
                            <!--                                      title="每日XC"-->
                            <!--                                      selected={curViewPath === 'management6'}-->
                            <!--                                      onClick={navigateTo('management6')}-->
                            <!--                            >-->
                            <!--                            </ListItem>-->
                            <!--                            <ListItem link-->
                            <!--                                      title="七C人S"-->
                            <!--                                      selected={curViewPath === 'management7'}-->
                            <!--                                      onClick={navigateTo('management7')}-->
                            <!--                            >-->
                            <!--                            </ListItem>-->
                            <ListItem link
                                      title="淘F生H"
                                      selected={curViewPath.startsWith('/management/8/')}
                                      onClick={navigateTo('/management/8/')}
                            >
                            </ListItem>
<!--                            <ListItem link-->
<!--                                      title="点D跳D"-->
<!--                                      selected={curViewPath === 'management9'}-->
<!--                                      onClick={navigateTo('management9')}-->
<!--                            >-->
<!--                            </ListItem>-->
                            <ListItem link
                                      title="果T生X"
                                      selected={curViewPath.startsWith('/management/10/')}
                                      onClick={navigateTo('/management/10/')}
                            >
                            </ListItem>
<!--                            <ListItem link-->
<!--                                      title="J娱Meta"-->
<!--                                      selected={curViewPath === 'management11'}-->
<!--                                      onClick={navigateTo('management11')}-->
<!--                            >-->
<!--                            </ListItem>-->
                            <ListItem link
                                      title="星JH"
                                      selected={curViewPath.startsWith('/management/12/')}
                                      onClick={navigateTo('/management/12/')}
                            >
                            </ListItem>
                            <ListItem link
                                      title="恋Y"
                                      selected={curViewPath.startsWith('/management/13/')}
                                      onClick={navigateTo('/management/13/')}
                            >
                            </ListItem>
<!--                            <ListItem link-->
<!--                                      title="东M优P"-->
<!--                                      selected={curViewPath === 'management14'}-->
<!--                                      onClick={navigateTo('management14')}-->
<!--                            >-->
<!--                            </ListItem>-->
                            <ListItem link
                                      title="红Y旅Y"
                                      selected={curViewPath.startsWith('/management/15/')}
                                      onClick={navigateTo('/management/15/')}
                            >
                            </ListItem>
                            <ListItem link
                                      title="邻C家Y"
                                      selected={curViewPath.startsWith('/management/16/')}
                                      onClick={navigateTo('/management/16/')}
                            >
                            </ListItem>
                            <ListItem link
                                      title="中Q数J联M"
                                      selected={curViewPath.startsWith('/management/17/')}
                                      onClick={navigateTo('/management/17/')}
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

        <View
                main
                class="safe-areas"
                url={paramPage ? `/${paramPage}/` : '/home/'}
                on:viewInit={onViewInit}
        />
    {/if}
</App>
