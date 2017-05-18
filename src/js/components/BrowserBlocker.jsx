import React, { PropTypes } from 'react'


const BrowserBlocker = (props) => {
  return (
    <div className="BrowserBlocker usa-alert usa-alert-error">
      <div className="usa-alert-body">
        <h3 className="usa-alert-heading">Sorry, your browser is out of date.</h3>
        <p className="usa-alert-text">To file HMDA data securely, please use one of the modern browsers listed below:</p>
        <ul>
          <li><a href="https://www.google.com/chrome/browser/desktop/">Chrome</a></li>
          <li><a href="https://www.mozilla.org/en-US/firefox/">Firefox</a></li>
          <li><a href="https://support.microsoft.com/en-us/help/17621/internet-explorer-downloads">Edge</a></li>
          <li><a href="https://support.microsoft.com/en-us/help/17621/internet-explorer-downloads">Internet Explorer 11</a></li>
          <li><a href="https://support.apple.com/downloads/safari">Safari</a></li>
        </ul>
      </div>
    </div>
  )
}

export default BrowserBlocker
