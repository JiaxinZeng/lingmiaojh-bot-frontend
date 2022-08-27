import Store from './store'
import Api from '@/js/api'

export default {
  store: {
    getTasks (type, folderId) {
      return new Promise((resolve, reject) => {
        Store.dispatch('getTasks', {
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
        Store.dispatch('getTaskFolders', {
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
    filterTasks (type, folderId, titleName) {
      console.log(titleName)
      return new Promise((resolve, reject) => {
        Store.dispatch('filterTasks', {
          type,
          folderId,
          titleName,
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
        Store.dispatch('filterTaskFolders', {
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
    }
  },
  alert: {
    refresh (reqFunc, autoClose) {
      return Api.req(reqFunc,
        autoClose ? null : '刷新成功',
        autoClose ? null : '刷新失败',
        '正在刷新')
    }
  }
}
