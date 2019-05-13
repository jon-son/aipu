// pages/car/car.js
import {
  StoreModel
} from '../../models/store.js';
const storeModel = new StoreModel;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product_car_list: [],
    num: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.get_car()
  },
  get_car(){
    storeModel.getProductCar().then(res => {
      console.log(res)
      if (res.code == 1014) {
        this.setData({
          product_car_list: res.product_car.product_car_list,
          num: res.product_car.num,
        })
      }
    })
  },
  onSubmit() {
    let that= this
    wx.showModal({
      title: '提示',
      content: '是否直接购买？',
      success(res) {
        wx.showLoading({
          title: '购买中',
        })
        if (res.confirm) {
          storeModel.payProductCar(1).then(res => {
            console.log(res)
            if (res.code == 1016) {
              that.get_car()
              wx.showToast({
                title: '提交订单成功',
                icon: "none"
              })
            } else {
              wx.showToast({
                title: '提交订单失败',
                icon: "none"
              })
            }
          })
        }else{
          storeModel.payProductCar(0).then(res => {
            console.log(res)
            if (res.code == 1016) {
              that.get_car()
              wx.showToast({
                title: '未结算订单',
                icon: "none"
              })
            } else {
              wx.showToast({
                title: '提交订单失败',
                icon: "none"
              })
            }
          })
        }
      }


    })

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})