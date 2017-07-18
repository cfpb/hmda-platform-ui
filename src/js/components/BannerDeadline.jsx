import React from 'react'
import PropTypes from 'prop-types'
import {withinFilingPeriod, withinAWeekOfDeadline} from '../utils/date.js'

export const getClass = (year) => {
  let alertClass = 'usa-alert-info'
  // warn if its within a week of the deadline
  if(withinAWeekOfDeadline(year)) {
    alertClass = 'usa-alert-warning'
  }

  return alertClass
}

const BannerDeadline = (props) => {
  const filingPeriodPlusOne = parseInt(props.filingPeriod, 10)+1

  // render if within the filing period (1/1/<filingPeriod> to 3/1/<filingPeriod>)
  if(withinFilingPeriod(filingPeriodPlusOne)) {
    return (
      <section className={`BannerDeadline usa-alert ${getClass(filingPeriodPlusOne)}`}>
        <article className="usa-alert-body">
          <p className="usa-alert-text">March 1st, {filingPeriodPlusOne} is the deadline to submit HMDA data for the {props.filingPeriod} filing period.</p>
        </article>
      </section>
    )
  }

  return null
}

BannerDeadline.propTypes = {
  filingPeriod: PropTypes.string
}

export default BannerDeadline
