// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    list: [{
      nav_off: 'jox-icon-home',
      nav_on: 'jox-icon-homefill',
      text: '首页',
    },
    {
      nav_off: 'jox-icon-we',
      nav_on: 'jox-icon-wefill',
      text: '健康',
    },
    {
      nav_off: '/img/nav-center.png',
      nav_on: '',
      text: 'AI-PU'
    },
    {
      nav_off: 'jox-icon-goodsnew',
      nav_on: 'jox-icon-goodsnewfill',
      text: '商城',
    },
    {
      nav_off: 'jox-icon-my',
      nav_on: 'jox-icon-myfill',
      text: '我的',
    },
    ],
    show_btn: false,
    nav:0
  },
  navRouter(e) {
    let id = e.currentTarget.dataset.id
    if (id == 2) {
      this.setData({
        show_btn: !this.data.show_btn
      })
    } else {
      this.setData({
        nav:id,
        show_btn:false
      })
    }
  },
  uploadPic: function () {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: [ 'compressed'],
      sourceType: ['album'],
      success(res) {
        console.log(1)
        // tempFilePath可以作为img标签的src属性显示图片
        wx.navigateTo({
          url: '/pages/show/show?photo=' + res.tempFilePaths[0]
        })

      }
    })
  },
  uploadPic2: function () {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['camera'],
      success(res) {
        console.log(1)
        // tempFilePath可以作为img标签的src属性显示图片
        wx.navigateTo({
          url: '/pages/show/show?photo=' + res.tempFilePaths[0]
        })

      },fail(e){
        console.log(e)
      }
    })
  },
  uppu: function () {
    wx.navigateTo({
      url: '/pages/uppu/uppu'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    this.setData({
      show_btn:false
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.setData({
      show_btn: false
    })
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