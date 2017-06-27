import React from 'react'
import moment from 'moment'
import * as dates from '../constants/dates.js'

export const withinAWeekOfDeadline = (today, filingPeriod) => {
  if(!moment(today).isValid()) {
    return false
  }

  if(moment(today).isBetween(`${filingPeriod}-${dates.ONE_WEEK_TO_FILE}`, `${filingPeriod}-${dates.FILING_DEADLINE}`, 'day', '[]')) {
    return true
  }
  return false
}

export const getClass = (today, year) => {
  let alertClass = 'usa-alert-info'
  // warn if its within a week of the deadline
  if(withinAWeekOfDeadline(today, year)) {
    alertClass = 'usa-alert-warning'
  }

  return alertClass
}

const BannerDeadline = (props) => {
  const today = moment().format('YYYY-MM-DD')
  // filing in year after the filing period
  // eg, filing in 2018 for 2017
  const filingPeriodPlusOne = parseInt(props.filingPeriod, 10)+1

  // render if within the filing period (1/1/<filingPeriod> to 3/1/<filingPeriod>)
  if(moment(today).isBetween(`${filingPeriodPlusOne}-${dates.FILING_START}`, `${filingPeriodPlusOne}-${dates.FILING_DEADLINE}`, 'day', '[]')) {
    return (
      <section className={`BannerDeadline usa-alert ${getClass(today, filingPeriodPlusOne)}`}>
        <article className="usa-alert-body">
          <p className="usa-alert-text">March 1st, {filingPeriodPlusOne} is the deadline to submit HMDA data for the {props.filingPeriod} filing period.</p>
        </article>
      </section>
    )
  }

  return null
}

BannerDeadline.propTypes = {
  filingPeriod: React.PropTypes.string
}

export default BannerDeadline
