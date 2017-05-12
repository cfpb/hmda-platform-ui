jest.unmock('../../src/js/actions/uploadError.js')
import * as types from '../../src/js/constants'
import uploadError from '../../src/js/actions/uploadError.js'

describe('uploadError', () => {
  it('creates an action to signal an error during the file upload', () => {
    expect(uploadError()).toEqual({
      type: types.UPLOAD_ERROR
    })
  })
})
