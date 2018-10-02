# import necessary libraries
from sqlalchemy import func
import pandas as pd

from flask import (
    Flask,
    render_template,
    jsonify,
    send_from_directory)

from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db/parks.sqlite"

db = SQLAlchemy(app)


class Parks(db.Model):
    __tablename__ = 'parks'

    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String)
    lat = db.Column(db.String)
    long = db.Column(db.String)
    address1 = db.Column(db.String)
    address2 = db.Column(db.String)
    address3 =  db.Column(db.String)
    city = db.Column(db.String)
    state = db.Column(db.String)
    zip = db.Column(db.String)
    description = db.Column(db.String)
    directions = db.Column(db.String)
    email = db.Column(db.String)
    phone = db.Column(db.String)

    def __repr__(self):
        return '<Parks %r>' % (self.name)


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

@app.route("/css/style.css")
def serve_static():
    root_dir = os.path.dirname(os.getcwd())
    return send_from_directory(os.path.join(root_dir, 'static', 'css'), "style.css")

# Query the database and return the jsonified results
@app.route("/data")
def data():


    #create a for loop and append the values to dictionaries:

    # sel = [Parks.name, Parks.lat, Parks.long]
    # results = db.session.query(Parks.name)
    df = pd.read_sql(db.session.query(Parks.name), db.session.bind)
    #df = pd.DataFrame(data=results, columns=['name', 'lat', 'lng'])
    #return jsonify(df.to_dict(orient="records"))
    return df
    # sel = [func.strftime("%Y", Bigfoot.timestamp), Bigfoot.latitude, Bigfoot.longitude]
    # sightings = db.session.query(*sel)
    # df = pd.DataFrame(sightings, columns=['year', 'latitude', 'longitude'])
    # return jsonify(df.to_dict)

    # for sighting in sightings:
    #     return jsonify(sighting.latitude, sighting.longitude)
    
    #this one also works
    # sel = [Parks.name, Parks.lat, Parks.long]
    # results = db.session.query(*sel).\
    #     group_by(func.strftime("%Y", Bigfoot.timestamp)).all()
    # df = pd.DataFrame(results, columns=['year', 'sightings', 'lat', 'lng'])
    # return jsonify(df.to_dict(orient="records"))

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
