import React from 'react'
import PropTypes from 'prop-types'
import Alert from './Alert.jsx'

const BannerBeta = props => {
  return (
    <section className="BannerBeta usa-text-small">
      <Alert type="warning" heading="Help us improve this beta release.">
        <p>
          The beta HMDA platform is a work in progress, introducing HMDA filers
          to the new submission process before the filing period. If you have
          feedback on your experience, please send it to{' '}
          <a href="mailto:HMDAFeedback@cfpb.gov">HMDAFeedback@cfpb.gov</a> (do
          not include personal information such as an account number, address,
          or Social Security number).
        </p>
      </Alert>
    </section>
  )
}

export default BannerBeta
