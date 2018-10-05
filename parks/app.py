# import necessary libraries
import os
import json
import pandas as pd
import numpy as np


import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask_cors import CORS

from flask import Flask, jsonify, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy

import sqlite3 as sql

app = Flask(__name__, static_folder="static")
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///db/date_a_park.sqlite"
db = SQLAlchemy(app)

# from .models import *


# Create a route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/activities")
def activities():
    """ Get all the activities """
    db_path = os.path.join('.', 'static','data','date_a_park_SQLITEDB')
    con = sql.connect(db_path)
    cursor = con.cursor()
    cursor.execute("SELECT DISTINCT ACTIVITYNAME FROM activities ORDER BY ACTIVITYNAME ASC;")
    data = jsonify(cursor.fetchall())
    con.close()

    return data

@app.route("/send", methods=["GET"])
def send():
    # need the names of things that are checked
    # loop through request.form (should be dictionary)
    # then get only the "checked" ones
    if request.method == "GET":
        print("Hello")
        print(request.args)
        form_data = request.args
        # get the activity keys
        activities = []
        query = "SELECT DISTINCT parks.NAME, parks.LAT, parks.LONG FROM parks "
        query += "INNER JOIN activities ON parks.ID = activities.ID "
        
        query += "WHERE (" # activities.ACTIVITYNAME = "
        for activity in form_data:
            query += "activities.ACTIVITYNAME = '" + activity + "' AND "

        # remove that last " AND " (5 characters)
        query = query[:-5]
        query += ");"

        print(query)
        # Now we need the SQL query
        
        db_path = os.path.join('.', 'static','data','date_a_park_SQLITEDB')
        con = sql.connect(db_path)
        con.text_factory = lambda x: str(x, 'utf-8')
        cursor = con.cursor()
        # # cursor.execute("select name from sqlite_master where type = 'table';")
        cursor.execute(query)
        data = cursor.fetchall()
        # names = list(map(lambda x: x[0], cursor.description))
        # print(names)

        

        return jsonify(data)
        # results = db.session.query(Parks.name, Parks.lat, Parks.lon).all()
        # #results = db.session.query(Parks.name, Parks.lat, Parks.lon).filter(Parks.id == '4')

        # name = [result[0] for result in results]
        # lat = [result[1] for result in results]
        # lon = [result[2] for result in results]

        # park_data = [{
        #     "type": "scattergeo",
        #     "locationmode": "USA-states",
        #     "name": name,
        #     "lat": lat,
        #     "lon": lon,
        #     "text": name,
        #     "hoverinfo": "text",
        #     "marker": {
        #         "size": 5,
        #         "line": {
        #             "color": "rgb(8,8,8)",
        #             "width": 1
        #         },
        #     }
        # }]

        # return jsonify(park_data)
    return # This is if the requeset is not a GET method

@app.route("/parks")
def parks():
    # return jsonify(json.load(open(os.path.join('.', 'static', 'data', 'parks.geojson' ))))
    return jsonify(json.load(open(os.path.join('http://localhost:8080' + port, 'static', 'data', 'parks.geojson'))))

if __name__ == "__main__":
    app.run(debug=True)
