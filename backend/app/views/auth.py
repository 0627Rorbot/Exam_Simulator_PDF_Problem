from flask import request, jsonify, render_template, redirect, url_for, flash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash
from app import app, mongo
from app.controllers.auth_controller import authenticate_user, check_admin, profile_user
from bson import json_util, ObjectId
import json

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        print(data)

        if not username or not email or not password:
            return jsonify({'msg': 'Unregistry requests'}), 409

        hashed_password = generate_password_hash(password)
        user_collection = mongo.db.users

        if user_collection.find_one({"username": username}):
            return jsonify({"msg", "Username already exists"}), 401

        user_collection.insert_one({"username": username, "email": email, "password": hashed_password})
        return jsonify({'msg': 'User created successfully'}), 201

    return jsonify({'msg': 'Unregistry requests'}), 409

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        username = data.get('username', None)
        password = data.get('password', None)
        status, user = authenticate_user(username, password)
        if not status:
            return jsonify({'status': False, 'msg': 'The username or password is incorrect'}), 401

        access_token = create_access_token(identity=username)
        return jsonify({'status': True, 'msg': 'Log in successfully', "access_token": access_token}), 200

    return jsonify({'status': False, 'msg': 'Unregistry requests'}), 409

# Get username from user_id
@app.route("/profile", methods=["GET"])
@jwt_required()
def getprofile():
    username = get_jwt_identity() # Get the identity of the current user
    status, user = profile_user(username)
    if not status:
        return jsonify({'status': False, 'msg': 'Can\'t find user profile.'}), 409
    return jsonify({'status': True, 'msg': 'Get Profile successfully.', 'profile': user}), 209

@app.route('/admin', methods=['GET'])
@jwt_required()
def admin():
    current_user = get_jwt_identity()
    if not check_admin(current_user):
        return jsonify({"msg": "Admin access required"}), 403
    return jsonify({"msg": "Welcome, admin"}), 200


def parse_json(data):
    return json.loads(json_util.dumps(data))
