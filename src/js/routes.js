import HomePage from '@/pages/home.svelte'
import ServerLogPage from '@/pages/server_log.svelte'
import ManagementPage from '@/pages/management.svelte'
import ManagementTaskPage from '@/pages/management_task.svelte'
import Management2Page from '@/pages/management2.svelte'
import Management2TaskPage from '@/pages/management2_task.svelte'

const routes = [
  {
    path: '/home/',
    component: HomePage,
    options: {
      transition: 'f7-dive'
    }
  },
  {
    path: '/server_log',
    component: ServerLogPage,
    options: {
      transition: 'f7-dive'
    }
  },
  {
    path: '/management/',
    component: ManagementPage,
    options: {
      transition: 'f7-dive'
    }
  },
  {
    path: '/management_task/',
    component: ManagementTaskPage,
    options: {
      transition: 'f7-fade',
      props: {
        folder: null
      }
    }
  },
  {
    path: '/management2/',
    component: Management2Page,
    options: {
      transition: 'f7-dive'
    }
  },
  {
    path: '/management2_task/',
    component: Management2TaskPage,
    options: {
      transition: 'f7-fade',
      props: {
        folder: null
      }
    }
  }
]

export default routes
