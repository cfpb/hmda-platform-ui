import React, { Component, PropTypes } from 'react'

const renderErrorMessages = (messages) => {
  return (
    <ul className="usa-unstyled-list">
      {
        messages.map((message, i) => {
          return <li key={i}>{message}</li>
        })
      }
    </ul>
  )
}

const renderData = (larError) => {
  let data

  return (
    Object.keys(larError).map((error, i) => {
      if(error === 'errorMessages') {
        // the error messages are in an array
        data = renderErrorMessages(larError[error])
      } else {
        // the row number
        data = larError[error]
      }
      return <td key={i}>{data}</td>
    })
  )
}

const renderTSErrors = (transmittalSheetErrors) => {
  if(transmittalSheetErrors.length === 0) return null
  return (
    <tr>
      <td>Transmittal Sheet</td>
      <td>
        <ul className="usa-unstyled-list" id="tsErrors">
          {transmittalSheetErrors.map((tsError, i) => {
            return <li key={i}>{tsError}</li>
          })}
        </ul>
      </td>
    </tr>
  )
}

const ParseErrors = (props) => {
  const count = props.transmittalSheetErrors.length + props.larErrors.length
  const errorText = count > 1 ? 'Errors' : 'Error'

  return (
    <div className="ParseErrors usa-grid-full" id="parseErrors">
      <header>
        <h2>{count} Parsing {errorText}</h2>
        <p className="usa-font-lead">There are errors that prevented your file from being validated. You must fix these errors and re-upload your file.</p>
      </header>
      <table width="100%">
        <thead>
          <tr>
            <th>Row</th>
            <th>Errors</th>
          </tr>
        </thead>
        <tbody>
          {renderTSErrors(props.transmittalSheetErrors)}
          {props.larErrors.map((larError, i) => {
            return <tr key={i}>{renderData(larError)}</tr>
          })}
        </tbody>
      </table>
    </div>
  )
}

ParseErrors.propTypes = {
  transmittalSheetErrors: PropTypes.array,
  larErrors: PropTypes.array
}

export default ParseErrors
