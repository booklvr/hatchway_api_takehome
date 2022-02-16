import supertest from 'supertest'
import chai, { use } from 'chai'
import express from 'express'
import apiRouter from '../routes/apiRoutes.js'
import chaiSorted from 'chai-sorted'

chai.use(chaiSorted)

const app = express()

app.use('/api', apiRouter)

const request = supertest(app)
const expect = chai.expect
const should = chai.should()

//return object {success: true}
describe('GET /api/ping', function () {
  it('returns {success: true}', async function () {
    const response = await request.get(`/api/ping`)

    expect(response.body.success).to.eql(true)
    expect(response.status).to.eql(200)
  })
})

// no tag query parameter
describe('GET /api/posts', function () {
  it('fails because there is no tag query parameter', async function () {
    const response = await request.get(`/api/posts`)

    expect(response.status).to.eql(400)
    expect(response.body.error).to.eql('tags parameter is missing')
  })
})

// invalid SortBy query parameter
describe('GET /api/posts?tags=history&sortBy=test', function () {
  it('fails because sortBy parameter is invalid', async function () {
    const response = await request.get(`/api/posts?tags=history&sortBy=test`)

    expect(response.status).to.eql(400)
    expect(response.body.error).to.eql('sortBy parameter is invalid')
  })
})

// invalid direction query parameter
describe('GET /api/posts?tags=history&direction=test', function () {
  it('fails because direction parameter is invalid', async function () {
    const response = await request.get(`/api/posts?tags=history&direction=test`)

    expect(response.status).to.eql(400)
    expect(response.body.error).to.eql('direction parameter is invalid')
  })
})

// correct response should return an object with posts property if provided single tags parameter
describe('GET /api/posts?tags=history', function () {
  it('returns posts array after being provided with single tags query parameter', async function () {
    const response = await request.get(`/api/posts?tags=history`)

    expect(response.status).to.eql(200)
    response.body.should.be.an('object')
    response.body.should.have.property('posts')
  })
})

// response return object with posts property if provided multiple tags separated by commas
describe('GET /api/posts?tags=history,science,tech&direction=desc', function () {
  it('returns posts array after being provided with multiple tags query parameters separated by commas', async function () {
    const response = await request.get(`/api/posts?tags=history&direction=desc`)

    expect(response.status).to.eql(200)
    expect(response.body.posts).to.be.sortedBy('id', { descending: true })
  })
})

// response should be sorted by defaults: id -> asc
describe('GET /api/posts?tags=history', function () {
  it('returns posts array sorted by the default id in the default direction ascending', async function () {
    const response = await request.get(`/api/posts?tags=history`)

    expect(response.status).to.eql(200)
    expect(response.body.posts).to.be.sortedBy('id', { ascending: true })
  })
})

// response should be sorted by: reads -> asc
describe('GET /api/posts?tags=history&sortBy=reads', function () {
  it('returns posts array sorted by reads in default ascending order', async function () {
    const response = await request.get(`/api/posts?tags=history&sortBy=reads`)

    expect(response.status).to.eql(200)
    expect(response.body.posts).to.be.sortedBy('reads', { ascending: true })
  })
})

// response should be sorted by: id -> desc
describe('GET /api/posts?tags=history&direction=desc', function () {
  it('returns posts array sorted by default id in descending order', async function () {
    const response = await request.get(`/api/posts?tags=history&direction=desc`)

    expect(response.status).to.eql(200)
    expect(response.body.posts).to.be.sortedBy('id', { descending: true })
  })
})

// response with multiple tags should not contain duplicates
describe('GET /api/posts?tags=history,tech,science,politics&direction=desc', function () {
  it('response from multiple tags should not contain duplicates', async function () {
    const response = await request.get(
      `/api/posts?tags=history,tech,science,politics&direction=desc`
    )

    expect(response.status).to.eql(200)
    expect(response.body.posts).to.satisfy((res) => {
      let seen = new Set()
      var hasDuplicates = res.some(
        (currentObject) => seen.size === seen.add(currentObject.id).size
      )
      return !hasDuplicates
    })
  })
})
