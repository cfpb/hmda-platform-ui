jest.unmock('./reducer.js')
import * as types from '../../constants'
import confirmation from './reducer.js'

const defaultConfirmation = {
  showing: false
}

describe('confirmation reducer', () => {
  it('should return the initial state on empty action', () => {
    expect(confirmation(undefined, {})).toEqual(defaultConfirmation)
  })

  it('should positively set confirmation', () => {
    expect(
      confirmation(defaultConfirmation, {
        type: types.SHOW_CONFIRM,
        showing: true
      })
    ).toEqual({ showing: true })
  })

  it('should negatively set confirmation', () => {
    expect(
      confirmation(
        { showing: true },
        { type: types.HIDE_CONFIRM, showing: false }
      )
    ).toEqual({ showing: false })
  })
})
