jest.unmock('../../src/js/actions/checkErrors.js')
import * as types from '../../src/js/constants'
import checkErrors from '../../src/js/actions/checkErrors.js'

describe('checkErrors', () => {
  it('checks for file upload errors', () => {
    expect(checkErrors()).toEqual(['Your file was not uploaded. Please try again.'])
    expect(checkErrors({size: 123})).toEqual(['Your file was not uploaded. Please try again.'])
    expect(checkErrors({name: 'arg.txt'})).toEqual(['Your file was not uploaded. Please try again.'])
    expect(checkErrors({name: 'arg.txt', size: 0})).toEqual(['The file you uploaded does not contain any data. Please check your file and re-upload.'])
    expect(checkErrors({size: 123, name: 'bad'})).toEqual(['The file you uploaded is not a text file (.txt). Please check your file and re-upload.'])
    expect(checkErrors({size: 0, name: 'bad'})).toEqual(['The file you uploaded does not contain any data. Please check your file and re-upload.', 'The file you uploaded is not a text file (.txt). Please check your file and re-upload.'])
  })
})
