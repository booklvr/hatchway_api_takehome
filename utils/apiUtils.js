import axios from 'axios'

/* -----------------------------------------------------
// hatchwayAPIRequestFromTags
// --------------------------
// * make a get request to the hatchway api 
// * get a list of posts from the hatchway api
// --------------------------------------------
// var: tags
// return: posts array
------------------------------------------------------ */
export const hatchwaysAPIRequestFromTags = async (tags) => {
  // determine tag list

  // check for multiple tags separated by comma
  if (tags.indexOf(',') !== -1) {
    // we have multiple tags

    let tagList = tags.split(',')

    // create list of axios promises
    let axiosPromises = tagList.map((tag) =>
      axios.get(`http://hatchways.io/api/assessment/blog/posts?tag=${tag}`)
    )

    //concurrently call all axios promises with Promise.all
    try {
      const results = await Promise.all(axiosPromises)

      // map axios result into array with posts from each tag
      const posts = results.map((result) => result.data.posts)

      // flatten arrays into single array
      const flatPosts = posts.flat()

      // remove duplicates from flattened array
      // credit to: https://yagisanatode.com/2021/07/03/get-a-unique-list-of-objects-in-an-array-of-object-in-javascript/
      const uniquePosts = [
        ...new Map(flatPosts.map((item) => [item['id'], item])).values(),
      ]

      return uniquePosts
    } catch (error) {
      throw Error('API ERROR')
    }
  } else {
    // we have only a single tag
    try {
      let result = await axios.get(
        `http://hatchways.io/api/assessment/blog/posts?tag=${tags}`
      )
      let posts = result.data.posts

      return posts
    } catch (error) {
      throw Error('API ERROR')
    }
  }
}

/* -----------------------------------------------------
// sortPosts
// ---------
// * takes in the array of unique posts and returns a sorted array, by the sortBy
// var: sortBy, direction, data
// -----------------------------
// ** sortBy [id, likes, popularity, reads]
// ** direction: [asc, desc]
// ** data: - list of unique posts
// -------------------------------
// return: sorted list of unique posts
-----------------------------------------------------*/
export const sortPosts = (sortBy, direction, posts) => {
  const sortedPosts = posts.sort((a, b) => {
    let x = a[sortBy]
    let y = b[sortBy]

    // 1) compare values
    // 2) check direction
    return (x < y ? -1 : x > y ? 1 : 0) * (direction === 'asc' ? 1 : -1)
  })
  return sortedPosts
}

/* -----------------------------------------------------
// checkQueryString
// --------------------------
// * validate the query string contains the parameters 
// sortBy & direction & tags
// -------------------
// * if these parameters are not present set defaults: 
// ** sortBy: id
// ** direction: asc
// ------------------
// * if tags are not present return error
// ---------------------------------------
// var queryString: {
  sortBy: [likes, reads, popularity, id]
  direction: [asc, desc]
  tags: [design, startups, tech, culture, health, science, politics, history]
}
// --------------------------------------------------------------------------
// return: {
  queryStringError,
  sortBy,
  direction,
  tags
}
------------------------------------------------------ */
export const checkQueryString = ({ sortBy, direction, tags }) => {
  // -----------------------------------------------------
  // tag error handling ----------------------------------
  if (!tags) {
    return {
      queryStringError: 'tags parameter is missing',
    }
  }

  // -----------------------------------------------------
  // sortBy error handling -------------------------------
  const sortByFields = ['id', 'reads', 'likes', 'popularity']
  // if no sortBy query parameter was provided
  if (!sortBy) {
    // set 'id' as the default sortBy parameter
    sortBy = 'id'

    // if sortBy query parameter is not included in list of sortByFields
  } else if (sortByFields.indexOf(sortBy) === -1) {
    // if sortByFields
    return {
      queryStringError: 'sortBy parameter is invalid',
    }
  }

  // -----------------------------------------------------
  // direction error handling -------------------------------
  const directionFields = ['asc', 'desc']
  // if no sortBy query parameter was provided
  if (!direction) {
    // set 'id' as the default sortBy parameter
    direction = 'asc'

    // if sortBy query parameter is not included in list of directionFields
  } else if (directionFields.indexOf(direction) === -1) {
    // if sortByFields
    return {
      queryStringError: 'direction parameter is invalid',
    }
  }

  return {
    sortBy,
    direction,
    tags,
  }
}
