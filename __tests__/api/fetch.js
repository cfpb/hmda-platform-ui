import fetch from '../../src/js/api/fetch'

jest.mock('../../src/js/api/parseLocation', () => jest.fn(()=>{return{}}))
jest.mock('../../src/js/api/makeUrl', () => jest.fn(obj => 'url'))
jest.mock('../../src/js/api/createQueryString.js', () => jest.fn(() => '?qs'))
jest.mock('../../src/js/api/AccessToken.js', () => {return {
  get: jest.fn(() => 'token'
)}})

import parseLocation from '../../src/js/api/parseLocation.js'
import makeUrl from '../../src/js/api/makeUrl.js'
import createQueryString from '../../src/js/api/createQueryString.js'
import AccessToken from '../../src/js/api/AccessToken.js'

parseLocation()
makeUrl()

describe('fetch', () => {
  it('calls deps', () => {
    
  })
})
