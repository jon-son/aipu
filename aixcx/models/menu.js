import {
  HTTP
} from '../utils/http-p.js'
class MenuModel extends HTTP {
  // 用户登录
  getMenu(type) {
    return this.request({
      url: '/get_menu',
      data: {
        type
      },
      method: "POST"
    })
  }
  getMenuInfo(menu_id) {
    return this.request({
      url: '/get_menu_info',
      data: {
        menu_id
      },
      method: "POST"
    })
  }
  addMenu(title, photo, steps,material,accessories,ingredient) {
    return this.request({
      url: '/add_menu',
      data: {
        title,
        photo,
        steps,
        material,
        accessories,
        ingredient
      },
      method: "POST"
    })
  }
}
export {
  MenuModel
}