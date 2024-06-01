from flask import request, jsonify, redirect, url_for, flash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash
from app import app
# from app.controllers.auth_controller import authenticate_user, check_admin
from app.controllers.problem_controller import get_problems, save_problems

@app.route('/api/exam_problems', methods=['GET'])
@jwt_required()
def get_exam_Problems():
    args = request.args
    problem_id = args.get("_id")
    problem_cnt = args.get("count")

    exam_problems = get_problems(problem_id, problem_cnt)
    return jsonify({"data": exam_problems})


@app.route('/api/upload', methods = ['POST'])
def upload_file():
    try:
        pdf_file = request.files['file'] 
        pdf_file.save('./build/pdf/temp')
        return jsonify({"status": True, "msg": "Upload Successfully."})
    except Exception as e:
        return jsonify({"status": False, "msg": "Upload Failed."})


@app.route('/api/problem', methods = ['POST'])
def save_exam_Problems():
    data = request.get_json()
    print(data)
    title = data["title"]

    status = save_problems(title)
    return jsonify({"status": status})
