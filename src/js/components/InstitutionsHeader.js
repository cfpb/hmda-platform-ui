import React from 'react'
import PropTypes from 'prop-types'

const InstitutionsHeader = props => {
  return (
    <header>
      <h1>{props.filingPeriod} filing period</h1>
      <p>The filing period is open. You may file HMDA data for your authorized institutions below.</p>
      <p>Your progress will be saved if you leave the platform before completing your filing.</p>
    </header>
  )
}

InstitutionsHeader.propTypes = {
  filingPeriod: PropTypes.string
}

export default InstitutionsHeader
