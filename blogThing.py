import os
import errno
from flask import Flask, render_template, session, request, jsonify
from flask.ext.restless import APIManager
from flask.ext.sqlalchemy import SQLAlchemy
from sqlalchemy import Text, Column, Integer
from flask.ext.triangle import Triangle
import requests
import json


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pin.db'
db = SQLAlchemy(app)
Triangle(app)
owner = "AlexTelon"


class Desk(db.Model):
    id = Column(Integer, primary_key=True)
    owner = Column(Text, unique=False)
    # Right now only suport for 1 name, several would be fun later on
    name = Column(Text, unique=False)
    # We store all desks on the server with an unique url so they can be shared through email and such
    storage = Column(Text, unique=False)

    def __init__(self, owner, name, storage):
        self.owner = owner
        self.name = name
        self.storage = storage

    def __repr__(self):
        return '<Owner, %r, Name %r, Storage %r>' % (self.owner, self.name, self.storage)


db.create_all()

api_manager = APIManager(app, flask_sqlalchemy_db=db)
api_manager.create_api(Desk, methods=['GET', 'POST', 'DELETE', 'PUT'])


@app.route('/')
def index():
    return render_template("main.html", desk="", storage="")


@app.route('/codeschool')
def codeschool():
    return render_template("codeschool.html")


@app.route('/drive')
def drive():
    return render_template("drive.html")


@app.route('/buttontest')
def buttontest():
    return render_template("buttonTest.html")


@app.route('/getUserName')
def getUserName():
    print("getUserName")
    # mock solution so far. Replace with a google response for the real drive user.
    return "AlexTelon"


@app.route('/storage/<owner>/<deskname>')
def storage(owner, deskname):
    ret = Desk.query.filter_by(owner=owner, name=deskname).first()
    if not ret == None:
        # ret = db.session.query(); # owner=owner, name=deskname)
        # TODO handle when query does not find anything
        print("storage returns: ", ret)
        print("owner: ", ret.owner)
        print("name: ", ret.name)
        print("storage: ", ret.storage)
        return render_template("main.html", desk=ret.name, storage=ret.storage)
    return render_template("main.html", desk="Desk not found", storage="File is not stored on system")

# first check if there already is a desk with that name, in that case return
@app.route('/createStorageFor/<owner>/<deskname>')
def createStorageFor(owner, deskname):
    print("-"*30)
    print("createStorageFor/", owner, "/", deskname)
    print("")
    print("owner: ", owner, " deskname", deskname)
    ourDir = os.path.dirname(__file__)
    path = os.path.join(ourDir, "desks")
    path = os.path.join(path, owner)
    print("path:", path)
    fileName = deskname
    print("filename:", fileName)

    # Create folder if needed
    # try:
    # os.makedirs(path)
    # except OSError as exception:
    #     if exception.errno != errno.EEXIST:
    #         raise
    # # Create/overwrite file
    try:
        #pass
        print("before open to: ", os.path.join(path, fileName))
        f = open(os.path.join(path, fileName), 'a+')
        #f.write("Testing")
        f.close()
        print("file has been closed")
    except Exception as e:
        print("file creation failed: ", e)
        print("-"*30)

    print("-"*30)
    return fileName


@app.route('/savejson/<desk>', methods=['POST'])
def savejson(desk):
    print("-"*30)
    print("savejson/", desk)
    print("")
    jsonResponse = request.json
    print("json: ", jsonResponse)
    print("jsonify(json): ", jsonify(jsonResponse))
    ourDir = os.path.dirname(__file__)
    path = os.path.join(ourDir, "desks")
    path = os.path.join(path, owner)
    fileName = desk
    try:
        # pass
        print("before open to: ", os.path.join(path, fileName))
        f = open(os.path.join(path, fileName), 'w')
        print("after open(...)")
        json.dump(jsonResponse, f)
        print("after dump")
        f.close()
        print("file has been closed")
    except Exception as e:
        print("file creation failed: ", e)
        print("-"*30)
        return False

    print("-"*30)
    return "derp"

@app.route('/getjson/<desk>', methods=['GET'])
def getjson(desk):
    print("-"*30)
    print("getjson/", desk)
    print("")
    ourDir = os.path.dirname(__file__)
    path = os.path.join(ourDir, "desks")
    path = os.path.join(path, owner)
    fileName = desk
    contents = ""
    try:
        # pass
        print("before open to: ", os.path.join(path, fileName))
        f = open(os.path.join(path, fileName), 'r')
        print("after open")
        print("f is: ", f)
        contents = f.read()
        print("contents: ", contents)
        f.close()
        print("after f.close()")
        print("file has been closeddfsdf")
    except Exception as e:
        print("file creation failed: ", e)
        print("-"*30)
        abort(404)

    print("-"*30)
    return contents



app.debug = True
if __name__ == '__main__':
    app.run()
