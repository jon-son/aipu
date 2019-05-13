import datetime
import time
import decimal


class Time():
    def get_time(self,):
        st = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
        sttotime = datetime.datetime.strptime(st, "%Y-%m-%d %H:%M:%S")
        return sttotime
    def more_day(self,datetimes):
        return datetimes + datetime.timedelta(days=1)
class Dict():
    def data_format(self,list):
        for data in list:
            for key, value in data.items():
                if isinstance(value,datetime.datetime):
                    data[key] = value.strftime("%Y-%m-%d %H:%M:%S")
                if isinstance(value,decimal.Decimal):
                    data[key] = float(value)
        return list