import { createStore } from 'framework7/lite'
import api from '@/js/api'

const store = createStore({
  state: {
    userInfo: {},
    tasks: [],
    rawTasks: [],
    taskFolders: []
  },
  getters: {
    userInfo ({ state }) {
      return state.userInfo
    },
    tasks ({ state }) {
      return state.tasks
    },
    taskFolders ({ state }) {
      return state.taskFolders
    }
  },
  actions: {
    getTasks ({ state }, {
      type,
      folderId,
      okCallback,
      errorCallback
    }) {
      state.tasks = []
      api.task.getTasks(type, folderId).then(resp => {
        const data = resp.data
        state.tasks = JSON.parse(data).data
        state.rawTasks = JSON.parse(data).data
        okCallback && okCallback(resp)
      }).catch(err => {
        errorCallback && errorCallback(err)
      })
    },
    filterTasks ({ state }, {
      condition,
      callback
    }) {
      (async function () {
        state.tasks = state.rawTasks.filter(condition)
        callback && callback()
      })()
    },
    getTaskFolders ({ state }, {
      type,
      okCallback,
      errorCallback
    }) {
      api.folder.getTaskFolders(type).then(resp => {
        const newTaskFolders = state.taskFolders
        newTaskFolders[type] = JSON.parse(resp.data).data
        state.taskFolders = newTaskFolders
        okCallback && okCallback(resp)
      }).catch(err => {
        errorCallback && errorCallback(err)
      })
    },
    filterTaskFolders ({ state }, {
      type,
      condition,
      okCallback,
      errorCallback
    }) {
      api.folder.getTaskFolders(type).then(resp => {
        state.taskFolders = JSON.parse(resp.data).data.filter(condition)
        okCallback && okCallback(resp)
      }).catch(err => {
        errorCallback && errorCallback(err)
      })
    },
    getUserInfo ({ state }, {
      okCallback,
      errorCallback
    }) {
      api.user.getUserInfo().then(resp => {
        state.userInfo = JSON.parse(resp.data).data
        okCallback && okCallback(resp)
      }).catch(err => {
        errorCallback && errorCallback(err)
      })
    }
  }
})
export default store
