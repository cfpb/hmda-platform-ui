import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import SubmissionContainer from './Submission.jsx'
import { fetchSubmission } from '../actions'

const editTypes = ['syntacticalvalidity', 'quality', 'macro']

export class SubmissionRouter extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.renderChildren = false
    if(!this.props.status || this.props.status.code === 0) {
      this.props.dispatch(fetchSubmission())
        .then((json) => {
          this.route()
        })
    } else {
      this.route()
    }
  }

  replaceHistory(splat) {
    const { institution, filing } = this.props.params
    return browserHistory.replace(
      `/${institution}/${filing}/${splat}`
    )
  }

  route() {
    if(!this.props.user) return null
    if(!this.props.status) return null


    const status = this.props.status
    const code = status.code
    const splat = this.props.params.splat

    this.renderChildren = true
  // status codes can be found at https://github.com/cfpb/hmda-platform/blob/master/Documents/submission-status.md

    if(code === -1){
      return (
      <div className="SubmissionContainer">
        <p>{status.message}</p>
      </div>
      )
    }

    if(code < 8 || splat === 'upload' ) return this.replaceHistory('upload')

    if(code === 8) {
      if(editTypes.includes(splat)) {
        return this.forceUpdate()
      }
      return this.replaceHistory('syntacticalvalidity')
    }

    if(splat) return this.forceUpdate()
    return this.replaceHistory('summary')
  }

  render() {
    if(!this.props.status || this.props.status.code === 0) return null
    if(!this.renderChildren) return null
    if(!this.props.params.splat) {
      setTimeout(()=>this.replaceHistory('upload'),0)
      return null
    }

    return <SubmissionContainer {...this.props}/>
  }
}

export function mapStateToProps(state, ownProps) {
  const {
    status
  } = state.app.submission || {
    status: null
  }

  const user = state.oidc && state.oidc.user || null
  const params = ownProps.params

  return {
    status,
    user,
    params
  }
}

SubmissionRouter.defaultProps = {
  user: null,
  status: null
}

export default connect(mapStateToProps, dispatch => {return {dispatch}})(SubmissionRouter)
