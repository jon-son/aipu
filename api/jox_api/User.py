from jox_api import Mysql,Redis,Utils


class User():
    def __init__(self):
        self.mysqlClass = Mysql.MySQL()
        self.redis = Redis.Redis()
        self.timeClass = Utils.Time()
    def get_user(self,openid):
        self.sql = "SELECT * FROM user WHERE openid=\'%s\'" %(openid)
        self.resql =  self.mysqlClass.select_data(self.sql)
        if self.resql['state'] =='T':
            return {'code':1001,'msg':'已有用户','openid':openid}
        else:
            return {'code': 1002,'msg':'用户不存在','openid':openid}

    def regiter_user(self,data):
        self.create_time = self.timeClass.get_time()
        self.sql = "INSERT INTO user (openid,nickname,avatar,create_time) VALUES (\'%s\',\'%s\',\'%s\',\'%s\')" %(data.openid,data.nickname,data.avatar,self.create_time)
        self.resql = self.mysqlClass.insert_data(self.sql)
        if self.resql['state'] !='E':
            return {'code':1003,'msg':"注册成功"}
        else:
            return {'code': 1004, 'msg': "注册失败"}