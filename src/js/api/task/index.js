import Framework7 from 'framework7'
import api from '@/js/api'

export default {
  getTasks (folderId) {
    return Framework7.request.get(api.baseUrl + '/api/v1/task/folder/' + folderId)
  },
  getTask2s (folderId) {
    return Framework7.request.get(api.baseUrl + '/api/v1/task2/folder/' + folderId)
  }
}
