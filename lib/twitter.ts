import { TwitterApi } from 'twitter-api-v2';

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY || '',
  appSecret: process.env.TWITTER_API_SECRET || '',
  accessToken: process.env.TWITTER_ACCESS_TOKEN || '',
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET || '',
});

export const getTwitterData = async (companyName: string) => {
  try {
    if (!process.env.TWITTER_API_KEY) {
      console.warn('Twitter API credentials not found');
      return null;
    }

    const searchResults = await client.v2.usersByUsernames([companyName], {
      'user.fields': ['public_metrics'],
    });

    if (!searchResults.data || searchResults.data.length === 0) {
      return null;
    }

    const user = searchResults.data[0];
    
    return {
      followers_count: user.public_metrics?.followers_count || null,
      likes_count: user.public_metrics?.like_count || null,
      tweets_count: user.public_metrics?.tweet_count || null,
    };
  } catch (error) {
    console.error('Error fetching Twitter data:', error);
    return null;
  }
};

export const searchTweets = async (query: string) => {
  // Your logic to search tweets based on the query
};

