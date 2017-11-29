jest.unmock('../../src/js/actions/receiveUploadError.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import receiveUploadError from '../../src/js/actions/receiveUploadError.js'

const dispatch = jest.fn()
const getState = jest.fn(() => {
  return {
    app: {
      institution: {
        id: '123'
      }
    }
  }
})

describe('receiveUploadError', () => {
  it('creates an action to signal receiving an error', () => {
    receiveUploadError('b')(dispatch, getState)
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: types.RECEIVE_UPLOAD_ERROR,
      error: 'b',
      id: '123'
    })
  })
})
