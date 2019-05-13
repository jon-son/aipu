from jox_api import label_image,Mysql,Utils
from jox_config import api_base_url


class AI():
    def __init__(self):
        self.mysqlClass = Mysql.MySQL()
        self.timeClass = Utils.Time()
    def ai_pic(self,path,file_name,openid):
        try:
            self.x = label_image.label_image(path+file_name)
            self.rex = []
            self.create_time = self.timeClass.get_time()
            self.sql = "INSERT INTO ai_log (openid,imgurl,create_time) VALUES (\'%s\',\'%s\',\'%s\')" % (openid, file_name, self.create_time)
            self.resql = self.mysqlClass.add_insert(self.sql,"")
            self.conn = self.resql['conn']
            self.cur = self.resql['cur']
            self.ai_log_id = self.cur.lastrowid
            for i in self.x:
                self.sql = "SELECT * FROM menu WHERE id=%s" %(i['labels'])
                self.resql = self.mysqlClass.select_data(self.sql)
                if self.resql['state'] != 'E':
                    self.redata = self.resql['alldata'][0]

                    self.sql2 = "INSERT INTO ai_menu_log (menu_id,ai_log_id) VALUES (%s,%s)" % (
                        self.redata['id'], self.ai_log_id)
                    self.resql2 = self.mysqlClass.add_insert(self.sql2, self.conn)
                    self.conn = self.resql2['conn']
                    self.rex.append({
                        'name':self.redata['title'],
                        'id':self.redata['id'],
                        'results': i['results']
                    })

            self.resql = self.mysqlClass.commit_inserst(self.conn)
            if self.resql['state'] !='E':
                return {'code': 1005, 'list': self.rex}
            else:
                return {'code': -1}
        except Exception as e:
            print(str(e))
            return {'code': -1}

    def get_ai_log(self,openid):
        try:
            self.ai_log = []
            self.sql = "SELECT * FROM ai_log WHERE openid=\'%s\'" % (openid)
            self.resql = self.mysqlClass.select_data(self.sql)
            if self.resql['state'] != 'E':
                for log in self.resql['alldata']:
                    self.sql2 = "SELECT * FROM get_menu_log WHERE ai_log_id=%s" % (log['id'])
                    self.resql2 = self.mysqlClass.select_data(self.sql2)
                    self.ai_menu_log = []
                    if self.resql2['state'] != 'E':
                        for ai_menu_log in self.resql2['alldata']:
                            self.ai_menu_log.append(ai_menu_log)
                    log['imgurl'] = api_base_url + "/" +log['imgurl']
                    log['ai_menu_log'] = self.ai_menu_log
                    self.ai_log.append(log)
                return {'code': 1006, 'ai_log': self.ai_log}
            else:
                return {'code': -1}

        except Exception as e:
            print(str(e))
            return {'code': -1}