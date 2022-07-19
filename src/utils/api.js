import {
  _getUsers,
  _getTweets,
  _saveLikeToggle,
  _saveTweet,
} from './_DATA.js'

export async function getInitialData() {
  const [users, tweets] = await Promise.all([
    _getUsers(),
    _getTweets(),
  ])
  return ({
    users,
    tweets,
  })
}

export function saveLikeToggle(info) {
  return _saveLikeToggle(info)
}

export function saveTweet(info) {
  return _saveTweet(info)
}