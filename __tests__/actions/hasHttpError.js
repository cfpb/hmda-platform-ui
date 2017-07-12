jest.unmock('../../src/js/actions/hasHttpError.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import hasHttpError from '../../src/js/actions/hasHttpError.js'

describe('hasHttpError', () => {
  it('checks for http errors', done => {
    hasHttpError().then(hasError => expect(hasError).toBe(true))
    hasHttpError({status: 401}).then(hasError => done.fail('401 resolves'))
    hasHttpError({}).then(hasError => expect(hasError).toBe(false))
    hasHttpError({status: 200}).then(hasError => expect(hasError).toBe(false))
    done()
  })
})
