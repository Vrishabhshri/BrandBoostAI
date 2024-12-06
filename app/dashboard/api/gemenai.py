from flask import Flask, request, jsonify
import google.generativeai as genai
import json

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

# Function to handle user input from the terminal in an infinite loop
def interactive_input():
    while True:  # Infinite loop to continuously prompt for user input
        company_name = input("Enter the company name: ").lower()
        user_request = input("What would you like to know? (e.g., 'summary', 'advice to improve', etc.): ").lower()

        # Search for the company in the data
        company = next((comp for comp in companies_data["companies"] if comp["name"].lower() == company_name), None)

        if company:
            # Generate a response based on the request
            prompt = f"Company: {company_name.capitalize()}\nRequest: {user_request.capitalize()}"
            print(f"Prompt to Gemini: {prompt}")

            # Call Gemini model to generate a response
            response = model.generate_content(prompt)
            print(f"Gemini Response: {response.text}")
        else:
            print("Company not found.")
        
        # Option to continue or exit the loop
        continue_input = input("Do you want to search for another company? (yes/no): ").lower()
        if continue_input != "yes":
            print("Exiting the interactive input loop.")
            break  # Exit the loop if the user chooses 'no'

# API endpoint to search for a company by name
@app.route('/search_company', methods=['GET'])
def search_company():
    company_name = request.args.get('name', '').lower()

    company = next((comp for comp in companies_data["companies"] if comp["name"].lower() == company_name), None)

    if company:
        return jsonify(company)
    else:
        return jsonify({"error": "Company not found."}), 404

# Start the Flask app
if __name__ == '__main__':
    # You can choose to start the interactive input if you prefer terminal interaction
    interactive_input()

    # Flask app will run as well
    app.run(debug=True)
