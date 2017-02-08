jest.unmock('../src/js/api')

import * as api from '../src/js/api'

describe('access token getter/setter', () => {
  it('should return an empty string when access token is not set', () => {
    expect(
      api.getAccessToken()
    ).toEqual('')
  })

  it('should set the token', () => {
    api.setAccessToken('test')
    expect(
      api.getAccessToken()
    ).toEqual('test')
  })
})

describe('parse location', () => {
  it('parses the global location properly', () => {
    expect(
      api.parseLocation({pathname: '/testid/testfiling'})
    ).toEqual({id: 'testid', filing: 'testfiling'})
  })
})

describe('make url from location object', () => {
  process.env.HMDA_API = 'servername'
  it('should make a plain url from environment variable', () => {
    expect(
      api.makeUrl({})
    ).toEqual('servername')
  })
})
