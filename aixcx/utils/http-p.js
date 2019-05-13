import {
  config
} from '../config.js'

const tips = {
  1: '抱歉,出现了一个错误',
  1006: '服务器出现错误'
}
class HTTP {
  request({
    url,
    data = {},
    method = 'GET'
  }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  }
  _request(url, resolve, reject, data = {}, method = 'GET') {
    // url,data,method,
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',
        'openid':wx.getStorageSync('openid')
      },
      success: (res) => {
        const code = res.statusCode.toString();
        if (code.startsWith('2')) {
          resolve(res.data)
        } else {
          
          const error_code = res.data.error_code
          this._show_error(error_code);
          reject(res)
        }
      },
      fail: (err) => {
        reject(err)
        this._show_error(1);
      }
    })
  }




  _show_error(error_code) {
    if (!error_code) {
      error_code = 1;
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none',
      duration: 2000
    })
  }
}

export {
  HTTP
}