import flask
from flask import Flask, request, jsonify
import google.generativeai as genai
import json
import os
from datetime import datetime

# Configure the API key for Google Generative AI
genai.configure(api_key="AIzaSyB1d-gwppbhFgB751VmLH8ks24UmZgijSA")
model = genai.GenerativeModel("gemini-1.5-flash")

# Define the JSON data for the companies
companies_data = {
    "companies": [
        {
            "name": "uniqlo",
            "instagram": [
                {
                    "followers": 1200000,
                    "increase_percentage": 2.2,
                    "decrease_percentage": 1.9,
                    "hashtags": ["#uniqlo", "#fashion", "#style", "#streetwear", "#comfort"],
                    "content": "Discover the latest fall collection! Stylish, comfortable, and affordable fashion for everyone.",
                    "date_added": "2024-11-24"
                },
                {
                    "followers": 1226000,
                    "increase_percentage": 2.1,
                    "decrease_percentage": 1.8,
                    "hashtags": ["#uniqlo", "#sustainablefashion", "#autumnstyle", "#trendy", "#modernlook"],
                    "content": "Fall fashion is here! Shop our eco-friendly collection made from sustainable materials.",
                    "date_added": "2024-11-24"
                }
            ],
            "facebook": [
                {
                    "followers": 2000000,
                    "increase_percentage": 2.0,
                    "decrease_percentage": 1.7,
                    "hashtags": ["#uniqlo", "#fashion", "#sustainability", "#minimalist", "#trendy"],
                    "content": "Join us in supporting sustainable fashion. Check out our eco-friendly collections!",
                    "date_added": "2024-11-24"
                },
                {
                    "followers": 2040000,
                    "increase_percentage": 2.0,
                    "decrease_percentage": 1.8,
                    "hashtags": ["#uniqlo", "#fashionforall", "#everybodyisbeautiful", "#inclusivefashion", "#affordable"],
                    "content": "We believe fashion is for everyone. Find the perfect fit for your style!",
                    "date_added": "2024-11-24"
                }
            ]
        },
        {
            "name": "nike",
            "instagram": [
                {
                    "followers": 2500000,
                    "increase_percentage": 2.2,
                    "decrease_percentage": 1.9,
                    "hashtags": ["#nike", "#justdoit", "#sportstyle", "#fitfam", "#motivation"],
                    "content": "Unleash your inner athlete with the latest in Nike sportswear and gear.",
                    "date_added": "2024-11-24"
                },
                {
                    "followers": 2555000,
                    "increase_percentage": 2.1,
                    "decrease_percentage": 1.8,
                    "hashtags": ["#nike", "#running", "#trainhard", "#fitnessjourney", "#sportswear"],
                    "content": "Run faster, train harder, and be stronger with Nike’s performance apparel.",
                    "date_added": "2024-11-24"
                }
            ],
            "facebook": [
                {
                    "followers": 4000000,
                    "increase_percentage": 2.1,
                    "decrease_percentage": 1.8,
                    "hashtags": ["#nike", "#justdoit", "#sportswear", "#workout", "#fitnessgoals"],
                    "content": "Achieve your fitness goals with Nike’s latest collection of workout gear.",
                    "date_added": "2024-11-24"
                },
                {
                    "followers": 4080000,
                    "increase_percentage": 2.0,
                    "decrease_percentage": 1.7,
                    "hashtags": ["#nike", "#crossfit", "#powerlifting", "#strength", "#athleticwear"],
                    "content": "Strength meets comfort with our new CrossFit gear. Train harder, lift stronger.",
                    "date_added": "2024-11-24"
                }
            ]
        }
    ]
}

# Initialize Flask app
app = Flask(__name__)

def generate_company_dataset(company_name: str):
    dataset_prompt = f"""
    Create a comprehensive JSON dataset for {company_name} including:
    - Social media statistics (followers, engagement rates across platforms)
    - Key performance indicators (revenue, growth rate, market share)
    - Market positioning
    - Customer demographics
    - Brand metrics
    - Recent campaigns and their performance
    
    Format the response as a clean JSON object with organized, realistic metrics.
    """
    
    try:
        response = model.generate_content(dataset_prompt)
        
        # Create a timestamp for the filename
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"dataset_{company_name.lower()}_{timestamp}.json"
        filepath = os.path.join("app/dashboard/api/analyses", filename)
        
        # Ensure the directory exists
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        
        # Save the response to a file
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(response.text)
            
        return {
            "success": True,
            "filepath": filepath,
            "response": response.text
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

def generate_company_analysis(company_name: str, analysis_type: str):
    analysis_prompts = {
        "summary": f"Provide a concise summary of {company_name}'s current market position and overall performance.",
        "competitors": f"Analyze {company_name}'s main competitors and competitive advantages/disadvantages.",
        "improvements": f"Suggest specific strategic improvements for {company_name} based on current market trends.",
        "swot": f"Provide a detailed SWOT analysis for {company_name}.",
        "trends": f"Analyze current trends affecting {company_name} and their potential impact."
    }
    
    if analysis_type not in analysis_prompts:
        return {
            "success": False,
            "error": "Invalid analysis type"
        }
    
    try:
        response = model.generate_content(analysis_prompts[analysis_type])
        return {
            "success": True,
            "response": response.text
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

def interactive_input():
    while True:
        company_name = input("Enter the company name: ").lower()
        
        # First, generate and show the dataset
        print("\nGenerating company dataset...")
        dataset_result = generate_company_dataset(company_name)
        
        if dataset_result["success"]:
            print(f"\nCompany dataset has been saved to: {dataset_result['filepath']}")
            print("\nDataset Result:")
            print(dataset_result["response"])
            
            # After showing the dataset, offer analysis options
            while True:
                print("\nAvailable analysis options:")
                print("1. Summary")
                print("2. Competitor Analysis")
                print("3. Improvement Suggestions")
                print("4. SWOT Analysis")
                print("5. Market Trends")
                print("6. Search new company")
                print("7. Exit")
                
                choice = input("\nEnter your choice (1-7): ")
                
                if choice == "6":
                    break
                elif choice == "7":
                    return
                elif choice in ["1", "2", "3", "4", "5"]:
                    analysis_types = {
                        "1": "summary",
                        "2": "competitors",
                        "3": "improvements",
                        "4": "swot",
                        "5": "trends"
                    }
                    
                    analysis_result = generate_company_analysis(company_name, analysis_types[choice])
                    if analysis_result["success"]:
                        print("\nAnalysis Result:")
                        print(analysis_result["response"])
                    else:
                        print(f"\nError: {analysis_result['error']}")
                else:
                    print("\nInvalid choice. Please try again.")
        else:
            print(f"Error generating dataset: {dataset_result['error']}")

# API endpoint to search for a company by name
@app.route('/search_company', methods=['GET'])
def search_company():
    company_name = request.args.get('name', '').lower()

    company = next((comp for comp in companies_data["companies"] if comp["name"].lower() == company_name), None)

    if company:
        return jsonify(company)
    else:
        return jsonify({"error": "Company not found."}), 404

# Update the API endpoint
@app.route('/analyze_company', methods=['GET'])
def analyze_company():
    company_name = request.args.get('name', '').lower()
    analysis_type = request.args.get('type', 'dataset').lower()
    
    if not company_name:
        return jsonify({"error": "Company name is required"}), 400
    
    if analysis_type == 'dataset':
        result = generate_company_dataset(company_name)
    else:
        result = generate_company_analysis(company_name, analysis_type)
    
    if result["success"]:
        return jsonify({
            "message": "Analysis generated successfully",
            "filepath": result.get("filepath"),  # Only present for dataset
            "analysis": result["response"]
        })
    else:
        return jsonify({"error": result["error"]}), 500

# Start the Flask app
if __name__ == '__main__':
    # You can choose to start the interactive input if you prefer terminal interaction
    interactive_input()

    # Flask app will run as well
    app.run(debug=True)