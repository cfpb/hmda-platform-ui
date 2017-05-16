jest.mock('../../src/js/api/api')
jest.unmock('../../src/js/actions/pollForProgress.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import pollForProgress from '../../src/js/actions/pollForProgress.js'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { getLatestSubmission, getEdits } from '../../src/js/api/api.js'
import fs from 'fs'

const filingsObj = JSON.parse(fs.readFileSync('./__tests__/json/filings.json'))
getLatestSubmission.mockImplementation(() => Promise.resolve(filingsObj.submissions[2]))
getEdits.mockImplementation((id) => Promise.resolve({fakeEdits:1}))
const mockStore = configureMockStore([thunk])

describe('pollForProgress', () => {
  it('does not poll on pages other than upload', () => {
    const store = mockStore({submission: {}})
    store.dispatch(pollForProgress(true)).then(() => {
      expect(store.getActions()).toEqual([])
    })
  })

  it('does not poll when polling is set to false', () => {
    const store = mockStore({submission: {}})
    store.dispatch(pollForProgress(false)).then(() => {
      expect(store.getActions()).toEqual([])
    })
  })

  it('creates a thunk that will poll for updated status codes in the latest submission', done => {
    const store = mockStore({submission: {}})
    const submission = filingsObj.submissions[2]

    delete global.location
    global.location = {pathname: '/upload'}

    store.dispatch(pollForProgress(true)).then(() => {
        expect(store.getActions()).toEqual([
          {
            type: types.RECEIVE_SUBMISSION,
            id: submission.id,
            status: submission.status,
            start: submission.start,
            end: submission.end
          },
          {
            type: 'REQUEST_EDITS'
          },
          {
            edits: {
              fakeEdits: 1
            },
            type: 'RECEIVE_EDITS'
          }
        ])

        done()
      })
      .catch(err => {
        console.log(err)
        done.fail()
      })
  })
})
