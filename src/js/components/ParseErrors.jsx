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
  return (
    <div className="ParseErrors usa-grid-full" id="parseErrors">
      <div className="padding-2 bg-color-gray-lightest">
        <h2 className="margin-top-0">Parsing Errors</h2>
        <p className="usa-font-lead margin-top-half margin-bottom-0">There are errors that prevented your file from being validated. You must fix these errors and re-upload your file.</p>
      </div>

      <div className="border margin-bottom-5 padding-1">
        <table className="margin-bottom-0" width="100%">
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
    </div>
  )
}

ParseErrors.propTypes = {
  transmittalSheetErrors: PropTypes.array,
  larErrors: PropTypes.array
}

export default ParseErrors
