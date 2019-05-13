from flask_restful import reqparse, Resource,request
from jox_api import AI,Utils
import hashlib
from jox_config import api_base_url
import os
import json
class AIImgRoute(Resource):
    def post(self):
        try:
            self.timeClass = Utils.Time()
            self.parser = reqparse.RequestParser()
            self.ai = AI.AI()
            self.openid = request.headers['Openid']
            self.file = request.files['file']
            self.file_name = self.file.filename
            self.list = self.file_name.split('.')
            self.m2 = hashlib.md5()
            self.m2.update((str(self.timeClass.get_time()) + self.file_name).encode("utf8"))
            self.file_name = self.m2.hexdigest() + "." + self.list[len(self.list) - 1]
            self.path = "templates\\"
            self.file.save(self.path+self.file_name)
            self.restatus = self.ai.ai_pic(self.path,self.file_name,self.openid)
            # try:
            #     os.remove(self.file_name)
            # except Exception as e:
            #     print(e)
            return self.restatus, 200

        except Exception as e:
            print(e)
            return {"code":-1,"data":{"msg":str(e)}},500

class UploadRoute(Resource):
    def post(self):
        try:
            self.timeClass = Utils.Time()
            self.parser = reqparse.RequestParser()
            self.ai = AI.AI()
            self.openid = request.headers['Openid']
            self.file = request.files['file']
            self.file_name = self.file.filename
            self.list = self.file_name.split('.')
            self.m2 = hashlib.md5()
            self.m2.update((str(self.timeClass.get_time()) + self.file_name).encode("utf8"))
            self.file_name = self.m2.hexdigest() + "." + self.list[len(self.list) - 1]
            self.path = "templates\\"
            self.file.save(self.path+self.file_name)
            # try:
            #     os.remove(self.file_name)
            # except Exception as e:
            #     print(e)
            return {'code':1009,'path':api_base_url+"/"+self.file_name}, 200

        except Exception as e:
            print(e)
            return {"code":-1,"data":{"msg":str(e)}},500