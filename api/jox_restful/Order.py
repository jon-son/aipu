from flask_restful import reqparse, Resource,request
from jox_api import Order
import hashlib
import os
import json

class GetOrderRoute(Resource):
    def post(self):
        try:
            self.parser = reqparse.RequestParser()
            self.orderClass = Order.Order()
            self.openid = request.headers['Openid']
            self.parser.add_argument('type', type=int, help='type: type is str')
            self.args = self.parser.parse_args()
            self.type = self.args['type']
            self.restatus = self.orderClass.get_order(self.openid,self.type)

            return self.restatus, 200

        except Exception as e:
            print(e)
            return {"code":-1,"data":{"msg":str(e)}},500


class PayOrderRoute(Resource):
    def post(self):
        try:
            self.parser = reqparse.RequestParser()
            self.orderClass = Order.Order()
            self.openid = request.headers['Openid']
            self.parser.add_argument('order_id', type=str, help='order_id: type is str')
            self.args = self.parser.parse_args()
            self.order_id = self.args['order_id']
            self.restatus = self.orderClass.pay_order(self.openid,self.order_id)

            return self.restatus, 200

        except Exception as e:
            print(e)
            return {"code":-1,"data":{"msg":str(e)}},500

