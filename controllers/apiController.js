import {
  checkQueryString,
  hatchwaysAPIRequestFromTags,
  sortPosts,
} from '../utils/apiUtils.js'

export const hatchwayGetRequest = async (req, res) => {
  const { queryStringError, sortBy, direction, tags } = checkQueryString(
    req.query
  )

  if (queryStringError) {
    return res.status(400).json({
      error: queryStringError,
    })
  }

  let posts = null
  try {
    posts = await hatchwaysAPIRequestFromTags(tags)
  } catch (error) {
    return res.status(400).json({
      error: 'API ERROR',
    })
  }
  const sortedPosts = sortPosts(sortBy, direction, posts)

  return res.status(200).json(sortedPosts)
}
