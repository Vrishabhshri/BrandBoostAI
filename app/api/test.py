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
    Add authentication headers to a Twitter API request.
    
    Updates the request by setting the 'Authorization' header with the bearer token and the
    'User-Agent' header to the required value for Twitter API authentication. Returns the
    modified request.
    """
    r.headers["Authorization"] = f"Bearer {bearer_token}"
    r.headers["User-Agent"] = "v2RecentSearchPython"
    return r


def connect_to_endpoint(url, params):
    """
        Sends a GET request to a Twitter API endpoint and returns its JSON response.
    
        This function uses bearer token authentication to query the specified URL with the
        provided parameters. It prints the HTTP status code and raises an exception if the
        rate limit is exceeded (HTTP 429) or if the response status code is not 200.
    
        Args:
            url: The Twitter API endpoint URL.
            params: A dictionary of query parameters for the request.
    
        Returns:
            A dictionary containing the JSON response from the API.
    
        Raises:
            Exception: If the rate limit is exceeded or the response status code is not 200.
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
    Scans a directory recursively for files with a specified extension.
    
    Traverses the given directory and its subdirectories to collect file paths whose names end
    with the specified extension. If the directory does not exist, the function prints a message
    and returns an empty list.
    
    Args:
        directory_path: The path of the directory to search.
        file_extension: The file extension to filter by (default is ".json").
    
    Returns:
        A list of file paths that have filenames ending with the specified extension.
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
    Displays the content of a JSON file in a formatted manner.
    
    This function attempts to open and load the JSON file specified by file_path. It then prints the content
    as pretty-printed JSON with an indentation of 4 spaces. If an error occurs during file reading, an error message
    is printed.
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
    Prompts the user to select and display JSON file contents from a directory.
    
    This function continuously lists JSON files found in the specified directory and
    asks the user to choose a file by its corresponding number, or to quit by entering 'q'.
    When a valid selection is made, the function displays the file's content in a formatted
    manner. If no JSON files are present, the loop terminates.
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
    """
    Fetches recent Amazon tweets, saves the result, and initiates the file viewer.
    
    This function retrieves recent tweets about Amazon using the Twitter API, pretty
    prints the JSON response, and saves it to a timestamped file in a 'tweets' directory.
    It then starts a user selection loop to enable viewing of saved JSON files. Any errors
    encountered during the process are caught and printed.
    """
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
