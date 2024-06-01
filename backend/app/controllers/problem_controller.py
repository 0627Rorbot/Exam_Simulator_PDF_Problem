from app.models import get_problem_collection
from bson import json_util, ObjectId
from flask import Flask, request, jsonify
from datetime import datetime
import pdfplumber
import random
import json


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


# author:    admin
# create one problem info and save json
# return true or false
def save_problems(title):
    def save_json(jsonfilename):
        local_url = "./build/pdf/temp"

        # read data from pdf
        with pdfplumber.open(local_url) as pdf:
            questions = []
            for page in pdf.pages:
                text = page.extract_text()
                # if text is exits in pdf, do parse_text
                if text:
                    questions.extend(parse_text(text))

            # if questions is 0, return true, else return false.
            if len(questions) != 0:
                save_file(f"./build/json/{jsonfilename}", questions)
                return True
        return False

    # get formated problems from text in one page
    def parse_text(text):
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
    
    # save one json problem in local from pdf file
    def save_file(l_url, data):
        print(l_url, data)
        with open(l_url, "w") as file:
            data = {"data": data}
            json.dump(data, file)
            file.close()
        return 
    # is exists problem with same title 
    problem_collection = get_problem_collection()
    probs_with_title_cnt = problem_collection.count_documents({"title": title})
    if probs_with_title_cnt > 0:
        return {"status": False, "msg": "Same Problem is Exists."}
    
    filename = get_random_filename()
    problem_collection.insert_one({"title": title, "filename": filename})
    
    if save_json(filename) == True:
        return {"status": True, "msg": "Insert Problem Successfully."}
    return {"status": False, "msg": "Insert Problem Failes."}


# author:   admin
# delete one problem info and delete json
def delete_problem(problem_id):
    problem_collection = get_problem_collection()
    problem_collection.delete_one({"_id": ObjectId(problem_id)})


# get all problems infos
def get_problems_infos():
    problem_collection = get_problem_collection()
    return list(problem_collection.find())

# get exam problem for student
# params:   problem_id, problem_cnt
# return:   json problems
def get_problems(problem_id, problem_cnt):
    # get one problem info from db
    def get_problem_info(problem_id):
        problem_collection = get_problem_collection()
        return problem_collection.find_one({"_id": ObjectId(problem_id)})

    # get one problem array from local file
    def get_problems_file(filename):
        local_url = f"../build/{filename}"
        with open(local_url, "r") as file:
            data = file.read()
            file.close()
        return data
    
    prob_info = get_problem_info(problem_id)
    db_filename = prob_info["filename"]
    db_totalcnt = len(prob_info)
    
    prob_list = get_problems_file(db_filename)
    if db_totalcnt < problem_cnt:
        return parse_json([])
    else:
        problem_nums = get_random_array(db_totalcnt, problem_cnt)
        i = 0
        final_problems = []
        for num in problem_nums:
            final_problems.append(prob_list[num])
        return parse_json(final_problems)

#get random filename
def get_random_filename():
    filename = datetime.now().strftime("%Y%m%d%H%M%S%f")
    return filename

# get json from data
def parse_json(data):
    return json.loads(json_util.dumps(data))

#get random array from total and cnt
def get_random_array(total, cnt):
    return random.sample(range(1, total), cnt)