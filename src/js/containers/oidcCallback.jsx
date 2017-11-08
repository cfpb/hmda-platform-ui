import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { set } from '../api/AccessToken.js'
import { restorePage, getUserManager } from '../utils/redirect'
import LoadingIcon from '../components/LoadingIcon.jsx'

export class oidcCallback extends React.Component {
  successCallback(user) {
    set(user.access_token)
    restorePage()
  }

  errorCallback(e) {
    browserHistory.replace('/')
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
    if (!this.props.location.hash) return null
    return <LoadingIcon className="floatingIcon" />
  }
}

export default connect()(oidcCallback)
