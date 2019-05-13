//app.js
import { UserModel } from '/models/user.js';
const userModel = new UserModel;

App({
  onLaunch: function() {

    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
    // // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res.code)
        userModel.getUser(res.code).then(res=>{
          console.log(res)
          wx.setStorageSync('openid', res.openid)

          if(res.code == 1002){
            let pages = getCurrentPages()
            let currentPage = pages[pages.length - 1]
            this.globalData.pageUrl = currentPage.route
            wx.reLaunch({
              url: '/pages/get_user/get_user',
            })
          }
        })
      }
    })

  },
  globalData: {
    userInfo: null,
    openid:'',
    pageUrl:""
  }
})