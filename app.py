import os
import json
from flask import Flask, redirect, url_for, request, render_template, jsonify
from pymongo import MongoClient
from bson import ObjectId
from flask_cors import CORS

app = Flask("DockerTutorial")
CORS(app)

# To change accordingly 
print(os.environ)
client = MongoClient("db", 27017)
db = client.appdb


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)


@app.route("/")
def index():
    _items = db.appdb.find()
    items = [items for items in _items]

    print(request.headers)
    if request.headers['Accept'] == 'application/json':
        return jsonify(JSONEncoder().encode(items)), 200
    else:
        return render_template("index.html", items=items)


@app.route("/new", methods=["POST"])
def new():
    print(request.json)
    data = {
        "text": request.json["text"] if request.content_type == 'application/json' else request.form["text"]
    }

    db.appdb.insert_one(data)

    return redirect(url_for("index"))


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)

