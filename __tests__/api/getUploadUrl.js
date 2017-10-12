import getUploadUrl from '../../src/js/api/getUploadUrl'

jest.mock('../../src/js/api/parseLocation', () =>
  jest.fn(() => {
    return {}
  })
)
jest.mock('../../src/js/api/makeUrl', () => jest.fn(obj => 'url'))

import parseLocation from '../../src/js/api/parseLocation.js'
import makeUrl from '../../src/js/api/makeUrl.js'

parseLocation()
makeUrl()

describe('get upload url', () => {
  it('throws on no id', done => {
    try {
      getUploadUrl()
    } catch (e) {
      expect(e.message).toBe(
        'Must provide a submission id when data is uploaded.'
      )
      done()
    }
  })

  const uploadUrl = getUploadUrl('arg')
  it('calls dependent functions', () => {
    expect(parseLocation.mock.calls[1][0]).toEqual(location)
    expect(makeUrl.mock.calls[1][0]).toEqual({ submission: 'arg' })
    expect(uploadUrl).toBe('url')
  })
})
