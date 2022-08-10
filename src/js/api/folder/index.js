import Framework7 from 'framework7'
import api from '@/js/api'

export default {
  getTaskFolders () {
    return Framework7.request.get(api.baseUrl + '/api/v1/task/folder')
  },
  getTask2Folders () {
    return Framework7.request.get(api.baseUrl + '/api/v1/task2/folder')
  }
}
