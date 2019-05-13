// pages/uppu/uppu.js
import {
  config
} from '../../config.js'
import { MenuModel } from '../../models/menu.js';
const menuModel = new MenuModel;
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info_list1: [],
    info_list2: [],
    info_list3: [],
    step:[
      {
        content: "",
        img: ''
      }
    ],
    img1: "",
    img2: [],
    value1: '',
    value2: '',
    value3: '',
    value0: '',
  },
  onChange(event) {
    // event.detail 为当前输入的值
    let type = event.currentTarget.dataset.type
    if(parseInt(type)<4){
      this.setData({
        ['value' + type]: event.detail
      })
    }else{
      let id = event.currentTarget.dataset.id
      this.setData({
        ['step[' + id +'].content']: event.detail
      })
    }

  },
  closeInfo(e) {
    let id = e.currentTarget.dataset.id;
    let type = e.currentTarget.dataset.type;
    let info_list = []
    if (type == "1") {
      info_list = this.data.info_list1
    } else if (type == "2") {
      info_list = this.data.info_list2
    } else if (type == "3") {
      info_list = this.data.info_list3
    }
    info_list.splice(id, 1)
    this.setData({
      ['info_list' + type]: info_list
    })
  },
  addInfo(e) {
    let info_list = []
    let value = ''
    let type = e.currentTarget.dataset.type;
    if (type == "1") {
      info_list = this.data.info_list1
      value = this.data.value1
    } else if (type == "2") {
      info_list = this.data.info_list2
      value = this.data.value2
    } else if (type == "3") {
      info_list = this.data.info_list3
      value = this.data.value3
    }
    if (value != '' && value != undefined) {
      info_list.push(value)
      this.setData({
        ['info_list' + type]: info_list,
        ['value' + type]: ''
      })
    } else {
      wx.showToast({
        title: '请输入数据',
        icon: "none"
      })
    }

  },
  addStep(){
    let step = this.data.step
    step.push({ content:'',img:""})
    this.setData({
      step:step
    })
  },
  choosePic(e) {
    let type = e.currentTarget.dataset.type;
    let id = e.currentTarget.dataset.id;
    let that = this
    wx.chooseImage({
      success: function(res) {
        if (type == '1') {
          that.setData({
            img1: res.tempFilePaths[0]
          })
        }else{
          that.setData({
            ['step['+id+'].img']: res.tempFilePaths[0]
          })
        }
        console.log(res)
      },
    })
  },
  // 上传图片
  upImage(filePath) {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: config.api_base_url + '/upload',
        filePath,
        name: 'file',
        formData: {},
        header: {
          'openid': wx.getStorageSync('openid')
        },
        success(res) {
          resolve(res)
        },
        fail(e) {
          console.log(e)
        }
      })
    })
  },
  addMenu() {
    wx.showLoading({
      title: '上传中',
      mask: "true"
    })

    let title = this.data.value0

    let material = ''
    let accessories = ''
    let ingredient = ''
    for (let i = 0; i < this.data.info_list1.length; i++) {
      material += this.data.info_list1[i]
      if (i != this.data.info_list1.length - 1) {
        material += " "
      }
    }
    for (let i = 0; i < this.data.info_list2.length; i++) {
      accessories += this.data.info_list2[i]
      if (i != this.data.info_list2.length - 1) {
        accessories += " "
      }
    }
    for (let i = 0; i < this.data.info_list3.length; i++) {
      ingredient += this.data.info_list3[i]
      if (i != this.data.info_list3.length - 1) {
        ingredient += " "
      }
    }
    let promisList = []
    promisList.push(this.upImage(this.data.img1))
    for (let i = 0; i < this.data.step.length; i++) {
      promisList.push(this.upImage(this.data.step[i].img))
    }
    Promise.all(promisList).then(res => {
      let data = res.data
      console.log(data)
      let step = []
      for(let i=0;i<this.data.step.length ;i++){
        step.push({
          content: this.data.step[i].content,
          num:i,
          image: JSON.parse(res[i+1].data).path
        })
      }
      return menuModel.addMenu(title, JSON.parse(res[0].data).path, JSON.stringify(step), material, accessories, ingredient)
    }).then(res=>{
      console.log(res)
      if(res.code==1010){
        wx.showToast({
          title: '上传成功',
          icon:"none"
        })
      }else{
        wx.showToast({
          title: '上传失败',
          icon: "none"
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})