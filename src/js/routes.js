import HomePage from '@/pages/home.svelte'
import ServerLogPage from '@/pages/server_log.svelte'
import ManagementPage from '@/pages/management.svelte'
import ManagementTaskPage from '@/pages/management_task.svelte'
import Management2Page from '@/pages/management2.svelte'
import Management2TaskPage from '@/pages/management2_task.svelte'
import Management3Page from '@/pages/management3.svelte'
import Management3TaskPage from '@/pages/management3_task.svelte'
import Management4Page from '@/pages/management4.svelte'
import Management4TaskPage from '@/pages/management4_task.svelte'
import Management5Page from '@/pages/management5.svelte'
import Management5TaskPage from '@/pages/management5_task.svelte'
import Management6Page from '@/pages/management6.svelte'
import Management6TaskPage from '@/pages/management6_task.svelte'
import Management7Page from '@/pages/management7.svelte'
import Management7TaskPage from '@/pages/management7_task.svelte'
import Management8Page from '@/pages/management8.svelte'
import Management8TaskPage from '@/pages/management8_task.svelte'
import Management9Page from '@/pages/management9.svelte'
import Management9TaskPage from '@/pages/management9_task.svelte'
import Management10Page from '@/pages/management10.svelte'
import Management10TaskPage from '@/pages/management10_task.svelte'
import Management11Page from '@/pages/management11.svelte'
import Management11TaskPage from '@/pages/management11_task.svelte'
import Management12Page from '@/pages/management12.svelte'
import Management12TaskPage from '@/pages/management12_task.svelte'
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
    path: '/management3_task/',
    component: Management3TaskPage,
    options: {
      transition: 'f7-fade'
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
    path: '/management5_task/',
    component: Management5TaskPage,
    options: {
      transition: 'f7-fade'
    }
  },
  {
    path: '/management6/',
    component: Management6Page,
    options: {
      transition: 'f7-dive'
    }
  },
  {
    path: '/management6_task/',
    component: Management6TaskPage,
    options: {
      transition: 'f7-fade'
    }
  },
  {
    path: '/management7/',
    component: Management7Page,
    options: {
      transition: 'f7-dive'
    }
  },
  {
    path: '/management7_task/',
    component: Management7TaskPage,
    options: {
      transition: 'f7-fade'
    }
  },
  {
    path: '/management8/',
    component: Management8Page,
    options: {
      transition: 'f7-dive'
    }
  },
  {
    path: '/management8_task/',
    component: Management8TaskPage,
    options: {
      transition: 'f7-fade'
    }
  },
  {
    path: '/management9/',
    component: Management9Page,
    options: {
      transition: 'f7-dive'
    }
  },
  {
    path: '/management9_task/',
    component: Management9TaskPage,
    options: {
      transition: 'f7-fade'
    }
  },
  {
    path: '/management10/',
    component: Management10Page,
    options: {
      transition: 'f7-dive'
    }
  },
  {
    path: '/management10_task/',
    component: Management10TaskPage,
    options: {
      transition: 'f7-fade'
    }
  },
  {
    path: '/management11/',
    component: Management11Page,
    options: {
      transition: 'f7-dive'
    }
  },
  {
    path: '/management11_task/',
    component: Management11TaskPage,
    options: {
      transition: 'f7-fade'
    }
  },
  {
    path: '/management12/',
    component: Management12Page,
    options: {
      transition: 'f7-dive'
    }
  },
  {
    path: '/management12_task/',
    component: Management12TaskPage,
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
