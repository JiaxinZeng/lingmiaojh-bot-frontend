import store from './store'
import api from '@/js/api'

export default {
  store: {
    getTasks (type, folderId) {
      return new Promise((resolve, reject) => {
        store.dispatch('getTasks', {
          type,
          folderId,
          okCallback (resp) {
            resolve(resp)
          },
          errorCallback (err) {
            reject(err)
          }
        })
      })
    },
    getTaskFolders (type) {
      return new Promise((resolve, reject) => {
        store.dispatch('getTaskFolders', {
          type,
          okCallback (resp) {
            resolve(resp)
          },
          errorCallback (err) {
            reject(err)
          }
        })
      })
    },
    filterTasks (condition) {
      return new Promise(resolve => {
        store.dispatch('filterTasks', {
          condition,
          callback () {
            resolve('ignored')
          }
        })
      })
    },
    filterTaskFolders (type, condition) {
      return new Promise((resolve, reject) => {
        store.dispatch('filterTaskFolders', {
          type,
          condition,
          okCallback (resp) {
            resolve(resp)
          },
          errorCallback (err) {
            reject(err)
          }
        })
      })
    },
    getUserInfo () {
      return new Promise((resolve, reject) => {
        store.dispatch('getUserInfo', {
          okCallback (resp) {
            resolve(resp)
          },
          errorCallback (err) {
            reject(err)
          }
        })
      })
    }
  },
  progress: {
    loading (reqFunc, autoClose, progressTitle, okAlert, errAlert) {
      return api.req(reqFunc,
        autoClose ? null : okAlert ?? '刷新成功',
        autoClose ? null : errAlert ?? '刷新失败',
        progressTitle ?? '正在刷新')
    }
  }
}
