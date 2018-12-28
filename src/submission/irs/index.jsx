import React from 'react'
import PropTypes from 'prop-types'

import './IRSReport.css'

const IRSReport = props => {
  return (
    <section className="IRSReport">
      <header>
        <h2>Institution Register Summary</h2>
        <p className="font-lead">
          During the 2018 filing period, the IRS will be made available in the
          HMDA Platform after signing and submitting your HMDA data. The IRS
          will not be available immediately. Please check back later to access
          your IRS.
        </p>
        <p>
          When ready, the IRS will be available for{' '}
          <a
            href={`https://s3.amazonaws.com/cfpb-hmda-public/prod/reports/disclosure/2018/${
              props.lei
            }/nationwide/IRS.csv`}
            download={true}
          >
            download here
          </a>
          .
        </p>
      </header>

      <hr />
    </section>
  )
}

IRSReport.propTypes = {
  lei: PropTypes.string
}

export default IRSReport
