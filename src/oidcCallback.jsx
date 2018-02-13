import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { set } from './api/AccessToken.js'
import { restorePage, getUserManager } from './utils/redirect'
import receiveError from './actions/receiveError.js'
import Loading from './common/Loading.jsx'
import Alert from './common/Alert.jsx'

export class oidcCallback extends React.Component {
  successCallback(user) {
    set(user.access_token)
    restorePage()
  }

  errorCallback(e) {
    this.props.dispatch(receiveError(e))
  }

  renderError() {
    return (
      <Alert type="error" heading={this.props.error.message}>
        <div>
          We encountered the above problem logging you in. Please ensure:
          <ul>
            <li>this site is not being blocked or filtered by your firewall</li>
            <li>
              browser extensions that modify your web traffic are disabled
            </li>
            <li>the local time on your computer is set accurately</li>
          </ul>
          <p style={{ marginBottom: '0.5em' }}>
            Please <a href={window.HMDA_ENV.APP_URL}>
              return to the home page
            </a>{' '}
            and try again. If the problem persists, contact{' '}
            <a href="mailto:hmdahelp@cfpb.gov">HMDA Help</a>.
          </p>
        </div>
      </Alert>
    )
  }

  componentWillMount() {
    if (!this.props.location.hash) browserHistory.replace('/')
  }

  componentDidMount() {
    getUserManager()
      .signinRedirectCallback()
      .then(user => this.successCallback(user))
      .catch(error => this.errorCallback(error))
  }

  render() {
    if (this.props.error) return this.renderError()
    return <Loading className="floatingIcon" />
  }
}

export function mapStateToProps(state) {
  const { error } = state.app
  return { error }
}
export default connect(mapStateToProps)(oidcCallback)
