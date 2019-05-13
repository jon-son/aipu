import {
  HTTP
} from '../utils/http-p.js'
class StoreModel extends HTTP {

  getProduct() {
    return this.request({
      url: '/get_product'
    })
  }
  getProductInfo(product_id) {
    return this.request({
      url: '/get_product_info',
      data:{
        product_id
      },
      method: "POST"
    })
  }
  addProductCar(product_id){
    return this.request({
      url: '/add_product_car',
      data: {
        product_id
      },
      method: "POST"
    })
  }
  getProductCar() {
    return this.request({
      url: '/get_product_car'
    })
  }
  payProduct(product_id,type) {
    return this.request({
      url: '/pay_product',
      data: {
        product_id,
        type
      },
      method: "POST"
    })
  }
  payProductCar(type) {
    return this.request({
      url: '/pay_product_car',
      data: {
        type
      },
      method: "POST"
    })
  }

  getOrder(type) {
    return this.request({
      url: '/get_order',
      data: {
        type
      },
      method: "POST"
    })
  }
  payOrder(order_id){
    return this.request({
      url: '/pay_order',
      data: {
        order_id
      },
      method: "POST"
    })
  }

}
export {
  StoreModel
}