import flask
from flask import Flask, request, jsonify
import google.generativeai as genai
import json
import os
from datetime import datetime
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure the API key for Google Generative AI
genai.configure(api_key="AIzaSyB1d-gwppbhFgB751VmLH8ks24UmZgijSA")
model = genai.GenerativeModel("gemini-1.5-flash")

@app.route('/analyze_company', methods=['GET'])
def analyze_company():
    try:
        name = request.args.get('name')
        analysis_type = request.args.get('type', 'summary')

        if not name:
            return jsonify({"error": "Company name is required"}), 400

        # Generate analysis prompt based on type
        prompt = generate_prompt(name, analysis_type)
        response = model.generate_content(prompt)
        
        return jsonify({
            "success": True,
            "analysis": response.text
        })
    except Exception as e:
        print(f"Error in analyze_company: {str(e)}")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

def generate_prompt(company_name: str, analysis_type: str) -> str:
    prompts = {
        'summary': f"Provide a concise business summary of {company_name}, including their market position, main products/services, and recent performance.",
        'competitors': f"Analyze {company_name}'s main competitors and their competitive advantages/disadvantages.",
        'improvements': f"Suggest specific strategic improvements for {company_name} based on current market trends.",
        'swot': f"Provide a detailed SWOT analysis for {company_name}.",
        'trends': f"Analyze current market trends affecting {company_name} and their potential impact.",
        'dataset': f"Provide comprehensive business analysis of {company_name} including market position, performance metrics, and key strengths."
    }
    return prompts.get(analysis_type, prompts['summary'])

if __name__ == '__main__':
    app.run(debug=True, port=5000)