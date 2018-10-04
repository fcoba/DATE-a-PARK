# import necessary libraries
import os

import pandas as pd
import numpy as np
# import plotly.plotly as py
# import plotly.graph_objs as go

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy

import sqlite3 as sql

app = Flask(__name__)

# app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///static/data/date_a_park_SQLITEDB"
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# db = SQLAlchemy(app)

# # reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# Base.prepare(db.engine, reflect=True)

# # Save references to each table
# # Samples_Metadata = Base.classes.sample_metadata
# # Samples = Base.classes.samples
# activities = Base.classes.activities


# Create a route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/activities")
def activities():
    """ Get all the activities """
    # stmt = db.session.query(activities.ACTIVITYNAME).distinct.statement
    # stmt = db.session.query(activities.ACTIVITYNAME).statement
    # df = pd.read_sql_query(stmt, db.session.bind)
    con = sql.connect('./static/data/date_a_park_SQLITEDB')
    cursor = con.cursor()
    cursor.execute("SELECT DISTINCT ACTIVITYNAME FROM activities;")
    # cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
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
        return redirect("/")

    # construct SQL query
    # SELECT (?) FROM (?) WHERE ... (substitute the checked activities)
    # con = sql.connect('./static/data/date_a_park_SQLITEDB')
    # cursor = con.cursor()
    # cursor.execute("SELECT DISTINCT ACTIVITYNAME FROM activities;")

    # Send back the retrieved results & redirect back to home page
    # Use the returned results in JS and change map layer with markers
    # con.close()
    return 

if __name__ == "__main__":
    app.run(debug=True)
