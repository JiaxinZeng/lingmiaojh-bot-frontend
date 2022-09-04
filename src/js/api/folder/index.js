import Framework7 from 'framework7'
import config from '@/js/api/config'

export default {
  getTaskFolders (type) {
    return Framework7.request.get(`${config.baseUrl}/api/v1/task${type}/folder`)
  },
  changeTaskFolderName (type, folderId, folderName) {
    return Framework7.request({
      url: `${config.baseUrl}/api/v1/task${type}/folder/${folderId}`,
      method: 'PUT',
      data: {
        name: folderName
      },
      contentType: 'application/json'
    })
  },
  deleteTaskFolder (type, folderId) {
    return Framework7.request({
      url: `${config.baseUrl}/api/v1/task${type}/folder/${folderId}`,
      method: 'DELETE'
    })
  },
  createTaskFolder (type, folderName) {
    return Framework7.request({
      url: `${config.baseUrl}/api/v1/task${type}/folder`,
      method: 'POST',
      data: {
        name: folderName
      },
      contentType: 'application/json'
    })
  }
}
