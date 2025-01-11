const BEARER_TOKEN = process.env.BEARER_TOKEN
const SEARCH_URL = process.env.SEARCH_URL

export async function searchTweets(query: string) {
  try {
    const response = await fetch(`${SEARCH_URL}?query=${encodeURIComponent(query)}`, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error searching tweets:", error)
    return null
  }
}

