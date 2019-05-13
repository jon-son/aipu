// components/pages/store/index.js
import { StoreModel } from '../../../models/store.js';
const storeModel = new StoreModel;

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
      title: '商城',
    })
  },
  /**
   * 组件的初始数据
   */
  data: {
    nav_id:0,
    nav_list: [{
        name: "主食"
      },
      {
        name: "配料"
      },
      {
        name: "调味品"
      },
      {
        name: "厨具"
      }
    ],
    product_list:[]
  },
  created(){
    storeModel.getProduct().then(res=>{
      console.log(res)
      if(res.code == 1011){
        this.setData({
          product_list: res.product_list
        })
      }
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    change_nav(e){
      let id = e.currentTarget.dataset.id;
      this.setData({
        nav_id:id
      })
    },
    jump_to(e) {

      let id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/product/product?id=' + id
      })
    }
  }
})