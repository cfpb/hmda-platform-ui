jest.unmock('../../src/js/api/fetch')
import { fetch } from '../../src/js/api/fetch'
console.log = jest.fn()

let mocktoken = 'token'

jest.mock('../../src/js/api/parseLocation', () =>
  jest.fn(() => {
    return {}
  })
)
jest.mock('../../src/js/api/makeUrl', () =>
  jest.fn(obj => {
    if (obj.pathname) return 'pathname'
    if (obj.querystring) return 'qs'
    return 'url'
  })
)
jest.mock('../../src/js/api/createQueryString.js', () => jest.fn(() => '?qs'))
jest.mock('../../src/js/api/AccessToken.js', () => {
  return {
    get: jest.fn(() => mocktoken)
  }
})

jest.mock('isomorphic-fetch')
import isomorphicFetch from 'isomorphic-fetch'

const text = jest.fn()
const json = jest.fn()
isomorphicFetch.mockImplementation(() =>
  Promise.resolve({ text: text, json: json })
)

describe('fetch', () => {
  it('runs with no args', done => {
    fetch().then(res => {
      expect(json.mock.calls.length).toBe(1)
      done()
    })
  })

  it('creates a querystring when given params', done => {
    fetch({ params: { a: 'b' } }).then(res => {
      expect(isomorphicFetch.mock.calls[1][0]).toBe('qs')
      done()
    })
  })

  it('stringifies options body when needed', done => {
    fetch({ body: {} }).then(res => {
      expect(isomorphicFetch.mock.calls[2][1].body).toBe('{}')
      done()
    })
  })

  it('sets headers on POST', done => {
    fetch({ method: 'POST' }).then(res => {
      expect(isomorphicFetch.mock.calls[3][1].headers).toEqual({
        'Content-Type': 'application/json',
        Authorization: 'Bearer token'
      })
      done()
    })
  })

  it('sets headers on csv', done => {
    fetch({ params: { format: 'csv' } }).then(res => {
      expect(isomorphicFetch.mock.calls[4][1].headers).toEqual({
        'Content-Type': 'text/csv',
        Authorization: 'Bearer token'
      })
      expect(text.mock.calls.length).toBe(1)
      done()
    })
  })

  it('only sets auth with token', done => {
    mocktoken = undefined
    fetch({ params: { format: 'csv' } }).then(res => {
      expect(isomorphicFetch.mock.calls[5][1].headers).toEqual({
        'Content-Type': 'text/csv'
      })
      done()
    })
  })

  it('skips location parse when provided pathname', done => {
    fetch({ pathname: 'path' }).then(res => {
      expect(isomorphicFetch.mock.calls[6][0]).toBe('pathname')
      done()
    })
  })
})
