//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    VerticalNavTop: 0,
    show_btn:false,
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
  showBtn(){
    this.setData({
      show_btn:!this.data.show_btn
    })
    console.log(this.data.show_btn)
  },
  uploadPic: function () {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        wx.navigateTo({
          url: '/pages/show/show?photo=' + res.tempFilePaths[0],
        })

      }
    })
  },

})
