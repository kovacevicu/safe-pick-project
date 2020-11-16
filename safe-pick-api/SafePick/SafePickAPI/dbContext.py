import mysql.connector as conn
from . import models
from . import mailsender
from hashlib import md5
from uuid import uuid4

class DbContext:
    @staticmethod
    def checkEmail(email):
        db = conn.connect(host='localhost',database='safepick',user='root',passwd='ko227979')
        cur = db.cursor()
        try:
            cur.execute(f"select * from safepickapi_users where email = '{email}'")
            if not cur.fetchone():
                cur.close()
                db.close()
                return email
            else:
                cur.close()
                db.close()
                return None
        except:
            pass
    
    @staticmethod
    def save(email, password, country, city):
        user = models.Users()
        user.email = email
        user.password = md5(password.encode()).hexdigest()
        user.country = country
        user.city = city
        user.token = uuid4()
        mailsender.sendEmail(user.email, user.token)
        user.save()

    @staticmethod
    def login(email, password):
        db = conn.connect(host='localhost',database='safepick',user='root',passwd='ko227979')
        cur = db.cursor()
        try:
            cur.execute(f"select * from safepickapi_users where email = '{email}' and password = '{password}'")
            user = cur.fetchone()
            if user:
                country = user[3]
                city = user[4]
                active = user[5]
            cur.close()
            db.close()
            if active:
                return {'email':email, 'country':country, 'city':city}
            else:
                return None
        except:
            return None

    @staticmethod
    def activate(token):
        db = conn.connect(host='localhost',database='safepick',user='root',passwd='ko227979')
        cur = db.cursor()

        cur.execute(f"update safepickapi_users set active = 1 where token = '{token}'")
        db.commit()

        cur.close()
        db.close()
