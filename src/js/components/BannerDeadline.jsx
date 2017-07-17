import React from 'react'
import PropTypes from 'prop-types'
import Alert from './Alert.jsx'
import moment from 'moment'
import * as dates from '../constants/dates.js'

export const withinAWeekOfDeadline = (today, filingPeriod) => {
  if (!moment(today).isValid()) {
    return false
  }

  if (
    moment(today).isBetween(
      `${filingPeriod}-${dates.ONE_WEEK_TO_FILE}`,
      `${filingPeriod}-${dates.FILING_DEADLINE}`,
      'day',
      '[]'
    )
  ) {
    return true
  }
  return false
}

const BannerDeadline = props => {
  const today = moment().format('YYYY-MM-DD')
  // filing in year after the filing period
  // eg, filing in 2018 for 2017
  const filingPeriodPlusOne = parseInt(props.filingPeriod, 10) + 1

  const withinAWeek = withinAWeekOfDeadline(today, filingPeriodPlusOne)
  const filingDue = moment(today).isBetween(
    `${filingPeriodPlusOne}-${dates.FILING_START}`,
    `${filingPeriodPlusOne}-${dates.FILING_DEADLINE}`,
    'day',
    '[]'
  )

  if(!filingDue) return null

  return (
    <section className="BannerDeadline">
      <Alert type={withinAWeek ? 'warning' : 'info'}>
        <p>March 1st, {filingPeriodPlusOne} is the deadline to submit HMDA data for the {props.filingPeriod} filing period.</p>
      </Alert>
    </section>
  )
}

BannerDeadline.propTypes = {
  filingPeriod: PropTypes.string
}

export default BannerDeadline
