// components/pages/health/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  options: {
    addGlobalClass: true,
  },
  data:{
    info_list:[],
    value: '',
    show_list: [
      {
        id: 1003,
        img: 'https://i8.meishichina.com/attachment/recipe/2015/03/25/20150325e555097c6f6c4842.jpg?x-oss-process=style/p800',
        name: "粗粮蒸包",
        wacth:27
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
    show:false,
  },
  created() {
    wx.setNavigationBarTitle({
      title: '健康',
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      // event.detail 为当前输入的值
      this.setData({
        value: event.detail
      })
    },
    closeInfo(e){
      let id = e.currentTarget.dataset.id;
      let info_list = this.data.info_list
      info_list.splice(id,1)
      this.setData({
        info_list: info_list,
        value: ''
      })
    },
    addInfo(){
      if(this.data.value!=''&&this.data.value!=undefined){
        let info_list = this.data.info_list
        info_list.push(this.data.value)
        this.setData({
          info_list: info_list,
          value: ''
        })
      }else{
        wx.showToast({
          title: '请输入主食',
          icon:"none"
        })
      }
    },
    buildInfo(){
      wx.showLoading({
        title: '生成中',
      })
      setTimeout(res=>{
        wx.hideLoading()
        this.setData({
          show: true
        })
      },1000)
      
    },
    jump_to(e) {

      let id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/pu/pu?id=' + id
      })
    }
  }
})
