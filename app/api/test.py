import requests
import json
import os
from datetime import datetime

# Set your bearer token
bearer_token = 'AAAAAAAAAAAAAAAAAAAAAAUgxwEAAAAAguiNIGTGWHqMKlecAjOEjWBOXMY%3DKDuuRX91dEmn1ip0b9AHtZQmwvSOAeUe9XHAOXlWtdoQ0uo6qs'
search_url = "https://api.twitter.com/2/tweets/search/recent"

# Updated query parameters matching your URL
query_params = {
    'query': 'Target',
    'tweet.fields': 'author_id,created_at,in_reply_to_user_id,possibly_sensitive,text',
    'place.fields': 'country_code,name'
}

def bearer_oauth(r):
    """
    Method required by bearer token authentication.
    """
    r.headers["Authorization"] = f"Bearer {bearer_token}"
    r.headers["User-Agent"] = "v2RecentSearchPython"
    return r

def connect_to_endpoint(url, params):
    """
    Connect to Twitter API endpoint and handle the response
    """
    response = requests.get(url, auth=bearer_oauth, params=params)
    print(f"Response status: {response.status_code}")

    if response.status_code == 429:
        raise Exception("Rate limit exceeded: Try again later.")
    elif response.status_code != 200:
        raise Exception(response.status_code, response.text)
    
    return response.json()

def scan_directory(directory_path, file_extension=".json"):
    """
    Scans a directory for files with a specific extension and processes them.
    """
    matching_files = []
    
    # Check if the directory exists
    if not os.path.exists(directory_path):
        print(f"The directory {directory_path} does not exist.")
        return matching_files

    # Iterate through the files in the directory
    for root, dirs, files in os.walk(directory_path):
        for file in files:
            if file.endswith(file_extension):
                file_path = os.path.join(root, file)
                matching_files.append(file_path)

    return matching_files

def display_json_content(file_path):
    """
    Displays the content of a JSON file in a readable format.
    """
    try:
        with open(file_path, 'r') as f:
            data = json.load(f)
        print("\nContent of the file:")
        print(json.dumps(data, indent=4))
    except Exception as e:
        print(f"An error occurred while reading the file: {e}")

def user_selection_loop(directory):
    """
    Allows the user to select and view JSON files in a loop.
    """
    while True:
        json_files = scan_directory(directory)
        if not json_files:
            print(f"No JSON files found in {directory}. Exiting loop.")
            break

        print("\nAvailable JSON files:")
        for idx, file in enumerate(json_files):
            print(f"{idx + 1}. {os.path.basename(file)}")

        print("\nEnter the number corresponding to the file you want to view, or 'q' to quit.")
        choice = input("Your choice: ").strip()

        if choice.lower() == 'q':
            print("Exiting...")
            break
        elif choice.isdigit() and 1 <= int(choice) <= len(json_files):
            selected_file = json_files[int(choice) - 1]
            print(f"\nDisplaying content of: {selected_file}")
            display_json_content(selected_file)
        else:
            print("Invalid choice. Please try again.")

def main():
    try:
        # Get tweets
        json_response = connect_to_endpoint(search_url, query_params)

        # Pretty print the response
        print("\nRecent tweets about Amazon:")
        print(json.dumps(json_response, indent=4, sort_keys=True))

        # Save to file with timestamp
        directory = "tweets"  # Directory to save files
        os.makedirs(directory, exist_ok=True)
        timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
        filename = os.path.join(directory, f'amazontweets{timestamp}.json')

        with open(filename, 'w') as f:
            json.dump(json_response, f, indent=4)
        print(f"\nTweets saved to {filename}")

        # Start the user selection loop
        print("\nStarting the JSON file viewer...")
        user_selection_loop(directory)
    
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == '__main__':
    main()
