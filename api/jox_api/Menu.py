from jox_api import label_image,Mysql,Utils
from jox_config import api_base_url
import json
class Menu():
    def __init__(self):
        self.mysqlClass = Mysql.MySQL()
        self.timeClass = Utils.Time()

    def get_menu(self,type,openid):
        try:
            if type == 'mine':
                self.sql = "SELECT * FROM get_menu WHERE openid=\'%s\' order by watch DESC " % (openid)
                self.resql = self.mysqlClass.select_data(self.sql)
                if self.resql['state'] != 'E':

                    return {'code': 1007, 'menu_list': self.resql['alldata'] }
                else:
                    return {'code': -1}
            elif type == 'main':
                self.sql = "SELECT * FROM get_menu  order by watch DESC"
                self.resql = self.mysqlClass.select_data(self.sql)
                if self.resql['state'] != 'E':
                    return {'code': 1007, 'top_list': self.resql['alldata'][0:3],'menu_list': self.resql['alldata'][3:-1]}
                else:
                    return {'code': -1}
        except Exception as e:
            print(str(e))
            return {'code': -1}

    def get_menu_info(self,menu_id):
        try:
            self.sql = "SELECT * FROM menu WHERE id=%s" % (menu_id)
            self.resql = self.mysqlClass.select_data(self.sql)
            if self.resql['state'] != 'E':
                self.menu= self.resql['alldata'][0]
                self.sql3 = "UPDATE menu SET watch=%s where id=%s" %(self.menu['watch']+1,menu_id)
                self.resql3 = self.mysqlClass.insert_data(self.sql3)
                print(self.resql3)
                self.sql2 = "SELECT * FROM menu_step WHERE menu_id=%s order by num ASC " % (menu_id)
                self.resql2 = self.mysqlClass.select_data(self.sql2)
                self.step_list = []
                if self.resql2['state'] != 'E':
                    for ai_menu_log in self.resql2['alldata']:
                        self.step_list.append(ai_menu_log)
                self.menu['menu_step'] = self.step_list
                return {'code': 1008, 'menu_info': self.menu}
            else:
                return {'code': -1}

        except Exception as e:
            print(str(e))
            return {'code': -1}

    def add_menu(self,data,openid):
        try:
            self.create_time = self.timeClass.get_time()

            self.sql ='''
            INSERT INTO menu (openid,title,photo,material,accessories,ingredient,create_date) 
            VALUES (\'%s\',\'%s\',\'%s\',\'%s\',\'%s\',\'%s\',\'%s\')
            '''% (openid, data.title,data.photo,data.material,data.accessories,data.ingredient, self.create_time)

            self.resql = self.mysqlClass.add_insert(self.sql,"")
            self.conn = self.resql['conn']
            self.cur = self.resql['cur']
            self.menu_id = self.cur.lastrowid
            steps = json.loads(data.steps)

            for step in steps:
                print(step['num'])
                self.sql2 = '''
                INSERT INTO menu_step (menu_id,num,content,image,create_date)
                VALUES (%s,%d,\'%s\',\'%s\',\'%s\')
                '''% (self.menu_id, step['num'],step['content'],step['image'], self.create_time)
                self.resql2 = self.mysqlClass.add_insert(self.sql2, self.conn)
                self.conn = self.resql2['conn']
            self.resql = self.mysqlClass.commit_inserst(self.conn)
            if self.resql['state'] !='E':
                return {'code': 1010}
            else:
                return {'code': -1}

        except Exception as e:
            print(str(e))
            return {'code': -1}