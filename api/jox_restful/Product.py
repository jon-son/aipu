from flask_restful import reqparse, Resource,request
from jox_api import Product
import hashlib
import os
import json

class GetProductRoute(Resource):
    def get(self):
        try:
            self.parser = reqparse.RequestParser()
            self.productClass = Product.Product()
            self.openid = request.headers['Openid']
            self.args = self.parser.parse_args()
            self.restatus = self.productClass.get_product(self.openid)

            return self.restatus, 200

        except Exception as e:
            print(e)
            return {"code":-1,"data":{"msg":str(e)}},500

class GetProductInfoRoute(Resource):
    def post(self):
        try:
            self.productClass = Product.Product()
            self.parser = reqparse.RequestParser()
            self.parser.add_argument('product_id', type=str, help='product_id: type is str')
            self.args = self.parser.parse_args()
            self.product_id = self.args['product_id']
            self.openid = request.headers['Openid']
            self.restatus = self.productClass.get_product_info(self.product_id,self.openid)

            return self.restatus, 200

        except Exception as e:
            print(e)
            return {"code":-1,"data":{"msg":str(e)}},500

class GetProductCarRoute(Resource):
    def get(self):
        try:
            self.parser = reqparse.RequestParser()
            self.productClass = Product.Product()
            self.openid = request.headers['Openid']
            self.args = self.parser.parse_args()
            self.restatus = self.productClass.get_product_car(self.openid)

            return self.restatus, 200

        except Exception as e:
            print(e)
            return {"code":-1,"data":{"msg":str(e)}},500

class AddProductCarRoute(Resource):
    def post(self):
        try:
            self.productClass = Product.Product()
            self.parser = reqparse.RequestParser()
            self.parser.add_argument('product_id', type=str, help='product_id: type is str')
            self.args = self.parser.parse_args()
            self.product_id = self.args['product_id']
            self.openid = request.headers['Openid']
            self.restatus = self.productClass.add_product_car(self.product_id,self.openid)
            return self.restatus, 200

        except Exception as e:
            print(e)
            return {"code":-1,"data":{"msg":str(e)}},500

class PayProductRoute(Resource):
    def post(self):
        try:
            self.productClass = Product.Product()
            self.parser = reqparse.RequestParser()
            self.parser.add_argument('product_id', type=str, help='product_id: type is str')
            self.parser.add_argument('type', type=int, help='type: type is str')
            self.args = self.parser.parse_args()
            self.product_id = self.args['product_id']
            self.type = self.args['type']
            self.openid = request.headers['Openid']
            self.restatus = self.productClass.pay_product(self.product_id,self.openid,self.type)
            return self.restatus, 200

        except Exception as e:
            print(e)
            return {"code":-1,"data":{"msg":str(e)}},500
class PayProductCarRoute(Resource):
    def post(self):
        try:
            self.productClass = Product.Product()
            self.parser = reqparse.RequestParser()
            self.parser.add_argument('type', type=int, help='type: type is str')
            self.args = self.parser.parse_args()
            self.type = self.args['type']
            self.openid = request.headers['Openid']
            self.restatus = self.productClass.pay_product_car(self.openid,self.type)
            return self.restatus, 200

        except Exception as e:
            print(e)
            return {"code":-1,"data":{"msg":str(e)}},500