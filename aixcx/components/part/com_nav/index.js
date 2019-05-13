// components/wx_nav/index.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    navKey: Number
  },
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  lifetimes: {
    attached() {
      this.setData({
        myUrl: this.getCurrentPageUrl()
      })
    }
  },
  
  /**
   * 组件的初始数据
   */
  data: {
    list: [{
        nav_off: './images/nav-index.png',
        nav_on: './images/nav-index-activity.png',
        url: 'pages/home/home',
      text: '首页',
      },
      {
        nav_off: './images/nav-index.png',
        nav_on: './images/nav-index-activity.png',
        url: 'pages/health/health',
        text: '健康',
      },
      {
        nav_off: './images/nav-center.png',
        nav_on: '',
        noSwitch: true,
        text: 'AI-PU'
      },
      {
        nav_off: './images/nav-index.png',
        nav_on: './images/nav-index-activity.png',
        url: 'pages/store/store',
        text: '商城',
      },
      {
        nav_off: './images/nav-us.png',
        nav_on: './images/nav-us-activity.png',
        url: 'pages/us/us',
        text: '我的',
      },
    ],
    myUrl: '',
    show_btn:false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getCurrentPageUrl(){
      var pages = getCurrentPages() //获取加载的页面 
      var currentPage = pages[pages.length - 1] //获取当前页面的对象 
      var url = currentPage.route //当前页面url 
      return url
    },
    navRouter(e) {
      let item = e.currentTarget.dataset.item
      if (item.noSwitch) {
        this.setData({
          show_btn: !this.data.show_btn
        })
        console.log(this.data.show_btn)
      } else {
        wx.switchTab({
          url: `/${item.url}`,
        })
      }
    },
    uploadPic: function () {
      let that = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          console.log(1)
          // tempFilePath可以作为img标签的src属性显示图片
          wx.navigateTo({
            url: '/pages/show/show?photo=' + res.tempFilePaths[0]
          })

        }
      })
    },

  }
})