import HomePage from '@/pages/home.svelte'
import ServerLogPage from '@/pages/server_log.svelte'
import ManagementPage from '@/pages/management.svelte'
import ManagementTaskPage from '@/pages/management_task.svelte'
import Management2Page from '@/pages/management2.svelte'
import Management2TaskPage from '@/pages/management2_task.svelte'
import Management3Page from '@/pages/management3.svelte'
import Management4Page from '@/pages/management4.svelte'
import Management4TaskPage from '@/pages/management4_task.svelte'
import Management5Page from '@/pages/management5.svelte'
import TaskImportPage from '@/pages/task_import.svelte'

const routes = [
  {
    path: '/home/',
    component: HomePage,
    options: {
      transition: 'f7-dive'
    }
  },
  {
    path: '/server_log/',
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
      transition: 'f7-fade'
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
      transition: 'f7-fade'
    }
  },
  {
    path: '/management3/',
    component: Management3Page,
    options: {
      transition: 'f7-dive'
    }
  },
  {
    path: '/management4/',
    component: Management4Page,
    options: {
      transition: 'f7-dive'
    }
  },
  {
    path: '/management4_task/',
    component: Management4TaskPage,
    options: {
      transition: 'f7-fade'
    }
  },
  {
    path: '/management5/',
    component: Management5Page,
    options: {
      transition: 'f7-dive'
    }
  },
  {
    path: '/task_import/',
    component: TaskImportPage,
    options: {
      transition: 'f7-fade'
    }
  }
]

export default routes
