// pages/show/show.js
import {
  config
} from '../../config.js'
const app =getApp()
Page({

  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    VerticalNavTop: 0,
    list:[]
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    // console.log(e.detail);
  },
  // 上传图片
  upImage(filePath) {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: config.api_base_url +'/ai_img',
        filePath,
        name: 'file',
        formData: {
        },
        header:{
          'openid': wx.getStorageSync('openid')
        },
        success(res) {
          console.log(res)
          resolve(res)
        },fail(e){
          console.log(e)
        }
      })
    })
  },
  jump_to(e){
    console.log(e)
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/pu/pu?id='+id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: 'AI识别中',
    })
    let that = this
    that.setData({
      photo: options.photo
    })
    that.upImage(options.photo).then(res => {
      let data =   JSON.parse(res.data)
      if (data.code == 1005){
        that.setData({
          list:data.list.map(item=>{
            return {
              name: item.name,
              id: item.id,
              results: (parseFloat(item.results) * 100).toFixed(2)
            }
          })
        })
        wx.hideLoading()
      }else{
        wx.showToast({
          title: '识别失败',
          icon:"none"
        })
      }

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})