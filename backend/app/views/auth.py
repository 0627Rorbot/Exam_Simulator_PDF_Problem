from flask import request, jsonify, render_template, redirect, url_for, flash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash
from app import app, mongo
from app.controllers.auth_controller import authenticate_user, check_admin

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        data = request.form
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

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
        username = request.form.get('username', None)
        password = request.form.get('password', None)
        user = authenticate_user(username, password)
        if not user:
            return jsonify({'msg': 'The username or password is incorrect'}), 401

        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token), 200

    return jsonify({'msg': 'Unregistry requests'}), 409

@app.route('/admin', methods=['GET'])
@jwt_required()
def admin():
    current_user = get_jwt_identity()
    if not check_admin(current_user):
        return jsonify({"msg": "Admin access required"}), 403
    return jsonify({"msg": "Welcome, admin"}), 200
