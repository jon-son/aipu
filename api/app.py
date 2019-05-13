# -*- coding: utf-8 -*-
# by jonson 2018/10/27

from flask import Flask,send_file
from flask_restful import Api
from jox_restful import Upload,User,Log,Menu,Product,Order

app = Flask(__name__)
api = Api(app)


# 设置路由
api.add_resource(Upload.UploadRoute, '/api/upload')
api.add_resource(Upload.AIImgRoute, '/api/ai_img')
api.add_resource(User.UserRoute, '/api/regiter_user')
api.add_resource(User.GetUserRoute, '/api/get_user')

api.add_resource(Log.GetAiLogRoute, '/api/get_ai_log')
api.add_resource(Menu.GetMenuRoute, '/api/get_menu')
api.add_resource(Menu.AddMenuRoute, '/api/add_menu')
api.add_resource(Menu.GetMenuInfoRoute, '/api/get_menu_info')


api.add_resource(Product.GetProductRoute, '/api/get_product')
api.add_resource(Product.GetProductInfoRoute, '/api/get_product_info')
api.add_resource(Product.GetProductCarRoute, '/api/get_product_car')
api.add_resource(Product.AddProductCarRoute, '/api/add_product_car')
api.add_resource(Product.PayProductRoute, '/api/pay_product')
api.add_resource(Product.PayProductCarRoute, '/api/pay_product_car')

api.add_resource(Order.GetOrderRoute, '/api/get_order')
api.add_resource(Order.PayOrderRoute, '/api/pay_order')

if __name__ == '__main__':
    app.run(host='127.0.0.1',port=8081)
