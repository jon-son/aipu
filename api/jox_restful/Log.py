from flask_restful import reqparse, Resource,request
from jox_api import AI,Utils
import hashlib
import os
import json

class GetAiLogRoute(Resource):
    def get(self):
        try:
            self.timeClass = Utils.Time()
            self.parser = reqparse.RequestParser()
            self.aiClass = AI.AI()
            self.openid = request.headers['Openid']

            self.restatus = self.aiClass.get_ai_log(self.openid)


            return self.restatus, 200

        except Exception as e:
            print(e)
            return {"code":-1,"data":{"msg":str(e)}},500