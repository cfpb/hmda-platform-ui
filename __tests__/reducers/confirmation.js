jest.unmock('../../src/js/reducers/confirmation.js')
import * as types from '../../src/js/constants'
import excludeTypes from './excludeTypes.js'
import confirmation from '../../src/js/reducers/confirmation.js'

const defaultConfirmation = {
  showing: false,
  code: 0,
  id: null,
  filing: null
}

describe('confirmation reducer', () => {
  it('should return the initial state on empty action', () => {
    expect(
      confirmation(undefined, {})
    ).toEqual(defaultConfirmation)
  })

  it('should positively set confirmation', () => {
    expect(
      confirmation(defaultConfirmation, {type: types.SHOW_CONFIRM, showing: true, id:'a', filing: 'b'})
    ).toEqual({showing: true, id: 'a', filing: 'b'})
  })

  it('should negatively set confirmation', () => {
    expect(
      confirmation({showing: true}, {type: types.HIDE_CONFIRM, showing: false})
    ).toEqual({showing: false})
  })
})
