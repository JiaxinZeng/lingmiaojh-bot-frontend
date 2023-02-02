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
  let paramPage = framework7.utils.parseUrlQuery(window.location.href)?.page
  if (paramPage) {
    const typeId = /management(\d+)$/.exec(paramPage)?.[1]
    if (typeId) {
      paramPage = `/task_folder_manager/${typeId}/`
    }
  }

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
                    class="sidebar"
            >
                <View>
                    <Page>
                        <List noHairlines menuList>
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
                            <ListItem divider>

                            </ListItem>
                            <ListItem link
                                      title="旅游LML"
                                      selected={curViewPath.startsWith('/task_folder_manager/1/')}
                                      onClick={navigateTo('/task_folder_manager/1/')}
                            >
                                <span slot="media">
                                    <Icon md="material:cloudy_filled"/>
                                </span>
                            </ListItem>
                            <ListItem link
                                      title="汇J生T"
                                      selected={curViewPath.startsWith('/task_folder_manager/2/')}
                                      onClick={navigateTo('/task_folder_manager/2/')}
                            >
                                <span slot="media">
                                    <Icon md="material:cloudy_filled"/>
                                </span>
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
                                      selected={curViewPath.startsWith('/task_folder_manager/8/')}
                                      onClick={navigateTo('/task_folder_manager/8/')}
                            >
                                <span slot="media">
                                    <Icon md="material:cloudy_filled"/>
                                </span>
                            </ListItem>
<!--                            <ListItem link-->
<!--                                      title="点D跳D"-->
<!--                                      selected={curViewPath === 'management9'}-->
<!--                                      onClick={navigateTo('management9')}-->
<!--                            >-->
<!--                            </ListItem>-->
                            <ListItem link
                                      title="果T生X"
                                      selected={curViewPath.startsWith('/task_folder_manager/10/')}
                                      onClick={navigateTo('/task_folder_manager/10/')}
                            >
                                <span slot="media">
                                    <Icon md="material:cloudy_filled"/>
                                </span>
                            </ListItem>
<!--                            <ListItem link-->
<!--                                      title="J娱Meta"-->
<!--                                      selected={curViewPath === 'management11'}-->
<!--                                      onClick={navigateTo('management11')}-->
<!--                            >-->
<!--                            </ListItem>-->
                            <ListItem link
                                      title="星JH"
                                      selected={curViewPath.startsWith('/task_folder_manager/12/')}
                                      onClick={navigateTo('/task_folder_manager/12/')}
                            >
                                <span slot="media">
                                    <Icon md="material:cloudy_filled"/>
                                </span>
                            </ListItem>
                            <ListItem link
                                      title="恋Y"
                                      selected={curViewPath.startsWith('/task_folder_manager/13/')}
                                      onClick={navigateTo('/task_folder_manager/13/')}
                            >
                                <span slot="media">
                                    <Icon md="material:cloudy_filled"/>
                                </span>
                            </ListItem>
<!--                            <ListItem link-->
<!--                                      title="东M优P"-->
<!--                                      selected={curViewPath === 'management14'}-->
<!--                                      onClick={navigateTo('management14')}-->
<!--                            >-->
<!--                            </ListItem>-->
                            <ListItem link
                                      title="红Y旅Y"
                                      selected={curViewPath.startsWith('/task_folder_manager/15/')}
                                      onClick={navigateTo('/task_folder_manager/15/')}
                            >
                                <span slot="media">
                                    <Icon md="material:cloudy_filled"/>
                                </span>
                            </ListItem>
                            <ListItem link
                                      title="邻C家Y"
                                      selected={curViewPath.startsWith('/task_folder_manager/16/')}
                                      onClick={navigateTo('/task_folder_manager/16/')}
                            >
                                <span slot="media">
                                    <Icon md="material:cloudy_filled"/>
                                </span>
                            </ListItem>
                            <ListItem link
                                      title="中Q数J联M"
                                      selected={curViewPath.startsWith('/task_folder_manager/17/')}
                                      onClick={navigateTo('/task_folder_manager/17/')}
                            >
                                <span slot="media">
                                    <Icon md="material:cloudy_filled"/>
                                </span>
                            </ListItem>
                            <ListItem link
                                      title="今H满Z"
                                      selected={curViewPath.startsWith('/task_folder_manager/18/')}
                                      onClick={navigateTo('/task_folder_manager/18/')}
                            >
                                <span slot="media">
                                    <Icon md="material:cloudy_filled"/>
                                </span>
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
                url={paramPage ? `${paramPage}` : '/home/'}
                on:viewInit={onViewInit}
        />
    {/if}
</App>
