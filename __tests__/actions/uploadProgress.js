jest.unmock('../../src/js/actions/uploadProgress.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import uploadProgress from '../../src/js/actions/uploadProgress.js'

describe('uploadProgress', () => {
   it('creates an action to signal upload progress', () => {
    expect(uploadProgress(99)).toEqual({
      type: types.UPLOAD_PROGRESS,
      percentUploaded: 99
    })
  })
})
