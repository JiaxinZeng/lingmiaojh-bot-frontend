import { createStore } from 'framework7/lite'
import folderApi from '@/js/api/folder'
import taskApi from '@/js/api/task'

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
      taskApi.getTasks(folderId).then(response => {
        state.tasks = JSON.parse(response.data).data
      })
    },
    filterTasks ({ state }, {
      folderId,
      titleName
    }) {
      taskApi.getTasks(folderId).then(resp => {
        state.tasks = JSON.parse(resp.data).data.filter(task => {
          return task.mobile.toLowerCase().includes(titleName.toLowerCase())
        })
      })
    },
    addTaskFolder ({ state }, folder) {
      state.taskFolders = [...state.taskFolders, folder]
    },
    getTaskFolders ({ state }) {
      folderApi.getTaskFolders().then(resp => {
        state.taskFolders = JSON.parse(resp.data).data
      })
    },
    filterTaskFolders ({ state }, folderName) {
      folderApi.getTaskFolders().then(resp => {
        state.taskFolders = JSON.parse(resp.data).data.filter(folder => {
          return folder.name.toLowerCase().includes(folderName.toLowerCase())
        })
      })
    },

    getTask2s ({ state }, folderId) {
      taskApi.getTask2s(folderId).then(response => {
        state.task2s = JSON.parse(response.data).data
      })
    },
    filterTask2s ({ state }, {
      folderId,
      titleName
    }) {
      taskApi.getTask2s(folderId).then(resp => {
        state.task2s = JSON.parse(resp.data).data.filter(task => {
          return task.username.toLowerCase().includes(titleName.toLowerCase())
        })
      })
    },
    addTask2Folder ({ state }, folder) {
      state.task2Folders = [...state.task2Folders, folder]
    },
    getTask2Folders ({ state }) {
      folderApi.getTask2Folders().then(resp => {
        state.task2Folders = JSON.parse(resp.data).data
      })
    },
    filterTask2Folders ({ state }, folderName) {
      folderApi.getTask2Folders().then(resp => {
        state.task2Folders = JSON.parse(resp.data).data.filter(folder => {
          return folder.name.toLowerCase().includes(folderName.toLowerCase())
        })
      })
    }
  }
})
export default store
