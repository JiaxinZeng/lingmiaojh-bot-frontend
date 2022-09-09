import framework7 from 'framework7'
import config from '@/js/api/config'

export default {
  getUserInfo () {
    return framework7.request.get(`${config.baseUrl}/api/v1/user/info`)
  }
}
