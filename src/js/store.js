import { createStore } from 'framework7/lite'
import Api from '@/js/api'

const store = createStore({
  state: {
    tasks: [],
    taskFolders: [],
    task2s: [],
    task2Folders: [],
    task4s: [],
    task4Folders: []
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
    },
    task4s ({ state }) {
      return state.task4s
    },
    task4Folders ({ state }) {
      return state.task4Folders
    }
  },
  actions: {
    getTasks ({ state }, { type, folderId, okCallback, errorCallback }) {
      Api.Task.getTasks(type, folderId).then(resp => {
        state[`task${type}s`] = JSON.parse(resp.data).data
        okCallback && okCallback(resp)
      }).catch(err => {
        errorCallback && errorCallback(err)
      })
    },
    filterTasks ({ state }, { type, folderId, titleName, okCallback, errorCallback }) {
      Api.Task.getTasks(type, folderId).then(resp => {
        state[`task${type}s`] = JSON.parse(resp.data).data.filter(task => {
          const taskTitleName = task?.mobile ?? task?.username
          return taskTitleName.toLowerCase().includes(titleName.toLowerCase())
        })
        okCallback && okCallback(resp)
      }).catch(err => {
        errorCallback && errorCallback(err)
      })
    },
    getTaskFolders ({ state }, { type, okCallback, errorCallback }) {
      Api.Folder.getTaskFolders(type).then(resp => {
        state[`task${type}Folders`] = JSON.parse(resp.data).data
        okCallback && okCallback(resp)
      }).catch(err => {
        errorCallback && errorCallback(err)
      })
    },
    filterTaskFolders ({ state }, { type, folderName, okCallback, errorCallback }) {
      Api.Folder.getTaskFolders(type).then(resp => {
        state[`task${type}Folders`] = JSON.parse(resp.data).data.filter(folder => {
          return folder.name.toLowerCase().includes(folderName.toLowerCase())
        })
        okCallback && okCallback(resp)
      }).catch(err => {
        errorCallback && errorCallback(err)
      })
    }
  }
})
export default store
