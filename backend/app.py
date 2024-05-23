from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS

# from routes import register_routes 
import json
import random
import pdfplumber

app = Flask(__name__, static_folder='../backend/build', static_url_path='')
CORS(app)


@app.route('/api/questions', methods=['GET'])
def get_questions():
    pdf_path = './build/temp2.pdf'

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

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=6001)