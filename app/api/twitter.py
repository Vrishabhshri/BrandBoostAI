import tweepy

# Replace with your own credentials
api_key = 'biUmBhZcrK5Os6YEMRFYVFQrD'
api_secret_key = 'FQG9hFCddOlqTPwp12Y2RYiybkF0MojfdbW5jjkKRkaK468mVH'
access_token = '1872808860408528896-zgSwPxyrPUbLAUWguJQLscBHdUECaL'
access_token_secret = 'R3RUfmvxpCJxfy6EJKzs1UvFExIRODBIuZBgZwSPdgrm4'

# Authenticate to Twitter
auth = tweepy.OAuth1UserHandler(api_key, api_secret_key, access_token, access_token_secret)
api = tweepy.API(auth)

# Check authentication
try:
    api.verify_credentials()
    print("Authentication OK")
except tweepy.errors.TweepyException as e:
    print(f"Error during authentication: {e}")
    exit()

# Ask the user for input
user_input = input("Enter 'me' to get your info or a username to fetch their info: ").strip()

try:
    if user_input.lower() == "me":
        user = api.verify_credentials()  # Fetch authenticated user details
    else:
        user = api.get_user(screen_name=user_input)  # Fetch details of the specified user

    print(f"User: {user.name}")
    print(f"Screen Name: {user.screen_name}")
    print(f"Description: {user.description}")
    print(f"Followers: {user.followers_count}")
    print(f"Following: {user.friends_count}")
    print(f"Created At: {user.created_at}")
except tweepy.errors.TweepyException as e:
    print(f"Error fetching user details: {e}")
