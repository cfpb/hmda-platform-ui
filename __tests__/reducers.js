jest.unmock('../src/js/reducers')

import * as types from '../src/js/constants'
import { institutions, filings } from '../src/js/reducers'

const typesArr = Object.keys(types)
  .filter( v => v !== '__esModule')
  .map( v => {return {type: v}})

const excludeTypes = (...args) => {
  return typesArr.filter(v => {
    return args.indexOf(v.type) === -1
  })
}

describe('institutions reducer', () => {
  it('should return the initial state on empty action', () => {
    expect(
      institutions(undefined, {})
    ).toEqual({})
  })

  it('handles REQUEST_INSTITUTIONS', () => {
    expect(
      institutions({}, {type: types.REQUEST_INSTITUTIONS})
    ).toEqual({isFetching: true})
  })

  it('handles RECEIVE_INSTITUTIONS', () => {
    expect(
      institutions({}, {type: types.RECEIVE_INSTITUTIONS, institutions:{a:1}})
    ).toEqual({isFetching: false, institutions: {a: 1}})
  })

  it('shouldn\'t modify state on an unknown action type', () => {
    excludeTypes(types.RECEIVE_INSTITUTIONS, types.REQUEST_INSTITUTIONS)
      .forEach(v => expect(institutions({}, v))
        .toEqual({})
      )
  })

})

describe('filings reducer', () => {
  it('should return the initial state on empty action', () => {
    expect(
      filings(undefined, [])
    ).toEqual([])
  })

  it('handles RECEIVE_INSTITUTION', () => {
    expect(
      filings([1], {type: types.RECEIVE_INSTITUTION, institution:{filings:[2,3,4]}})
    ).toEqual([1,2,3,4])
  })

  it('handles CLEAR_FILINGS', () => {
    expect(
      filings([1,2,3], {type: types.CLEAR_FILINGS})
    ).toEqual([])
  })

  it('shouldn\'t modify state on an unknown action type', () => {
    excludeTypes(types.RECEIVE_INSTITUTION, types.CLEAR_FILINGS)
      .forEach(v => expect(filings([], v))
        .toEqual([])
      )
  })

})
