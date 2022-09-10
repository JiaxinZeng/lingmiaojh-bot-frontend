import Framework7 from 'framework7'
import config from '@/js/api/config'

export default {
  getTasks (type, folderId) {
    return Framework7.request.get(
      `${config.baseUrl}/api/v1/task${type}/folder/${folderId}`
    )
  },
  sendLoginVerifyCode (type, mobile) {
    return Framework7.request.get(
      `${config.baseUrl}/api/v1/task${type}/login/send_verify_code/${mobile}`
    )
  },
  deleteTask (type, name) {
    return Framework7.request({
      url: `${config.baseUrl}/api/v1/task${type}/${name}`,
      method: 'DELETE'
    })
  },
  createTaskByMobile (type, mobile, folderId, paymentPassword) {
    return Framework7.request({
      url: `${config.baseUrl}/api/v1/task${type}`,
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
      url: `${config.baseUrl}/api/v1/task${type}`,
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
  cancelCreate (type, mobile) {
    return Framework7.request({
      url: `${config.baseUrl}/api/v1/task${type}/cancel_create`,
      method: 'POST',
      data: {
        name: mobile
      }
    })
  },
  loginByCode (type, mobile, code) {
    return Framework7.request({
      url: `${config.baseUrl}/api/v1/task${type}/login`,
      method: 'POST',
      data: {
        code,
        mobile
      },
      contentType: 'application/json'
    })
  },
  loginByPassword (type, username, password) {
    return Framework7.request({
      url: `${config.baseUrl}/api/v1/task${type}/login`,
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
      url: `${config.baseUrl}/api/v1/task${type}/reset_payment_password`,
      method: 'POST',
      data: {
        payment_password: paymentPassword,
        name
      },
      contentType: 'application/json'
    })
  }
}
