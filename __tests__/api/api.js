jest.unmock('../../src/js/api/api')
const mockedFetch = jest.fn()

const fetch = require.requireActual('../../src/js/api/fetch')
fetch.fetch = mockedFetch

import * as api from '../../src/js/api/api'

describe('api', () => {
  it('gets institution', () => {
    api.getInstitution('1')
    expect(mockedFetch.mock.calls[0][0]).toEqual({
      pathname: '/institutions/1'
    })
  })

  it('gets institutions', () => {
    api.getInstitutions()
    expect(mockedFetch.mock.calls[1][0]).toEqual({ pathname: '/institutions' })
  })

  it('gets submission', () => {
    api.getSubmission('1')
    expect(mockedFetch.mock.calls[2][0]).toEqual({ submission: '1' })
  })

  it('creates institutions', () => {
    api.createSubmission('1', '2')
    expect(mockedFetch.mock.calls[3][0]).toEqual({
      pathname: '/institutions/1/filings/2/submissions',
      method: 'POST'
    })
  })

  it('gets filing', () => {
    api.getFiling('1', '2')
    expect(mockedFetch.mock.calls[4][0]).toEqual({
      pathname: '/institutions/1/filings/2'
    })
  })

  it('gets filing from url', () => {
    api.getFilingFromUrl()
    expect(mockedFetch.mock.calls[5][0]).toEqual()
  })

  it('gets latest submission', () => {
    api.getLatestSubmission()
    expect(mockedFetch.mock.calls[6][0]).toEqual({
      suffix: '/submissions/latest'
    })
  })

  it('gets edits', () => {
    api.getEdits({})
    expect(mockedFetch.mock.calls[7][0]).toEqual({ suffix: '/edits' })

    api.getEdits({ suffix: '1' })
    expect(mockedFetch.mock.calls[8][0]).toEqual({ suffix: '1' })
  })

  it('gets edit', () => {
    api.getEdit({ edit: '1' })
    expect(mockedFetch.mock.calls[9][0]).toEqual({
      edit: '1',
      suffix: '/edits/1'
    })

    api.getEdit({ suffix: '1' })
    expect(mockedFetch.mock.calls[10][0]).toEqual({ suffix: '1' })
  })

  it('gets csv', () => {
    api.getCSV({})
    expect(mockedFetch.mock.calls[11][0]).toEqual({
      params: { format: 'csv' },
      suffix: '/edits/csv'
    })

    api.getCSV({ suffix: '1' })
    expect(mockedFetch.mock.calls[12][0]).toEqual({
      params: { format: 'csv' },
      suffix: '1'
    })
  })

  it('posts verify', () => {
    api.postVerify('1', '2', '3')
    expect(mockedFetch.mock.calls[13][0]).toEqual({
      submission: '1',
      suffix: '/edits/2',
      method: 'POST',
      body: { verified: '3' }
    })
  })

  it('gets irs', () => {
    api.getIRS('1')
    expect(mockedFetch.mock.calls[14][0]).toEqual({
      submission: '1',
      suffix: '/irs'
    })
  })

  it('gets summary', () => {
    api.getSummary('1')
    expect(mockedFetch.mock.calls[15][0]).toEqual({
      submission: '1',
      suffix: '/summary'
    })
  })

  it('gets signature', () => {
    api.getSignature('1')
    expect(mockedFetch.mock.calls[16][0]).toEqual({
      submission: '1',
      suffix: '/sign'
    })
  })

  it('gets parse errors', () => {
    api.getParseErrors('1')
    expect(mockedFetch.mock.calls[17][0]).toEqual({
      submission: '1',
      suffix: '/parseErrors'
    })
  })

  it('posts signature', () => {
    api.postSignature('1', '2')
    expect(mockedFetch.mock.calls[18][0]).toEqual({
      submission: '1',
      suffix: '/sign',
      method: 'POST',
      body: { signed: '2' }
    })
  })
})
