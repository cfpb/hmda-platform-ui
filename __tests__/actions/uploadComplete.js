jest.unmock('../../src/js/actions/uploadComplete.js')
import * as types from '../../src/js/constants'
import uploadComplete from '../../src/js/actions/uploadComplete.js'

describe('uploadComplete', () => {
   it('creates an action to signal completion of the file upload', () => {
    const event = {}

    expect(uploadComplete(event)).toEqual({
      type: types.UPLOAD_COMPLETE,
      xhrLoadEvent: event
    })
  })
})
