import React, { Component, PropTypes } from 'react'
import Pagination from '../containers/Pagination.jsx'

const renderTSErrors = (transmittalSheetErrors) => {
  if(transmittalSheetErrors.length === 0) return null
  return (
    <table className="margin-bottom-0" width="100%">
      <caption>
        <h3>Transmittal Sheet Errors</h3>
        <p>Formatting errors in the transmittal sheet, the first row of your HMDA file.</p>
      </caption>
      <thead>
        <tr>
          <th>Row</th>
          <th>Transmittal Sheet Errors</th>
        </tr>
      </thead>
      <tbody>
        {transmittalSheetErrors.map((tsError, i) => {
          return <tr key={i}><td>1</td><td>{tsError}</td></tr>
        })}
      </tbody>
    </table>
  )
}

const renderLarErrors= (larErrors) => {
  if(larErrors.length === 0) return null
  return (
    <table className="margin-bottom-0" id="parseErrors" width="100%">
      <caption>
        <h3>LAR Errors</h3>
        <p>Formatting errors in loan application records, arranged by row.</p>
      </caption>
      <thead>
        <tr>
          <th>Row</th>
          <th>Errors</th>
        </tr>
      </thead>
      <tbody>
        {larErrors.map((larErrorObj, i) => {
          return larErrorObj.errorMessages.map((message, i) => {
            return (
              <tr key={i}>
                <td>{larErrorObj.lineNumber}</td>
                <td>{message}</td>
              </tr>
            )
          })
        })}
      </tbody>
    </table>
  )
}

const ParseErrors = (props) => {
  const errorText = props.total > 1 ? 'Rows' : 'Row'

  return (
    <div className="ParseErrors usa-grid-full" id="parseErrors">
      <header>
        {props.total === null ? null : <h2>{props.total} {errorText} with Formatting Errors</h2>}
        <p className="usa-font-lead">The uploaded file is not formatted according to the requirements specified in the <a target="_blank" href="https://www.consumerfinance.gov/data-research/hmda/static/for-filers/2017/2017-HMDA-FIG.pdf">Filing Instructions Guide for data collected in 2017</a>.</p>
      </header>
      {renderTSErrors(props.transmittalSheetErrors)}
      {renderLarErrors(props.larErrors)}
      <Pagination target="parseErrors"/>
    </div>
  )
}

ParseErrors.propTypes = {
  transmittalSheetErrors: PropTypes.array,
  larErrors: PropTypes.array
}

export default ParseErrors
