import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import SubmissionContainer from './Submission.jsx'
import fetchSubmission from '../actions/fetchSubmission.js'
import {
  UNINITIALIZED,
  VALIDATED_WITH_ERRORS,
  FAILED
} from '../constants/statusCodes.js'

const editTypes = ['syntacticalvalidity', 'quality', 'macro']

export class SubmissionRouter extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.renderChildren = false
    if(!this.props.status || this.props.status.code === UNINITIALIZED) {
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
    if(!this.props.status) return null


    const status = this.props.status
    const code = status.code
    const splat = this.props.params.splat

    this.renderChildren = true

    if(code === FAILED){
      return (
      <div className="SubmissionContainer">
        <p>{status.message}</p>
      </div>
      )
    }

    if(code < VALIDATED_WITH_ERRORS || splat === 'upload' ) return this.replaceHistory('upload')

    if(code === VALIDATED_WITH_ERRORS) {
      if(editTypes.includes(splat)) {
        return this.forceUpdate()
      }
      return this.replaceHistory('syntacticalvalidity')
    }

    if(splat) return this.forceUpdate()
    return this.replaceHistory('confirmation')
  }

  render() {
    if(!this.props.status || this.props.status.code === UNINITIALIZED) return null
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

  const params = ownProps.params

  return {
    status,
    params
  }
}

SubmissionRouter.defaultProps = {
  status: null
}

export default connect(mapStateToProps, dispatch => {return {dispatch}})(SubmissionRouter)
