// components/part/jox-footer/index.js
Component({
  /**
   * 组件的属性列表
   */
  externalClasses: ['jox-class'],
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    uploadPic:function(){
      let that =this
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

  }
})
