# import necessary libraries
from sqlalchemy import func
import pandas as pd

from flask import (
    Flask,
    render_template,
    jsonify)

from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db/bigfoot.sqlite"

db = SQLAlchemy(app)


class Bigfoot(db.Model):
    __tablename__ = 'bigfoot'

    id = db.Column(db.Integer, primary_key=True)
    number = db.Column(db.Integer)
    title = db.Column(db.String)
    classification = db.Column(db.String)
    timestamp = db.Column(db.String)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)

    def __repr__(self):
        return '<BigFoot %r>' % (self.name)


# Create database classes
@app.before_first_request
def setup():
    # Recreate database each time for demo
    # db.drop_all()
    db.create_all()


# Create a route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")


# Query the database and return the jsonified results
@app.route("/data")
def data():


    # sel = [func.strftime("%Y", Bigfoot.timestamp), Bigfoot.latitude, Bigfoot.longitude]
    # sightings = db.session.query(*sel)
    # df = pd.DataFrame(sightings, columns=['year', 'latitude', 'longitude'])
    # return jsonify(df.to_dict)

    # for sighting in sightings:
    #     return jsonify(sighting.latitude, sighting.longitude)
    
    #this one also works
    sel = [func.strftime("%Y", Bigfoot.timestamp), func.count(Bigfoot.timestamp), Bigfoot.latitude, Bigfoot.longitude]
    results = db.session.query(*sel).\
        group_by(func.strftime("%Y", Bigfoot.timestamp)).all()
    df = pd.DataFrame(results, columns=['year', 'sightings', 'lat', 'lng'])
    return jsonify(df.to_dict(orient="records"))

    # #this one works
    # sel = [func.strftime("%Y", Bigfoot.timestamp), func.count(Bigfoot.timestamp), Bigfoot.latitude, Bigfoot.longitude]
    # results = db.session.query(*sel).\
    #     group_by(Bigfoot.latitude).all()
    # df = pd.DataFrame(results, columns=['year', 'sightings', 'lat', 'lng'])
    # return jsonify(df.to_dict(orient="records"))

    # sel = [func.strftime("%Y", Bigfoot.timestamp), func.count(Bigfoot.timestamp), Bigfoot.latitude, Bigfoot.longitude]
    # results = db.session.query(*sel).\
    #     group_by(func.strftime("%Y", Bigfoot.timestamp)).all()
    # df = pd.DataFrame(results, columns=['year', 'sightings'])
    # return jsonify(df.to_dict(orient="records"))


if __name__ == "__main__":
    app.run(debug=True)
