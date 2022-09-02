import { createStore } from 'framework7/lite'
import api from '@/js/api'

const store = createStore({
  state: {
    tasks: [],
    taskFolders: [],
    task2s: [],
    task2Folders: [],
    task3s: [],
    task3Folders: [],
    task4s: [],
    task4Folders: [],
    task5s: [],
    task5Folders: [],
    task6s: [],
    task6Folders: []
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
    task3s ({ state }) {
      return state.task3s
    },
    task3Folders ({ state }) {
      return state.task3Folders
    },
    task4s ({ state }) {
      return state.task4s
    },
    task4Folders ({ state }) {
      return state.task4Folders
    },
    task5s ({ state }) {
      return state.task5s
    },
    task5Folders ({ state }) {
      return state.task5Folders
    },
    task6s ({ state }) {
      return state.task6s
    },
    task6Folders ({ state }) {
      return state.task6Folders
    }
  },
  actions: {
    getTasks ({ state }, {
      type,
      folderId,
      okCallback,
      errorCallback
    }) {
      api.task.getTasks(type, folderId).then(resp => {
        state[`task${type}s`] = JSON.parse(resp.data).data
        okCallback && okCallback(resp)
      }).catch(err => {
        errorCallback && errorCallback(err)
      })
    },
    filterTasks ({ state }, {
      type,
      folderId,
      condition,
      okCallback,
      errorCallback
    }) {
      api.task.getTasks(type, folderId).then(resp => {
        state[`task${type}s`] = JSON.parse(resp.data).data.filter(condition)
        okCallback && okCallback(resp)
      }).catch(err => {
        errorCallback && errorCallback(err)
      })
    },
    getTaskFolders ({ state }, {
      type,
      okCallback,
      errorCallback
    }) {
      api.folder.getTaskFolders(type).then(resp => {
        state[`task${type}Folders`] = JSON.parse(resp.data).data
        okCallback && okCallback(resp)
      }).catch(err => {
        errorCallback && errorCallback(err)
      })
    },
    filterTaskFolders ({ state }, {
      type,
      folderName,
      okCallback,
      errorCallback
    }) {
      api.folder.getTaskFolders(type).then(resp => {
        state[`task${type}Folders`] = JSON.parse(resp.data)
          .data
          .filter(folder => {
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
