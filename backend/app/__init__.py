from flask import Flask
from flask_jwt_extended import JWTManager
from pymongo import MongoClient
from config import Config
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config.from_object(Config)

jwt = JWTManager(app)
mongo = MongoClient('localhost', 27017)

from app.views import auth, problem

if __name__ == '__main__':
    app.run()
