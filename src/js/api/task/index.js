import Framework7 from 'framework7'
import Config from '@/js/api/config'

export default {
  getTasks (type, folderId) {
    return Framework7.request.get(
      `${Config.baseUrl}/api/v1/task${type}/folder/${folderId}`
    )
  },
  sendLoginVerifyCode (type, mobile) {
    return Framework7.request.get(
      `${Config.baseUrl}/api/v1/task${type}/login/send_verify_code/${mobile}`
    )
  },
  deleteTask (type, name) {
    return Framework7.request({
      url: `${Config.baseUrl}/api/v1/task${type}/${name}`,
      method: 'DELETE'
    })
  },
  createTaskByMobile (type, mobile, folderId, paymentPassword) {
    return Framework7.request({
      url: `${Config.baseUrl}/api/v1/task${type}`,
      method: 'POST',
      data: (function () {
        const data = {
          mobile,
          folder: folderId
        }
        if (paymentPassword) {
          data.payment_password = paymentPassword
        }

        return data
      })(),
      contentType: 'application/json'
    })
  },
  createTaskByUsername (type, username, password, folderId, paymentPassword) {
    return Framework7.request({
      url: `${Config.baseUrl}/api/v1/task${type}`,
      method: 'POST',
      data: (function () {
        const data = {
          username,
          password,
          folder: folderId
        }
        if (paymentPassword) {
          data.payment_password = paymentPassword
        }

        return data
      })(),
      contentType: 'application/json'
    })
  },
  loginByMobile (type, mobile, verifyCode) {
    return Framework7.request({
      url: `${Config.baseUrl}/api/v1/task${type}/login`,
      method: 'POST',
      data: {
        code: verifyCode,
        mobile
      },
      contentType: 'application/json'
    })
  },
  loginByUsername (type, username, password) {
    return Framework7.request({
      url: `${Config.baseUrl}/api/v1/task${type}/login`,
      method: 'POST',
      data: {
        username,
        password
      },
      contentType: 'application/json'
    })
  },
  resetPaymentPassword (type, name, paymentPassword) {
    return Framework7.request({
      url: `${Config.baseUrl}/api/v1/task${type}/reset_payment_password`,
      method: 'POST',
      data: {
        payment_password: paymentPassword,
        name
      },
      contentType: 'application/json'
    })
  }
}
