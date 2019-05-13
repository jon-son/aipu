// pages/get_user/get_user.js
import { UserModel} from '../../models/user.js';
const app = getApp()
const userModel = new UserModel;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageUrl:""
  },
  bindGetUserInfo: function(res) {
    let that = this
    wx.getUserInfo({
      success(res3) {
        console.log(res3)
        userModel.regiterUser(res3.userInfo.nickName, res3.userInfo.avatarUrl, wx.getStorageSync('openid')).then((res4)=>{
          if (res4.code == 1003){
            wx.reLaunch({
              url: "/"+app.globalData.pageUrl
            })
          }else{
            wx.showToast({
              title: '请重试',
              icon:"none"
            })
          }
          
        })
      }
    })

  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  }
})