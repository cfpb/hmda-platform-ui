jest.unmock('../../src/js/actions/selectFile.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import selectFile from '../../src/js/actions/selectFile.js'

describe('selectFile', () => {
  it('creates an action to signal file selection', () => {
    const file = {size:42, name: 'test.txt'}

    expect(selectFile(file)).toEqual({
      type: types.SELECT_FILE,
      file,
      errors: []
    })
  })
})
