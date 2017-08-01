import React from 'react'
import PropTypes from 'prop-types'
import Alert from './Alert.jsx'

const BannerBeta = (props) => {
  return (
    <section className="BannerBeta usa-text-small">
      <Alert
        type="warning"
        heading="This is a beta release">
        <div>
          <p>The beta HMDA Platform is a work in progress, intended to provide HMDA filers with an understanding of the submission process, prior to the filing period.</p>
          <p>This is part of our work to improve the HMDA electronic reporting process for financial institutions.</p>
          <p>For more information about filing your HMDA data, please visit <a href="https://www.consumerfinance.gov/hmda">https://www.consumerfinance.gov/hmda/.</a></p>
        </div>
      </Alert>
    </section>
  )
}

export default BannerBeta
