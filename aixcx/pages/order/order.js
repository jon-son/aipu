// pages/order/order.js
import {
  StoreModel
} from '../../models/store.js';
const storeModel = new StoreModel;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOder()
  },
  getOder() {
    storeModel.getOrder(1).then(res => {
      console.log(res)
      if (res.code == 1017) {
        this.setData({
          order_list: res.order_list
        })
      }
    })
  },
  pay(e) {
    let id = e.currentTarget.dataset.id
    storeModel.payOrder(id).then(res => {
      console.log(res)
      if (res.code == 1019) {
        this.getOder()
        wx.showToast({
          title: '结算成功',
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: '结算失败',
          icon: 'none'
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