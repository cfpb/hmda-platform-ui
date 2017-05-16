jest.unmock('../../src/js/actions/uploadStart.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import uploadStart from '../../src/js/actions/uploadStart.js'

describe('uploadStart', () => {
  it('creates an action to signal the start of the file upload', () => {
    expect(uploadStart()).toEqual({
      type: types.UPLOAD_START
    })
  })
})
