import React from 'react'
import PropTypes from 'prop-types'
import Alert from './Alert.jsx'
import {withinFilingPeriod, withinAWeekOfDeadline} from '../utils/date.js'

const BannerDeadline = (props) => {
  const filingPeriodPlusOne = parseInt(props.filingPeriod, 10)+1
  const withinAWeek = withinAWeekOfDeadline(filingPeriodPlusOne)
  // render if within the filing period (1/1/<filingPeriod> to 3/1/<filingPeriod>)
  if(withinFilingPeriod(filingPeriodPlusOne)) {
    return (
      <section className="BannerDeadline">
        <Alert type={ withinAWeek ? 'warning' : 'info'}>
          <p>March 1st, {filingPeriodPlusOne} is the deadline to submit HMDA data for the {props.filingPeriod} filing period.</p>
        </Alert>
      </section>
    )
  }

  return null
}

BannerDeadline.propTypes = {
  filingPeriod: PropTypes.string
}

export default BannerDeadline
