// components/pages/home/index.js
import { MenuModel } from '../../../models/menu.js';
const menuModel = new MenuModel;

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的初始数据
   */
  data: {
    pu_top:[],
    pu_list:[],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },
  created() {
    menuModel.getMenu('main').then(res => {
      console.log(res)
      if (res.code == 1007) {
        console.log(res)
        this.setData({
          pu_top: res.top_list,
          pu_list: res.menu_list
        })
      }
    })
    wx.setNavigationBarTitle({
      title: '首页',
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    jump_to(e) {

      let id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/pu/pu?id='+id
      })
    }
  }
})