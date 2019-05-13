// components/pages/mine/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  options: {
    addGlobalClass: true,
  },
  created() {
    wx.setNavigationBarTitle({
      title: '我的',
    })
  },
  /**
   * 组件的初始数据
   */
  data: {
    nav: [{
        name: "购物车",
      icon: "jox-icon-cart"
      },
      {
        name: "全部订单",
        icon: "jox-icon-calendar"
      },
      {
        name: "未结算",
        icon: "jox-icon-evaluate"
      }
    ],
    list: [
    // {
    //     name: "收货地址",
    //   icon: "jox-icon-location"
    //   },
      {
        name: "我的菜谱",
        icon: "jox-icon-send"
      },

      {
        name: "饮食推荐记录",
        icon: "jox-icon-discover"
      },
      {
        name: "智能识别记录",
        icon: "jox-icon-scan"
      },

      {
        name: "帮助",
        icon: "jox-icon-question"
      },
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    jump_to(e) {
      console.log(e)
      let id = e.currentTarget.dataset.id;
      if (id == "0") {
        wx.navigateTo({
          url: '/pages/mypu/mypu'
        })
      } else if (id == "1") {
        wx.navigateTo({
          url: '/pages/myhealth/myhealth'
        })
      } else if (id == "2") {
        wx.navigateTo({
          url: '/pages/myai/myai'
        })
      } else if (id == "3") {
        wx.navigateTo({
          url: '/pages/help/help'
        })
      } else if (id == "4") {
        wx.navigateTo({
          url: '/pages/car/car'
        })
      } else if (id == "5") {
        wx.navigateTo({
          url: '/pages/order/order'
        })
      } else if (id == "6") {
        wx.navigateTo({
          url: '/pages/assess/assess'
        })
      }


    }
  }
})