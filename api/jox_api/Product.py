from jox_api import label_image,Mysql,Utils
from jox_config import api_base_url
import json
class Product():
    def __init__(self):
        self.mysqlClass = Mysql.MySQL()
        self.timeClass = Utils.Time()

    def get_product(self,openid):
        try:
            self.sql = "SELECT * FROM product"
            self.resql = self.mysqlClass.select_data(self.sql)

            if self.resql['state'] != 'E':
                arry0 = []
                arry1=[]
                arry2=[]
                arry3=[]

                for product in self.resql['alldata']:
                    if product['type'] == 0:
                        arry0.append(product)
                    elif product['type'] == 1:
                        arry1.append(product)
                    elif product['type'] == 2:
                        arry2.append(product)
                    elif product['type'] == 3:
                        arry3.append(product)

                arry = []
                arry.append(arry0)
                arry.append(arry1)
                arry.append(arry2)
                arry.append(arry3)

                return {'code': 1011, 'product_list': arry}
            else:
                return {'code': -1}

        except Exception as e:
            print(str(e))
            return {'code': -1}
    def get_product_car(self,openid):
        try:
            self.sql = "SELECT * FROM get_product_car where openid=\'%s\'" %(openid)
            self.resql = self.mysqlClass.select_data(self.sql)

            if self.resql['state'] != 'E':
                data = self.resql['alldata']
                num = 0
                for product in data:
                    num += (product['product_num']*product['price'])
                obj = {'product_car_list':data,'num':num*100}
                return {'code': 1014, 'product_car': obj}
            else:
                return {'code': -1}

        except Exception as e:
            print(str(e))
            return {'code': -1}

    def get_product_info(self,product_id,openid):
        try:
            self.sql = "SELECT * FROM product WHERE id=%s" % (product_id)
            self.resql = self.mysqlClass.select_data(self.sql)
            self.sql2 = "SELECT sum(product_num) as car_num FROM product_car WHERE openid=\'%s\' and is_pay=0" % (openid)
            self.resql2 = self.mysqlClass.select_data(self.sql2)
            if self.resql['state'] != 'E':
                self.product= self.resql['alldata'][0]
                print(self.resql2['alldata'])
                self.product['car_num']=self.resql2['alldata'][0]['car_num']

                return {'code': 1012, 'product_info': self.product}
            else:
                return {'code': -1}

        except Exception as e:
            print(str(e))
            return {'code': -1}
    def add_product_car(self,product_id,openid):
        try:
            self.sql = "SELECT * FROM product_car WHERE product_id=%s and is_pay=0 and openid=\'%s\'" % (product_id,openid)
            self.resql = self.mysqlClass.select_data(self.sql)

            if self.resql['state'] == 'T':
                self.product= self.resql['alldata'][0]

                self.sql3 = "UPDATE product_car SET product_num=%s where id=%s" % (self.product['product_num'] + 1, self.product['id'])
                self.resql3 = self.mysqlClass.insert_data(self.sql3)
                if self.resql3['state'] == 'T':
                    return {'code': 1013}
                else:
                    return {'code': -1}
            else:
                self.sql = '''
                INSERT INTO product_car (openid,product_id,product_num) 
                VALUES (\'%s\',%s,%s)
                ''' % (openid, product_id, 1)
                self.resql = self.mysqlClass.insert_data(self.sql)
                if self.resql['state'] == 'T':
                    return {'code': 1013}
                else:
                    return {'code': -1}
        except Exception as e:
            print(str(e))
            return {'code': -1}
    def pay_product(self,product_id,openid,type):
        try:
            self.create_time = self.timeClass.get_time()

            self.sql = '''
            INSERT INTO order_list (openid,create_date,is_pay) 
            VALUES (\'%s\',\'%s\',%s)
            ''' % (openid, self.create_time,type)
            self.resql = self.mysqlClass.add_insert(self.sql,'')
            self.conn = self.resql['conn']
            self.cur = self.resql['cur']
            self.order_id = self.cur.lastrowid

            if self.resql['state'] == 'T':

                self.sql3 = "UPDATE product SET stock=stock-1 , sales=sales+1 where id=%s" % (product_id)
                self.resql3 = self.mysqlClass.add_insert(self.sql3,self.conn)
                self.conn = self.resql3['conn']

                self.sql3 = "SELECT * FROM product WHERE id=%s" % (product_id)
                self.resql3 = self.mysqlClass.select_data(self.sql3)
                self.data =self.resql3['alldata'][0]
                self.sql = '''
                            INSERT INTO pro_order (order_id,product_id,product_num,price,product_name,msg,image,product_type) 
                            VALUES (%s,%s,1,%s,\'%s\',\'%s\',\'%s\',%s)
                            ''' % (self.order_id, product_id,self.data['price'],self.data['name'],self.data['msg'],self.data['image'],self.data['type'])
                self.resql = self.mysqlClass.add_insert(self.sql, self.conn)

                self.resql4 = self.mysqlClass.commit_inserst(self.resql['conn'])
                if self.resql4['state'] == 'T' and self.resql['state'] == 'T':
                    return {'code': 1015}
                else:
                    return {'code': -1}
            else:
                return {'code': -1}

        except Exception as e:
            print(str(e))
            return {'code': -1}
    def pay_product_car(self,openid,type):
        try:
            self.create_time = self.timeClass.get_time()
            self.sql3 = "SELECT * FROM get_product_car WHERE openid=\'%s\' and  is_pay=0" % (openid)
            self.resql3 = self.mysqlClass.select_data(self.sql3)

            if self.resql3['state'] != 'E':
                self.sql = '''
                INSERT INTO order_list (openid,create_date,is_pay) 
                VALUES (\'%s\',\'%s\',%s)
                ''' % (openid, self.create_time,type)
                self.resql = self.mysqlClass.add_insert(self.sql, '')
                self.conn = self.resql['conn']
                self.cur = self.resql['cur']
                self.order_id = self.cur.lastrowid

                self.products = self.resql3['alldata']

                for product in self.products:
                    self.sql = "UPDATE product SET stock=stock-%s,sales=sales+%s where id=%s" % (product['product_num'],product['product_num'],product['id'])
                    self.resql = self.mysqlClass.add_insert(self.sql, self.conn)
                    self.conn = self.resql['conn']
                    self.sql =  '''
                            INSERT INTO pro_order (order_id,product_id,product_num,price,product_name,msg,image,product_type) 
                            VALUES (%s,%s,%s,%s,\'%s\',\'%s\',\'%s\',%s)
                            ''' % (self.order_id, product['id'],product['product_num'],product['price'],product['name'],product['msg'],product['image'],product['type'])
                    self.resql = self.mysqlClass.add_insert(self.sql, self.conn)
                    self.conn = self.resql['conn']

                self.sql = "UPDATE product_car SET is_pay=1 where openid=\'%s\' and is_pay=0" % (openid)
                self.resql = self.mysqlClass.add_insert(self.sql, self.conn)
                self.conn = self.resql['conn']

                self.resql = self.mysqlClass.commit_inserst(self.conn)
                if self.resql['state'] == 'T':
                    return {'code': 1016}
                else:
                    return {'code': -1}
            else:
                return {'code': -1}
        except Exception as e:
            print(str(e))
            return {'code': -1}