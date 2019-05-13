// pages/myai/myai.js
import { LogModel } from '../../models/log.js';
const logModel = new LogModel;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNames: ['1'],
    ai_log: []
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },
  jump_to(e){

    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/pu/pu?id=' + id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    logModel.getAILog().then(res=>{
      console.log(res)
      if(res.code == 1006){
        this.setData({
          ai_log: res.ai_log
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