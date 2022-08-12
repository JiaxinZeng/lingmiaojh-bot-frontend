import { createStore } from 'framework7/lite'
import Api from '@/js/api'

const store = createStore({
  state: {
    tasks: [],
    taskFolders: [],
    task2s: [],
    task2Folders: []
  },
  getters: {
    tasks ({ state }) {
      return state.tasks
    },
    taskFolders ({ state }) {
      return state.taskFolders
    },
    task2s ({ state }) {
      return state.task2s
    },
    task2Folders ({ state }) {
      return state.task2Folders
    }
  },
  actions: {
    getTasks ({ state }, folderId) {
      Api.Task.getTasks('', folderId).then(resp => {
        state.tasks = JSON.parse(resp.data).data
      })
    },
    filterTasks ({ state }, {
      folderId,
      titleName
    }) {
      Api.Task.getTasks('', folderId).then(resp => {
        state.tasks = JSON.parse(resp.data).data.filter(task => {
          return task.mobile.toLowerCase().includes(titleName.toLowerCase())
        })
      })
    },
    getTaskFolders ({ state }) {
      Api.Folder.getTaskFolders('').then(resp => {
        state.taskFolders = JSON.parse(resp.data).data
      })
    },
    filterTaskFolders ({ state }, folderName) {
      Api.Folder.getTaskFolders('').then(resp => {
        state.taskFolders = JSON.parse(resp.data).data.filter(folder => {
          return folder.name.toLowerCase().includes(folderName.toLowerCase())
        })
      })
    },

    getTask2s ({ state }, folderId) {
      Api.Task.getTasks('2', folderId).then(response => {
        state.task2s = JSON.parse(response.data).data
      })
    },
    filterTask2s ({ state }, {
      folderId,
      titleName
    }) {
      Api.Task.getTasks('2', folderId).then(resp => {
        state.task2s = JSON.parse(resp.data).data.filter(task => {
          return task.username.toLowerCase().includes(titleName.toLowerCase())
        })
      })
    },
    getTask2Folders ({ state }) {
      Api.Folder.getTaskFolders('2').then(resp => {
        state.task2Folders = JSON.parse(resp.data).data
      })
    },
    filterTask2Folders ({ state }, folderName) {
      Api.Folder.getTaskFolders('2').then(resp => {
        state.task2Folders = JSON.parse(resp.data).data.filter(folder => {
          return folder.name.toLowerCase().includes(folderName.toLowerCase())
        })
      })
    }
  }
})
export default store
