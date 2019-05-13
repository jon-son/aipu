from jox_api import label_image,Mysql,Utils
from jox_config import api_base_url
import json
class Order():
    def __init__(self):
        self.mysqlClass = Mysql.MySQL()
        self.timeClass = Utils.Time()

    def get_order(self,openid,type):
        try:
            if type == 1:
                self.sql = "SELECT * FROM order_list where openid=\'%s\'" %(openid)
            else:
                self.sql = "SELECT * FROM order_list where openid=\'%s\' and is_pay=0" % (openid)
            self.resql = self.mysqlClass.select_data(self.sql)

            if self.resql['state'] != 'E':
                order_list = []
                for order in self.resql['alldata']:
                    products=[]
                    self.sql = "SELECT * FROM pro_order where order_id=%s" % (order['id'])
                    self.resql = self.mysqlClass.select_data(self.sql)
                    num = 0
                    for pro_order in self.resql['alldata']:
                        num+=(pro_order['price']*pro_order['product_num'])
                        products.append(pro_order)
                    order['num'] = num
                    obj = {
                        'order':order,
                        'products':products
                    }
                    order_list.append(obj)
                return {'code': 1017, 'order_list':order_list}
            else:
                return {'code': -1}

        except Exception as e:
            print(str(e))
            return {'code': -1}
    def pay_order(self,openid,order_id):
        try:
            self.sql = "UPDATE order_list SET is_pay=1 where id=%s and openid=\'%s\'" % (order_id,openid)
            self.resql = self.mysqlClass.insert_data(self.sql)

            if self.resql['state'] == 'T':
                return {'code': 1019}
            else:
                return {'code': -1}

        except Exception as e:
            print(str(e))
            return {'code': -1}