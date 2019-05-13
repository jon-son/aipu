# -*- coding: utf-8 -*-
# by jonson 2018/10/27
from jox_config import mysqlConf
from jox_api import Utils
import pymysql



class MySQL(object):
    def __init__(self):
        self.jox_dict = Utils.Dict()
        self.conn = pymysql.connect(host=mysqlConf['ip'], port=mysqlConf['port'], user=mysqlConf['username'],
                               password=mysqlConf['passwd'], database=mysqlConf['DB'],cursorclass=pymysql.cursors.DictCursor )
    def select_data(self, sql):
        try:
            self.cur = self.conn.cursor()
            self.cur.execute(sql)
            self.cur.close()
            self.alldata = self.cur.fetchall()
        except Exception as e:
            # 发生错误时回滚，并返回erro
            self.conn.rollback()
            return {"state":"E","msg":str(e)}
        if len(self.alldata) > 0:
            self.alldata = self.jox_dict.data_format(self.alldata)
            return {"state": "T", "msg": "返回"+str(len(self.alldata))+"条数据" ,"alldata":self.alldata}
        else:
            return {"state": "F", "msg": "返回"+str(len(self.alldata))+"条数据",'alldata':[]}

    def update_data(self,sql):
        try:
            self.cur = self.conn.cursor()
            # 执行SQL语句
            self.cur.execute(sql)
            # 提交到数据库执行
            self.conn.commit()
            return {"state": "T", "msg": str(self.cur)}
        except Exception as e:
            # 发生错误时回滚，并返回erro
            self.conn.rollback()
            return {"state": "E", "msg": str(e)}


    def insert_data(self,sql):
        try:
            self.cur = self.conn.cursor()
            # 执行SQL语句
            self.cur.execute(sql)
            # 提交到数据库执行
            self.conn.commit()
            return {"state": "T", "msg": str(self.cur)}
        except Exception as e:
            # 发生错误时回滚，并返回erro
            self.conn.rollback()
            return {"state": "E", "msg": str(e)}

    def add_insert(self,sql,conn):
        try:
            if conn =="":
                conn = self.conn

            self.cur = conn.cursor()
            # 执行SQL语句
            self.cur.execute(sql)

            return {"state": "T", "conn":conn,"cur":self.cur}

        except Exception as e:

            return {"state": "E", "msg": str(e)}
    def commit_inserst(self,conn):
        try:
            # 提交到数据库执行
            conn.commit()
            return {"state": "T"}
        except Exception as e:
            # 发生错误时回滚，并返回erro
            conn.rollback()
            return {"state": "E", "msg": str(e)}