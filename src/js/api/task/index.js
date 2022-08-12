import Framework7 from 'framework7'
import Config from '@/js/api/config'

export default {
  getTasks (type, folderId) {
    return Framework7.request.get(
      `${Config.baseUrl}/api/v1/task${type}/folder/${folderId}`
    )
  },
  sendVerifyCode (type, mobile) {
    return Framework7.request.get(
      `${Config.baseUrl}/api/v1/task${type}/send_verify_code/${mobile}`
    )
  },
  deleteTaskByMobile (type, mobile) {
    return Framework7.request({
      url: `${Config.baseUrl}/api/v1/task${type}/mobile/${mobile}`,
      method: 'DELETE'
    })
  },
  deleteTaskByUsername (type, username) {
    return Framework7.request({
      url: `${Config.baseUrl}/api/v1/task${type}/username/${username}`,
      method: 'DELETE'
    })
  },
  createTaskByMobile (type, mobile, folderId) {
    return Framework7.request({
      url: `${Config.baseUrl}/api/v1/task${type}`,
      method: 'POST',
      data: {
        mobile,
        folder: folderId
      },
      contentType: 'application/json'
    })
  },
  createTaskByUsername (type, username, password, folderId) {
    return Framework7.request({
      url: `${Config.baseUrl}/api/v1/task${type}`,
      method: 'POST',
      data: {
        username,
        password,
        folder: folderId
      },
      contentType: 'application/json'
    })
  }
}
