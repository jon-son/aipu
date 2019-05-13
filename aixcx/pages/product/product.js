// pages/product/product.js
import { StoreModel } from '../../models/store.js';
const storeModel = new StoreModel;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product_info:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    storeModel.getProductInfo(id).then(res=>{
      console.log(res)
      if(res.code == 1012){
        this.setData({
          product_info: res.product_info
        })
      }
    })
  },
  toCar(){
    wx.navigateTo({
      url: '/pages/car/car',
    })
  },
  addCar() {
    wx.showLoading({
      title: '等待中',
    })
    storeModel.addProductCar(this.data.product_info.id).then(res=>{
      console.log(res)
      if(res.code == 1013){
        this.setData({
          ['product_info.car_num']: this.data.product_info.car_num +1
        })
        wx.showToast({
          title: '添加购物车成功',
          icon:"none"
        })
      }else{
        wx.showToast({
          title: '添加购物车失败',
          icon: "none"
        })
      }
    })
  },

  pay(){
    let that = this
    wx.showModal({
      title: '提示',
      content: '是否直接购买？',
      success(res){
        wx.showLoading({
          title: '购买中',
        })
        if(res.confirm){

          storeModel.payProduct(that.data.product_info.id,1).then(res => {
            console.log(res)
            if (res.code == 1015) {
              that.setData({
                ['product_info.stock']: that.data.product_info.stock - 1,
                ['product_info.sales']: that.data.product_info.sales + 1
              })
              wx.showToast({
                title: '购买成功',
                icon: "none"
              })
            } else {
              wx.showToast({
                title: '购买失败',
                icon: "none"
              })
            }
          })
        }else{
          storeModel.payProduct(that.data.product_info.id,0).then(res => {
            console.log(res)
            if (res.code == 1015) {
              that.setData({
                ['product_info.stock']: that.data.product_info.stock - 1,
                ['product_info.sales']: that.data.product_info.sales + 1
              })
              wx.showToast({
                title: '未结算订单',
                icon: "none"
              })
            } else {
              wx.showToast({
                title: '购买失败',
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