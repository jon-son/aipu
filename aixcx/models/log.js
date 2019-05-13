import {
  HTTP
} from '../utils/http-p.js'
class LogModel extends HTTP {
  // 用户登录
  getAILog() {
    return this.request({
      url: '/get_ai_log',
      
    })
  }

}
export {
  LogModel
}