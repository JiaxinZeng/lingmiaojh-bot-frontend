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
        }).then(() => {})
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
        }).then(() => {})
      })
    },
    filterTasks (type, folderId, condition) {
      return new Promise((resolve, reject) => {
        store.dispatch('filterTasks', {
          type,
          folderId,
          condition,
          okCallback (resp) {
            resolve(resp)
          },
          errorCallback (err) {
            reject(err)
          }
        }).then(() => {})
      })
    },
    filterTaskFolders (type, folderName) {
      return new Promise((resolve, reject) => {
        store.dispatch('filterTaskFolders', {
          type,
          folderName,
          okCallback (resp) {
            resolve(resp)
          },
          errorCallback (err) {
            reject(err)
          }
        }).then(() => {})
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
        }).then(() => {})
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
