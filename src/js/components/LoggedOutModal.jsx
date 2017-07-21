import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { signinRedirect } from '../utils/redirect.js'

export default class LoggedOutModal extends Component {

  render() {
    return (
      <div className="confirmation-blurred-blocker showing-blurred-blocker">
        <section role="dialog" className="loggedOutModal">
          <div className="loggedOutContents">
            <h4>Your session has timed out.</h4>
            <p>Your work has been saved. Please log in again.</p>
            <button
              onClick={e => {
                e.preventDefault()
                signinRedirect()
              }}>
              </button>
          </div>
        </section>
      </div>
    )
  }
}
