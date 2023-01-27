import HomePage from '@/pages/home.svelte'
import ServerLogPage from '@/pages/server_log.svelte'
import ManagementPage from '@/pages/management.svelte'
import ManagementTaskPage from '@/pages/management_task.svelte'
import TaskImportPage from '@/pages/task_import.svelte'
import TaskGroup from '@/pages/task_group.svelte'

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
    path: '/management/:type/',
    component: ManagementPage,
    options: {
      transition: 'f7-dive',
      props: {
        type: ''
      }
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
    path: '/task_import/',
    component: TaskImportPage,
    options: {
      transition: 'f7-fade'
    }
  },
  {
    path: '/task_group/',
    component: TaskGroup,
    options: {
      transition: 'f7-fade'
    }
  }
]

export default routes
