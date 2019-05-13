from flask_restful import reqparse, Resource,request
from jox_api import User,Redis
import requests
import json
from jox_config import opendConf
class UserRoute(Resource):
    def post(self):
        try:
            self.userClass = User.User()
            self.parser = reqparse.RequestParser()
            self.parser.add_argument('nickname', type=str, help='nickname: type is str')
            self.parser.add_argument('avatar', type=str, help='avatar: type is str')
            self.parser.add_argument('openid', type=str, help='openid: type is str')
            self.args = self.parser.parse_args()
            self.restatus = self.userClass.regiter_user(self.args)
            return self.restatus, 200

        except Exception as e:
            print(e)
            return {"code":-1,"data":{"msg":str(e)}},500

class GetUserRoute(Resource):
    def post(self):
        try:
            self.appid = opendConf['appid']
            self.appsecret = opendConf['appsecret']
            self.userClass = User.User()
            self.parser = reqparse.RequestParser()
            self.parser.add_argument('code', type=str, help='code: type is str')
            self.args = self.parser.parse_args()
            self.code = self.args['code']
            self.url="https://api.weixin.qq.com/sns/jscode2session?appid=" + self.appid + "&secret=" + self.appsecret + "&js_code=" + self.code + "&grant_type=authorization_code"
            self.response = requests.get(self.url)
            self.response = json.loads(self.response.text)
            self.openid = self.response['openid']
            self.restatus = self.userClass.get_user(self.openid)
            return self.restatus, 200

        except Exception as e:
            print(e)
            return {"code":-1,"data":{"msg":str(e)}},500