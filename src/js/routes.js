import HomePage from '@/pages/home.svelte'
import ServerLogPage from '@/pages/server_log.svelte'
import FolderManagerPage from '@/pages/folder_manager.svelte'
import TaskManagerPage from '@/pages/task_manager.svelte'
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
    path: '/folder_manager/:type/',
    component: FolderManagerPage,
    options: {
      transition: 'f7-dive'
    }
  },
  {
    path: '/task_manager/:type/',
    component: TaskManagerPage,
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
