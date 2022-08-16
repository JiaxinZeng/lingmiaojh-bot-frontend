import Framework7 from 'framework7'
import Config from '@/js/api/config'

export default {
  getServerLogs () {
    return Framework7.request.get(`${Config.baseUrl}/api/v1/log`)
  }
}
