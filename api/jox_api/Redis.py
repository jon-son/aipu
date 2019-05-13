#coding=utf-8
import redis
import pickle
from jox_config import redisConf

class Redis:
    def __init__(self):
        self.r = redis.StrictRedis(host=redisConf['ip'],password=redisConf['passwd'], port=redisConf['port'] ,db=0)


    def set_data(self, key, data, ex=None):
        self.r.set(pickle.dumps(key), pickle.dumps(data), ex)

    # 将文本流从redis中读取并反序列化，返回
    def get_data(self, key):
        self.data = self.r.get(pickle.dumps(key))
        if self.data is None:
            return None

        return pickle.loads(self.data)