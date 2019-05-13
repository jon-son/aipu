from flask_restful import reqparse, Resource,request
from jox_api import Menu
import hashlib
import os
import json

class GetMenuRoute(Resource):
    def post(self):
        try:
            self.parser = reqparse.RequestParser()
            self.menuClass = Menu.Menu()
            self.openid = request.headers['Openid']
            self.parser.add_argument('type', type=str, help='type: type is str')
            self.args = self.parser.parse_args()
            self.type = self.args['type']
            self.restatus = self.menuClass.get_menu(self.type,self.openid)

            return self.restatus, 200

        except Exception as e:
            print(e)
            return {"code":-1,"data":{"msg":str(e)}},500

class GetMenuInfoRoute(Resource):
    def post(self):
        try:
            self.menuClass = Menu.Menu()
            self.parser = reqparse.RequestParser()
            self.parser.add_argument('menu_id', type=str, help='menu_id: type is str')
            self.args = self.parser.parse_args()
            self.menu_id = self.args['menu_id']
            self.restatus = self.menuClass.get_menu_info(self.menu_id)
            return self.restatus, 200

        except Exception as e:
            print(e)
            return {"code":-1,"data":{"msg":str(e)}},500

class AddMenuRoute(Resource):
    def post(self):
        try:
            self.menuClass = Menu.Menu()
            self.parser = reqparse.RequestParser()
            self.parser.add_argument('title', type=str, help='menu_id: type is str')
            self.parser.add_argument('photo', type=str, help='menu_id: type is str')
            self.parser.add_argument('steps', type=str, help='menu_id: type is str')
            self.parser.add_argument('material', type=str, help='menu_id: type is str')
            self.parser.add_argument('accessories', type=str, help='menu_id: type is str')
            self.parser.add_argument('ingredient', type=str, help='menu_id: type is str')
            self.args = self.parser.parse_args()
            self.openid = request.headers['Openid']
            self.restatus = self.menuClass.add_menu(self.args,self.openid)
            return self.restatus, 200

        except Exception as e:
            print(e)
            return {"code":-1,"data":{"msg":str(e)}},500