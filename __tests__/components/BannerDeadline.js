jest.unmock('../../src/js/components/BannerDeadline.jsx')
jest.unmock('../../src/js/components/Alert.jsx')
jest.mock('../../src/js/utils/date.js')

import React from 'react'
import ReactDOM from 'react-dom'
import Wrapper from '../Wrapper.js'
import TestUtils from 'react-addons-test-utils'
import {withinFilingPeriod, withinAWeekOfDeadline} from '../../src/js/utils/date.js'
import BannerDeadline from '../../src/js/components/BannerDeadline.jsx'


describe('BannerDeadline', function() {
  it('renders the banner if within filingPeriod, but not a week', function(){
    withinFilingPeriod.mockImplementation(() => true)
    withinAWeekOfDeadline.mockImplementation(() => false)

    const banner = TestUtils.renderIntoDocument(
        <Wrapper>
          <BannerDeadline
            filingPeriod='2017'
          />
        </Wrapper>
      )
    const bannerNode = ReactDOM.findDOMNode(banner)
    const alert = TestUtils.scryRenderedDOMComponentsWithClass(banner, 'usa-alert')
    expect(bannerNode).toBeDefined()
    Object.keys(alert).forEach(v => {
      expect(alert[v].className).toBe('usa-alert usa-alert-info')
    })
  })

  it('renders the banner if within a week of filingPeriod', function(){
    withinFilingPeriod.mockImplementation(() => true)
    withinAWeekOfDeadline.mockImplementation(() => true)

    const banner = TestUtils.renderIntoDocument(
        <Wrapper>
          <BannerDeadline
            filingPeriod='2017'
          />
        </Wrapper>
      )
    const bannerNode = ReactDOM.findDOMNode(banner)
    const alert = TestUtils.scryRenderedDOMComponentsWithClass(banner, 'usa-alert')
    expect(bannerNode).toBeDefined()
    Object.keys(alert).forEach(v => {
      expect(alert[v].className).toBe('usa-alert usa-alert-warning')
    })
  })

  it('renders null if not in filingPeriod', function(){
    withinFilingPeriod.mockImplementation(() => false)
    withinAWeekOfDeadline.mockImplementation(() => false)

    const banner = TestUtils.renderIntoDocument(
        <Wrapper>
          <BannerDeadline
            filingPeriod='2017'
          />
        </Wrapper>
      )
    const bannerNode = ReactDOM.findDOMNode(banner)
    expect(bannerNode).toBe(null)
  })
})
