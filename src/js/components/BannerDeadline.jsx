import React from 'react'
import moment from 'moment'

const BannerDeadline = (props) => {
  // don't render if not in the filing period (1/1 to 3/1)
  if(!moment(moment().format('YYYY-MM-DD')).isBetween(`${props.filingPeriod}-01-01`, `${props.filingPeriod}-03-01`, 'day', '[]')) {
    return null
  }

  let alertClass = ''
  // one month away
  if(moment(moment().format('YYYY-MM-DD')).isBetween(`${props.filingPeriod}-02-01`, `${props.filingPeriod}-03-01`, 'day', '[]')) {
    alertClass = 'warning'
  }
  // one week away
  if(moment(moment().format('YYYY-MM-DD')).isBetween(`${props.filingPeriod}-02-21`, `${props.filingPeriod}-03-01`, 'day', '[]')) {
    alertClass = 'error'
  }
  return (
    <p className={`BannerDeadline ${alertClass}`}>March 1st, {parseInt(props.filingPeriod, 10)+1} is the deadline to submit HMDA data for the {props.filingPeriod} filing period.</p>
  )
}

BannerDeadline.propTypes = {
  filingPeriod: React.PropTypes.string
}

export default BannerDeadline
