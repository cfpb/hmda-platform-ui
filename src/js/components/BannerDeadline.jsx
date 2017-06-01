import React from 'react'
import moment from 'moment'
import * as dates from '../constants/dates.js'

export const withinAWeekOfDeadline = (today, filingPeriod) => {
  if(!moment(today).isValid()) {
    return false
  }

  if(moment(today).isBetween(`${filingPeriod}-${dates.ONE_WEEK}`, `${filingPeriod}-${dates.DEADLINE}`, 'day', '[]')) {
    return true
  }
  return false
}

const BannerDeadline = (props) => {
  const today = moment().format('YYYY-MM-DD')

  // render if within the filing period (1/1/<filingPeriod> to 3/1/<filingPeriod>)
  if(moment(today).isBetween(`${props.filingPeriod}-${dates.START}`, `${props.filingPeriod}-${dates.DEADLINE}`, 'day', '[]')) {

    let alertClass = 'usa-alert-info'
    // warn if its within a week of the deadline
    if(withinAWeekOfDeadline(today, props.filingPeriod)) {
      alertClass = 'usa-alert-warning'
    }

    return (
      <div className={`BannerDeadline usa-alert ${alertClass}`}>
        <div className="usa-alert-body">
          <p className="usa-alert-text">March 1st, {parseInt(props.filingPeriod, 10)+1} is the deadline to submit HMDA data for the {props.filingPeriod} filing period.</p>
        </div>
      </div>
    )
  }

  return null
}

BannerDeadline.propTypes = {
  filingPeriod: React.PropTypes.string
}

export default BannerDeadline
