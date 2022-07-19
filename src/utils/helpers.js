export function formatDate(timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function formatTweet(tweet, author, authedUser, parentTweet) {
  if (tweet) {
    const { id, likes, replies, text, timestamp } = tweet
    const { name, avatarURL } = author

    return {
      name,
      id,
      timestamp,
      text,
      avatar: avatarURL,
      likes: likes ? likes.length : 0,
      replies: replies ? replies.length : 0,
      hasLiked: likes ? likes.includes(authedUser) : false,
      parent: !parentTweet ? null : {
        author: parentTweet.author,
        id: parentTweet.id,
      }
    }
  }
}