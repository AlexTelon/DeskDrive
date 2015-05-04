from flask import Flask, render_template
from flask.ext.restless import APIManager
from flask.ext.sqlalchemy import SQLAlchemy
from sqlalchemy import Text, Column, Integer
from flask.ext.triangle import Triangle

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pin.db'
db = SQLAlchemy(app)
Triangle(app)


class Pin(db.Model):
    id = Column(Integer, primary_key=True)
    title = Column(Text, unique=False)
    image = Column(Text, unique=False)

    def __init__(self, title, image):
        self.title = title
        self.image = image

    def __repr__(self):
        return '<Title %r>' % self.title

db.create_all()

api_manager = APIManager(app, flask_sqlalchemy_db=db)
api_manager.create_api(Pin, methods=['GEt', 'POST', 'DELETE', 'PUT'])

@app.route('/')
def index():
    return render_template("main.html")

@app.route('/codeschool')
def codeschool():
    return render_template("codeschool.html")

@app.route('/drive')
def drive():
    return render_template("drive.html")

app.debug = True
if __name__ == '__main__':
    app.run()
