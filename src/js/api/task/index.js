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
  createTaskByMobile (type, mobile, folderId, paymentPassword) {
    return Framework7.request({
      url: `${Config.baseUrl}/api/v1/task${type}`,
      method: 'POST',
      data: function () {
        const data = {
          mobile,
          folder: folderId
        }
        if (paymentPassword) {
          data.payment_password = paymentPassword
        }

        return data
      },
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
  signInByMobile (type, mobile, verifyCode) {
    return Framework7.request({
      url: `${Config.baseUrl}/api/v1/task${type}/sign_in`,
      method: 'POST',
      data: {
        code: verifyCode,
        mobile
      },
      contentType: 'application/json'
    })
  },
  signInByUsername (type, username, password) {
    return Framework7.request({
      url: `${Config.baseUrl}/api/v1/task${type}/sign_in`,
      method: 'POST',
      data: {
        username,
        password
      },
      contentType: 'application/json'
    })
  },
  resetPaymentPasswordByMobile (type, mobile, paymentPassword) {
    return Framework7.request({
      url: `${Config.baseUrl}/api/v1/task${type}/reset_payment_password`,
      method: 'POST',
      data: {
        payment_password: paymentPassword,
        mobile
      },
      contentType: 'application/json'
    })
  },
  resetPaymentPasswordByUsername (type, username, paymentPassword) {
    return Framework7.request({
      url: `${Config.baseUrl}/api/v1/task${type}/reset_payment_password`,
      method: 'POST',
      data: {
        payment_password: paymentPassword,
        username
      },
      contentType: 'application/json'
    })
  }
}
