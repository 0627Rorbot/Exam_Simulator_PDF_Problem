# from flask import Blueprint, jsonify, request
# import json
# import pdfplumber

# bp = Blueprint('questions', __name__)

# @app.route('/api/questions', methods=['GET'])
# def extract_questions(pdf_path, output_json):
#     questions = []
#     with pdfplumber.open(pdf_path) as pdf:
#         for page in pdf.pages:
#             text = page.extract_text()
#             if text:
#                 questions.extend(parse_text(text))
    
#     with open(output_json, 'w', encoding='utf-8') as f:
#         json.dump(questions, f, ensure_ascii=False, indent=4)

# def parse_text(text):
#     # Customize this function based on your PDF structure
#     questions = []
#     blocks = text.split('\n\n')
#     for block in blocks:
#         lines = block.split('\n')
#         if len(lines) > 2:
#             question = {
#                 "question": lines[0],
#                 "options": lines[1:-1],
#                 "answer": lines[-1]
#             }
#             questions.append(question)
#     return questions
