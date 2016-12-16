import React, { Component, PropTypes } from 'react'

const Summary = (props) => {
  if (!props.respondent.name) return null

  return (
    <div className="Summary usa-grid-full" id="summary">
      <div className="padding-2 bg-color-gray-lightest">
        <h2 className="margin-top-0">Validation Summary</h2>
        <p className="usa-font-lead margin-top-half margin-bottom-0">You have succesfully validated your file. Please review the respondent and file information below.</p>
      </div>
      <div className="border margin-bottom-5 padding-1 usa-grid-full">
        <div className="usa-width-one-half">
          <h3>Respondent Information</h3>
          <dl>
            <dt>Name:</dt>
            <dd>{props.respondent.name}</dd>
            <dt>Respondent ID:</dt>
            <dd>{props.respondent.id}</dd>
            <dt>Tax ID:</dt>
            <dd>{props.respondent.taxId}</dd>
            <dt>Agency:</dt>
            <dd>{props.respondent.agency}</dd>
            <dt>Contact Name:</dt>
            <dd>{props.respondent.contact.name}</dd>
            <dt>Phone:</dt>
            <dd>{props.respondent.contact.phone}</dd>
            <dt>Email</dt>
            <dd>{props.respondent.contact.email}</dd>
          </dl>
        </div>
        <div className="usa-width-one-half">
          <h3>File Information</h3>
          <dl>
            <dt>File Name:</dt>
            <dd>{props.file.name}</dd>
            <dt>Year:</dt>
            <dd>{props.file.year}</dd>
            <dt>Total Loans/Applications:</dt>
            <dd>{props.file.totalLARS}</dd>
          </dl>
        </div>
      </div>
    </div>
  )
}

Summary.propTypes = {
  respondent: PropTypes.object,
  file: PropTypes.object
}

export default Summary
