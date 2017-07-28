import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { signinRedirect } from '../utils/redirect.js'

export default class LoggedOutModal extends Component {

  render() {
    return (
      <div className="modal-blurred-blocker showing-blurred-blocker">
        <section role="dialog" className="modal">
          <h2>HMDA Filing</h2>
          <hr/>
          <div className="modal-contents">
            <h3>Your session has timed out.</h3>
            <p>Your work has been saved. Please log in again.</p>
            <button
              ref={button => this.loginButton = button}
              tabIndex={0}
              onBlur={e => {
                e.preventDefault()
                this.loginButton.focus()
              }}
              onClick={e => {
                e.preventDefault()
                signinRedirect()
              }}>
              Log in
              </button>
          </div>
        </section>
      </div>
    )
  }
}
