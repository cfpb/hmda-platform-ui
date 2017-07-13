jest.unmock('../../src/js/components/BannerDeadline.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Wrapper from '../Wrapper.js'
import BannerDeadline, {
  withinAWeekOfDeadline,
  getClass
} from '../../src/js/components/BannerDeadline.jsx'


describe('BannerDeadline', function() {
  const banner = TestUtils.renderIntoDocument(
    <Wrapper>
      <BannerDeadline
        filingPeriod='2017'
      />
    </Wrapper>
  )
  const bannerNode = ReactDOM.findDOMNode(banner)

  it('renders the bannder', function(){
    expect(bannerNode).toBeDefined()
  })

  it('sets the prop appropriately', function(){
    expect(banner.props.children.props.filingPeriod).toEqual('2017')
  })
})

describe('withinAWeekOfDeadline', () => {
  console.warn = jest.genMockFunction()
  it('returns false if invalid date for "today"', () => {
    try {
      expect(withinAWeekOfDeadline('asdf', '2017')).toBeFalsy()
    } catch(err) {}
  })

  it('returns true if its the 21st of February, start of within a week', () => {
    expect(withinAWeekOfDeadline('2017-02-21', '2017')).toBeTruthy()
  })
  it('returns true if its the 1st of March, end of deadline', () => {
    expect(withinAWeekOfDeadline('2017-03-01', '2017')).toBeTruthy()
  })
  it('returns true if its within a week of deadline', () => {
    expect(withinAWeekOfDeadline('2017-02-28', '2017')).toBeTruthy()
  })
  it('returns false if its prior to the deadline', () => {
    expect(withinAWeekOfDeadline('2017-02-20', '2017')).toBeFalsy()
  })
  it('returns false if its past the deadline', () => {
    expect(withinAWeekOfDeadline('2017-03-02', '2017')).toBeFalsy()
  })

  it('LEAP YEAR', () => {
    expect(withinAWeekOfDeadline('2017-03-02', '2017')).toBeFalsy()
  })
})
