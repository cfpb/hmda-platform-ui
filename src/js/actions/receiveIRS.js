import * as types from '../constants'

export function receiveIRS(data) {
  return {
    type: types.RECEIVE_IRS,
    msas: data.msas,
    summary: data.summary,
    pagination: {
      count: data.count,
      total: data.total,
      _links: data._links
    }
  }
}
