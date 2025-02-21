import os
import json
import requests
import google.generativeai as genai
from datetime import datetime

# Configure Gemini AI
genai.configure(api_key="AIzaSyB1d-gwppbhFgB751VmLH8ks24UmZgijSA")
model = genai.GenerativeModel("gemini-1.5-flash")

# Bearer token and Twitter API setup
BEARER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAAAUgxwEAAAAAguiNIGTGWHqMKlecAjOEjWBOXMY%3DKDuuRX91dEmn1ip0b9AHtZQmwvSOAeUe9XHAOXlWtdoQ0uo6qs'
SEARCH_URL = "https://api.twitter.com/2/tweets/search/recent"

# Authenticate to Twitter API
def bearer_oauth(r):
    r.headers["Authorization"] = f"Bearer {BEARER_TOKEN}"
    r.headers["User-Agent"] = "v2RecentSearchPython"
    return r

# Search for tweets
def search_twitter(query):
    params = {"query": query, "tweet.fields": "author_id,created_at", "max_results": 10}
    response = requests.get(SEARCH_URL, auth=bearer_oauth, params=params)
    if response.status_code != 200:
        print(f"Twitter API Error: {response.status_code} - {response.text}")
        return None
    return response.json()

# Save JSON data to a file
def save_json(data, folder_path, filename):
    os.makedirs(folder_path, exist_ok=True)
    file_path = os.path.join(folder_path, filename)
    with open(file_path, 'w') as f:
        json.dump(data, f, indent=4)
    print(f"\nData saved to {file_path}")

# Scan folder for JSON files
def scan_folder(folder_path):
    return [f for f in os.listdir(folder_path) if f.endswith('.json')]

# Generate a prompt for Gemini
def generate_prompt(company_name, analysis_type):
    prompts = {
        'summary': f"Provide a concise business summary of {company_name}, including their market position, main products/services, and recent performance.",
        'competitors': f"Analyze {company_name}'s main competitors and their competitive advantages/disadvantages.",
        'improvements': f"Suggest specific strategic improvements for {company_name} based on current market trends.",
        'swot': f"Provide a detailed SWOT analysis for {company_name}.",
        'trends': f"Analyze current market trends affecting {company_name} and their potential impact.",
        'dataset': f"Provide comprehensive business analysis of {company_name}, including market position, performance metrics, and key strengths."
    }
    return prompts.get(analysis_type, prompts['summary'])

# Interact with Gemini AI
def interact_with_gemini(prompt):
    print("\nGenerating response from Gemini...")
    try:
        response = model.generate_content(prompt)
        print("\nGemini response:")
        print(response.text)
    except Exception as e:
        print(f"Error: {e}. Please check the API call or library version.")

# Analyze a saved file with AI
def analyze_saved_file(file_path, analysis_type):
    try:
        with open(file_path, 'r') as f:
            file_content = json.load(f)
            company_name = file_content.get('company_name', 'Unknown')
            prompt = generate_prompt(company_name, analysis_type)
            interact_with_gemini(prompt)
    except Exception as e:
        print(f"Error analyzing file: {e}")

# Main menu
def main_menu(folder_path):
    while True:
        print("\nMain Menu:")
        print("1. View Saved Files")
        print("2. Get AI Analysis")
        print("3. Search for Company on Twitter")
        print("4. Quit")
        choice = input("Choose an option: ").strip()

        if choice == '1':
            files = scan_folder(folder_path)
            if not files:
                print("\nNo saved files found.")
            else:
                print("\nSaved Files:")
                for idx, file in enumerate(files, start=1):
                    print(f"{idx}. {file}")
                try:
                    file_choice = int(input("\nSelect a file by number (or 0 to go back): "))
                    if file_choice == 0:
                        continue
                    selected_file = os.path.join(folder_path, files[file_choice - 1])
                    with open(selected_file, 'r') as f:
                        file_content = json.load(f)
                        print("\nFile Content:")
                        print(json.dumps(file_content, indent=4))
                except (ValueError, IndexError):
                    print("Invalid selection. Please try again.")
                except json.JSONDecodeError as e:
                    print(f"Error loading JSON file: {e}")

        elif choice == '2':
            print("\nAI Analysis Options:")
            print("1. Analyze saved files")
            print("2. Search and analyze new company")
            analysis_choice = input("Choose an option: ").strip()

            if analysis_choice == '1':
                files = scan_folder(folder_path)
                if not files:
                    print("\nNo saved files found.")
                    continue
                print("\nSaved Files:")
                for idx, file in enumerate(files, start=1):
                    print(f"{idx}. {file}")
                try:
                    file_choice = int(input("\nSelect a file by number (or 0 to go back): "))
                    if file_choice == 0:
                        continue
                    selected_file = os.path.join(folder_path, files[file_choice - 1])
                    analysis_type = input("\nEnter analysis type (summary, competitors, improvements, swot, trends, dataset): ").strip().lower()
                    analyze_saved_file(selected_file, analysis_type)
                except (ValueError, IndexError):
                    print("Invalid selection. Please try again.")
            elif analysis_choice == '2':
                company_name = input("\nEnter the company name for analysis: ").strip()
                analysis_type = input("\nEnter analysis type (summary, competitors, improvements, swot, trends, dataset): ").strip().lower()
                prompt = generate_prompt(company_name, analysis_type)
                interact_with_gemini(prompt)

        elif choice == '3':
            query = input("\nEnter the company name or keyword to search on Twitter: ").strip()
            tweets = search_twitter(query)
            if tweets:
                filename = f"{query.replace(' ', '_')}_tweets_{datetime.now().strftime('%Y%m%d%H%M%S')}.json"
                save_json(tweets, folder_path, filename)

        elif choice == '4':
            print("\nExiting the program. Goodbye!")
            break

        else:
            print("\nInvalid choice. Please try again.")

if __name__ == '__main__':
    folder_path = './public/'
    main_menu(folder_path)
