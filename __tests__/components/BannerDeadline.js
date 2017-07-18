jest.unmock('../../src/js/components/BannerDeadline.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Wrapper from '../Wrapper.js'
import BannerDeadline, {
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

describe('getClass', () => {
  it('returns alert-warning', () => {
    expect(getClass('2017-02-21', '2017')).toBe('usa-alert-warning')
  })
  it('returns alert-warning', () => {
    expect(getClass('2017-03-01', '2017')).toBe('usa-alert-warning')
  })
  it('returns alert-warning', () => {
    expect(getClass('2017-02-28', '2017')).toBe('usa-alert-warning')
  })
  it('returns alert-info', () => {
    expect(getClass('2017-02-20', '2017')).toBe('usa-alert-info')
  })
  it('returns alert-info', () => {
    expect(getClass('2017-03-02', '2017')).toBe('usa-alert-info')
  })

  it('LEAP YEAR', () => {
    expect(getClass('2017-03-02', '2017')).toBe('usa-alert-info')
  })
})
