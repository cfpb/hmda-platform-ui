import React from 'react'
import PropTypes from 'prop-types'

const Summary = props => {
  if (!props.respondent || !props.file) return null

  return (
    <section className="Summary usa-grid-full" id="summary">
      <header>
        <h2>HMDA Filing Summary</h2>
        <p className="usa-font-lead">
          You have completed the verification process for your HMDA data. Please
          review the respondent and file information below from your HMDA file.
        </p>
      </header>
      <div className="info usa-grid-full">
        <section className="usa-width-one-half">
          <h3>Respondent Information</h3>
          <dl>
            <dt>Name:</dt>
            <dd>{props.respondent.name}</dd>
            <dt>Respondent ID:</dt>
            <dd>{props.respondent.id}</dd>
            <dt>Tax ID:</dt>
            <dd>{props.respondent.taxId}</dd>
            <dt>Agency:</dt>
            <dd className="text-uppercase">{props.respondent.agency}</dd>
            <dt>Contact Name:</dt>
            <dd>{props.respondent.contact && props.respondent.contact.name}</dd>
            <dt>Phone:</dt>
            <dd>
              {props.respondent.contact && props.respondent.contact.phone}
            </dd>
            <dt>Email</dt>
            <dd>
              {props.respondent.contact && props.respondent.contact.email}
            </dd>
          </dl>
        </section>
        <section className="usa-width-one-half">
          <h3>File Information</h3>
          <dl>
            <dt>File Name:</dt>
            <dd>{props.file.name}</dd>
            <dt>Year:</dt>
            <dd>{props.file.year}</dd>
            <dt>Total Loans/Applications:</dt>
            <dd>{props.file.totalLARS}</dd>
          </dl>
        </section>
      </div>

      <hr />
    </section>
  )
}

Summary.propTypes = {
  respondent: PropTypes.object,
  file: PropTypes.object
}

export default Summary
