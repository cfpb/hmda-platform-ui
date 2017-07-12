import React from 'react'
import Alert from './Alert.jsx'

const browserList = (
  <nav role="navigation">
    <ul>
      <li>
        <a href="https://www.google.com/chrome/browser/desktop/">Chrome</a>
      </li>
      <li><a href="https://www.mozilla.org/en-US/firefox/">Firefox</a></li>
      <li>
        <a href="https://support.microsoft.com/en-us/help/17621/internet-explorer-downloads">
          Edge
        </a>
      </li>
      <li>
        <a href="https://support.microsoft.com/en-us/help/17621/internet-explorer-downloads">
          Internet Explorer 11
        </a>
      </li>
      <li><a href="https://support.apple.com/downloads/safari">Safari</a></li>
    </ul>
  </nav>
)

const BrowserBlocker = () => {
  return (
    <section className="BrowserBlocker">
      <Alert
        type="error"
        heading="Sorry, your browser is out of date."
        text="To file HMDA data securely, please use one of the modern browsers listed below:"
        htmlElement={browserList}
      />
    </section>
  )
}

export default BrowserBlocker
