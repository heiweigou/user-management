from flask import Flask, render_template,jsonify,json,request
import pymysql
import dateutil.parser
from datetime import datetime
from flask_mail import Mail,Message
from smtplib import SMTPResponseException

app = Flask(__name__)


app.config.update(dict(
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=587,
    MAIL_USE_SSL=False,
    MAIL_USE_TLS=True,
    MAIL_USERNAME='jiaowangzhen@gmail.com',
    MAIL_PASSWORD='omqqxqetufeycufp'
))
mail=Mail(app)

# omqqxqetufeycufp
def connect_db():
    return pymysql.connect(host="127.0.0.1",user="root",password="nj2495602",db="user_management",cursorclass=pymysql.cursors.DictCursor )

def toPyDatetime(js_date_str):
    if(js_date_str is not None):
        # print(js_date_str,datetime.fromisoformat(js_date_str))
        return datetime.fromisoformat(js_date_str)
    return None

def toSqlDate(js_date_str):
    if(js_date_str is not None):
        str=js_date_str.strftime('%Y-%m-%d %H:%M:%S')
        print ('sql',str)
        return str
    return None

def getLastAppIdSql(app,typeOfAccess):
    return 'SELECT MAX(id) FROM '+app

def insertIncidentSql(app):
    print('INSERT INTO incidents (incident,requested_date,access_start_date,access_end_date,app,user_id,'+app+'_id) VALUES (%s,%s,%s,%s,%s,%s,%s)')
    return 'INSERT INTO incidents (incident,requested_date,access_start_date,access_end_date,app,user_id,'+app+'_id) VALUES (%s,%s,%s,%s,%s,%s,%s)'

def appInsertSql(app,typeOfAccess):
    sql=''
    keys=[]
    values=[]
    print(typeOfAccess)
    for key,value in typeOfAccess.items():
        keys.append(key)
        values.append(value)
    
    keys=','.join(map(str,keys))
    values=','.join(map(str,values))
    sql='INSERT INTO '+app+'('+keys+') '+'values('+values+')'
    print(sql)
    return sql



@app.route("/getIncidents")
def index():
    db=connect_db()
    cursor = db.cursor()
    cursor.execute("select * from incidents left join users on users.id=incidents.user_id order by incidents.id ")
    rows = cursor.fetchall()
    db.close()
    return jsonify(data=rows)


@app.route('/incidents/edit/<string:id>')
def editIncident(id):
    db=connect_db()
    # sql_get_user="select * from incidents where id=%s"
    sql_get_typeOfAccess="select * from %s where id = %s"
    sql_get_emails='select date,header,body,status from incidents inner join emails on emails.incident_id=incidents.id where incidents.id=%s'
    sql_get_incidents='select * from incidents inner join users on incidents.user_id=users.id where incidents.id=%s'
    cursor=db.cursor()
    
    cursor.execute(sql_get_incidents,id)

    
    incident=cursor.fetchone()
    app=incident['app']
    cursor.execute(sql_get_emails,id)
    emails=cursor.fetchall()
    print(emails)
    
    sql_str=sql_get_typeOfAccess%(app,incident[app.lower()+'_id'])
    
    try:
        cursor.execute(sql_str)
    except pymysql.ProgrammingError as e:
        print("ProgrammingError")
        print(e)
    typeOfAcess=cursor.fetchone()
    # print(typeOfAcess)
    incident['typeOfAccess']=typeOfAcess
    db.close()
    # print (incident)
    data={
        'incidents':incident,
        'emails':emails
    }
    # print(data)
    return jsonify(data=data)

@app.route('/email',methods=['POST'])
def email():
    print(request.json)
    data=request.json
    incidents=data['incidents']
    title=data['header']
    body=data['body']
    date=datetime.now()
    db=connect_db()
    cursor=db.cursor()
    sql_insert_emails='insert into emails (header,body,incident_id,date,status) values (%s,%s,%s,%s,%s)'
    for item in incidents:
        
        recipient=item['email']
        incident_id=item['id']

        msg=Message(title,sender='jiaowangzhen@gmail.com',recipients=[recipient])
        msg.body=body
        status='Success'
        try:

            mail.send(msg)
            

        except SMTPResponseException as e:
            status=e.smtp_error
        # f'{title},{body},{incident_id},{date},{status}'
        cursor.execute(sql_insert_emails,(title,body,incident_id,date,status))
        db.commit()
    db.close()
    return 'emails sent'


    # db=connect_db()
    
    # sql_insert_emails='insert into emails (header,body,incident_id,date,status) values (%s,%s,%s,%s,%s)'
    # cursor=db.cursor()
    # cursor.execute(sql_get_user,id)
    # row=cursor.fetchone()
    # cursor.execute(sql_get_incidents,id)
    # rows=cursor.fetchall()
    # db.close()
   
    # print('email sent')
    # return status

@app.route('/users/<string:id>')
def getUsers(id):
    db=connect_db()
    sql_get_user="select * from users where id=%s"
    sql_get_incidents='select * from incidents left join users on users.id=incidents.user_id where users.id=%s order by incidents.id;'
    cursor=db.cursor()
    cursor.execute(sql_get_user,id)
    row=cursor.fetchone()
    cursor.execute(sql_get_incidents,id)
    rows=cursor.fetchall()
    db.close()
    return jsonify(user=row,incidents=rows)

@app.route('/add',methods=['POST'])
def add():
    app=request.json['app']
    name=request.json['name']
    email=request.json['email']
    incident=request.json['incident']
    department=request.json['department']
    typeOfAccess=request.json['typeOfAccess']
    # print(typeOfAccess)
    # dateISO to python datetime
    requestedDate=toPyDatetime(request.json['requestedDate'])
    accessStartDate=toPyDatetime(request.json['accessStartDate'])
    accessEndDate=toPyDatetime(request.json['accessEndDate'])
    
    # sql_insert_incident='INSERT INTO incidents (incident,requested_date,access_start_date,access_end_date,app,user_id,) VALUES (%s,%s,%s,%s,%s,%s)'
    sql_select='SELECT id from users where email=%s'
   
    
# accessEndDate: null
# accessStartDate: Tue Oct 08 2019 08:53:40 GMT+1100 (Australian Eastern Daylight Time) {}
# app: "RAI"
# department: ""
# email: "its@qq.omkk"
# incident: ""
# isOngoingAccess: false
# name: ""
# requestedDate:
    # sql_insert_rai='INSERT INTO rai(read,update,insert_update) VALUES()'
    # sql_insert_streams='INSERT INTO streams(monitor_all,monitor_limited,media,ramp_control,ramp_monitoring,regional_maint,regional_maintenance_with_DMS,signal_control,tmc,tmc_support,its_project) VALUES()'
    # sql_insert_scats='INSERT INTO scats(scats,scats_traffic_report,scats_history_viewer,unusual_congestion_viewer,lxlistg) VALUES()'
    sql_insert_app=appInsertSql(app,typeOfAccess)
    sql_lastAppId=getLastAppIdSql(app,typeOfAccess)


    db=connect_db()
    cursor = db.cursor()
    
    # get users if the user in the current db
    cursor.execute(sql_select,(email))
    userRows=cursor.fetchone()

    # insert a new user if it is not in the db
    if(userRows is None):
        sql_insert_user='INSERT INTO users (name,email,department) VALUES (%s,%s,%s)'
        cursor.execute(sql_insert_user,(name,email,department))
        db.commit()

    # select that existing user with matching email
    cursor.execute(sql_select,(email))
    
    #get user id
    userId=cursor.fetchone()['id']
 
    # insert type of access (rai,streams,scats)
   
    cursor.execute(sql_insert_app)
    db.commit()
    print(sql_insert_app)
    #select latest typeofaccess id
    print(sql_lastAppId)
    cursor.execute(sql_lastAppId)
    
    typeOfAccessId=cursor.fetchone()['MAX(id)']
    print(insertIncidentSql(app))
    #insert userID,typeOfAccessId to incidents
    cursor.execute(insertIncidentSql(app),(incident,toSqlDate(requestedDate),toSqlDate(accessStartDate),toSqlDate(accessEndDate),app,userId,typeOfAccessId))
    db.commit()
    db.close()






    # cursor.execute('INSERT INTO users (name,email,department) VALUES ("wang","its@qq.om","its")')
    # db.commit()
    # db.close()
    
    return 'data'