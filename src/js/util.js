import Store from './store'

export default {
  store: {
    getTasks (type, folderId) {
      return Store.dispatch(`getTask${type}s`, folderId)
    },
    getTaskFolders (type) {
      return Store.dispatch(`getTask${type}Folders`, null)
    },
    filterTasks (type, folderId, folderName) {
      return Store.dispatch(`filterTask${type}s`, {
        folderId,
        folderName
      })
    },
    filterTaskFolders (type, folderName) {
      return Store.dispatch(`filterTask${type}Folders`, folderName)
    }
  }
}
