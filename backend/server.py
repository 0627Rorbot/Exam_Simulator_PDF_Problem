import json
import datetime
import hashlib
from bson import json_util, ObjectId
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from pymongo import MongoClient
import pdfplumber
import random

app = Flask(__name__)
CORS(app)

# MongoDB cloud config
# username = 'gameswap'
# password = 'SO3v6uVCwfQqpzPS'
# client = MongoClient("mongodb+srv://" + username + ":" + password + "@cluster0.tupmdgp.mongodb.net/?retryWrites=true&w=majority", tls=True, tlsAllowInvalidCertificates=True)

client = MongoClient('localhost', 27017)

db = client.skool_db
listings_collection = db.listings_collection
users_collection = db.users_collection

jwt = JWTManager(app) # initialize JWTManager
app.config['JWT_SECRET_KEY'] = 'DanialxRatherxYJ'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(days=1) # define the life span of the token

# Register API route
@app.route("/user", methods=["POST"])
def register():
    new_user = request.get_json() # store the json body request
    new_user["password"] = hashlib.sha256(new_user["password"].encode("utf-8")).hexdigest() # encrypt password
    doc = users_collection.find_one({"username": new_user["username"]}) # check if user exist
    if not doc:
        users_collection.insert_one(new_user)
        return jsonify({'msg': 'User created successfully'}), 201
    else:
        return jsonify({'msg': 'Username already exists'}), 409

# Get profile API route
@app.route("/user", methods=["GET"])
@jwt_required( )
def profile():
    current_user = get_jwt_identity() # Get the identity of the current user
    user_from_db = users_collection.find_one({'username' : current_user})
    if user_from_db:
        user_from_db['_id'] = str(user_from_db['_id'])
        del user_from_db['password'] # delete data we don't want to return
        return jsonify({'profile' : user_from_db }), 200
    else:
        return jsonify({'msg': 'Profile not found'}), 404

# Login API route
@app.route("/login", methods=["POST"])
def login():
    login_details = request.get_json() # store the json body request
    user_from_db = users_collection.find_one({'username': login_details['username']})  # search for user in database

    if user_from_db:
        encrypted_password = hashlib.sha256(login_details['password'].encode("utf-8")).hexdigest()
        if encrypted_password == user_from_db['password']:
            access_token = create_access_token(identity=user_from_db['username']) # create jwt token from username
            return jsonify(access_token=access_token), 200

    return jsonify({'msg': 'The username or password is incorrect'}), 401

# @app.route("/deletelisting", methods=["GET"])
# @jwt_required( )
# def deletelisting():
#     args = request.args
#     listing_id = args.get("listing_id")
#     listings_collection.delete_one({"_id": ObjectId(listing_id)})
#     return jsonify({'msg': 'Listing deleted successfully'}), 203

def parse_json(data):
    return json.loads(json_util.dumps(data))

# # Members API route
# @app.route("/members")
# def members():
#     return {"members": ["Danial", "Rather", "YJ"]}

# Get username from user_id
@app.route("/getusername", methods=["GET"])
def getusername():
    args = request.args
    user_id = args.get("user_id")
    return parse_json(users_collection.find_one({"_id" : ObjectId(user_id)}))
    

# PDF Simulator

question_file_name = 'test2'

@app.route('/api/questions', methods=['GET'])
@jwt_required( )
def get_questions():
    pdf_path = f'./build/{question_file_name}.pdf'

    questions = []
    with pdfplumber.open(pdf_path) as pdf:
        k = 0
        for page in pdf.pages:
            k += 1
            if k == 10:
                break
            text = page.extract_text()
            if text:
                questions.extend(parse_text(text))
    
    limit = request.args.get('limit', default=len(questions), type=int)
    selected_questions = random.sample(questions, min(limit, len(questions)))
    return jsonify(selected_questions)

@app.route('/api/upload', methods = ['POST'])
def upload_file():
    file = request.files['file']
    file.save('./build/temp2.pdf')
    print(file)
    return "done"

def parse_text(text):
    # Customize this function based on your PDF structure
    content_types = {
        "question": 'Question #',
        "options": [
            'A.',
            'B.',
            'C.',
            'D.',
            'E.',
            'F.',
            'G.',
            'H.',
            'I.'
        ],
        "correct": "Correct Answer: "
    }

    questions = []
    blocks = text.split('\n\n')

    for block in blocks:
        lines = block.split('\n')
        
        question = {
            "question": '',
            "options": [],
            "correct": ''
        }

        for i in range(0, len(lines)):
            li = lines[i]
            #question
            if content_types['question'] in li:
                question = {
                    "question": '',
                    "options": [],
                    "correct": ''
                }
                i = i+1
                question['question'] = lines[i]
                continue
            #correct answer
            elif content_types['correct'] in li:
                correct_answer = li.split(content_types['correct'])[-1]
                question['correct'] = correct_answer
                continue
            #options
            for opt in content_types['options']:
                if opt in li:
                    question['options'].append(li)
        questions.append(question)
    return questions

if __name__ == "__main__":
    app.run(debug=True)