// pages/pu/pu.js
import { MenuModel } from '../../models/menu.js';
const menuModel = new MenuModel;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_1: true,
    show_2: true,
    menu_info:{},
    particulars:[],
    menu_step:[]
  },
  show(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id;
    let show = (id == '1' ? this.data.show_1 : this.data.show_2)
    this.setData({
      ['show_' + id]: !show
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.id)
    menuModel.getMenuInfo(options.id).then(res=>{
      console.log(res.menu_info)
      wx.setNavigationBarTitle({
        title: res.menu_info.title,
      })
      let list = []
      if (res.menu_info.material !=''){

        list.push({
          name: "主料",
          list: res.menu_info.material.split(' ')
        })
        

      }
      if (res.menu_info.accessories != '') {
        list.push({
          name: "辅料",
          list: res.menu_info.accessories.split(' ')
        })
      }
      if (res.menu_info.ingredient != '') {
        list.push({
          name: "配料",
          list: res.menu_info.ingredient.split(' ')
        })
      }
      console.log(list)
      if(res.code == 1008){
        this.setData({
          menu_info: res.menu_info,
          menu_step: res.menu_info.menu_step,
          particulars:list
        })
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