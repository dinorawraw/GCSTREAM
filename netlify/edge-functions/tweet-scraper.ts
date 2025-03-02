import { Context } from '@netlify/edge-functions';

export default async (request: Request, context: Context) => {
  try {
    const url = new URL(request.url);
    const tweetUrl = url.searchParams.get('url');

    if (!tweetUrl) {
      return new Response('Tweet URL is required', { status: 400 });
    }

    // Extract tweet ID from URL
    const tweetId = tweetUrl.split('/').pop()?.split('?')[0];
    
    if (!tweetId) {
      return new Response('Invalid tweet URL', { status: 400 });
    }

    // Twitter API v2 endpoint
    const twitterApiUrl = `https://api.twitter.com/2/tweets/${tweetId}?expansions=author_id&user.fields=profile_image_url`;
    
    const response = await fetch(twitterApiUrl, {
      headers: {
        'Authorization': `Bearer ${context.env.TWITTER_BEARER_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Twitter API error: ${response.statusText}`);
    }

    const twitterData = await response.json();
    
    return new Response(JSON.stringify({
      content: twitterData.data.text,
      profilePicture: twitterData.includes?.users?.[0]?.profile_image_url
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    console.error('Tweet fetch error:', error);
    return new Response('Failed to fetch tweet', { 
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}