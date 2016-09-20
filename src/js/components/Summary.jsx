import React, { Component, PropTypes } from 'react'

const Summary = (props) => {
  return (
    <div className="Summary">
      <h2>Validation Summary</h2>
      <p>You have succesfully validated your file. Please review the respondent and file information below.</p>
      <h3>Respondent Information</h3>
      <dl>
        <dt>Name:</dt>
        <dd>{props.respondent.name}</dd>
        <dt>Respondent ID:</dt>
        <dd>{props.respondent.id}</dd>
        <dt>Tax ID:</dt>
        <dd>{props.respondent.taxID}</dd>
        <dt>Agency:</dt>
        <dd>{props.respondent.agency}</dd>
        <dt>Contact Name:</dt>
        <dd>{props.respondent.contact.name}</dd>
        <dt>Phone:</dt>
        <dd>{props.respondent.contact.phone}</dd>
        <dt>Email</dt>
        <dd>{props.respondent.contact.email}</dd>
      </dl>
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
  )
}

Summary.propTypes = {
  respondent: PropTypes.object,
  file: PropTypes.object
}

export default Summary
