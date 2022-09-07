import Framework7 from 'framework7'
import config from '@/js/api/config'

export default {
  getServerLogs () {
    return Framework7.request.get(`${config.baseUrl}/api/v1/log`)
  }
}
