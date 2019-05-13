// pages/myhealth/myhealth.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNames: ['1'],
    health:[
      {
        name:"2019-04-19",
        list:[
          "鸡肉",
          "排骨"
        ],
        pu_list: [
          {
            id: 1003,
            img: 'https://i8.meishichina.com/attachment/recipe/2015/03/25/20150325e555097c6f6c4842.jpg?x-oss-process=style/p800',
            name: "粗粮蒸包",
            wacth: 27
          },
          {
            id: 1013,
            img: 'https://i8.meishichina.com/attachment/recipe/2014/12/10/20141210871fabe943153971.jpg?x-oss-process=style/p800',
            name: "排骨焖饭",
            wacth: 215
          },
          {
            id: 1000,
            img: 'https://i8.meishichina.com/attachment/recipe/2015/02/10/201502105fa352fe9a4f79a3.jpg?x-oss-process=style/p800',
            name: "香菇炖鸡",
            wacth: 18
          }
        ],
        
      }
    ]
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },
  jump_to(e) {

    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/pu/pu?id=' + id
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