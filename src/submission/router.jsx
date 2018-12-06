import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import SubmissionContainer from './container.jsx'
import ErrorWarning from '../common/ErrorWarning.jsx'
import Loading from '../common/Loading.jsx'
import fetchSubmission from '../actions/fetchSubmission.js'
import fetchEdits from '../actions/fetchEdits.js'
import refreshState from '../actions/refreshState.js'
import setInstitution from '../actions/setInstitution.js'
import updateFilingPeriod from '../actions/updateFilingPeriod.js'
import suppressEdits from '../actions/suppressEdits.js'
import {
  UNINITIALIZED,
  VALIDATING,
  SYNTACTICAL_VALIDITY_EDITS,
  QUALITY_EDITS,
  VALIDATED
} from '../constants/statusCodes.js'

const editTypes = ['syntacticalvalidity', 'quality', 'macro']
const submissionRoutes = ['upload', ...editTypes, 'submission']

export class SubmissionRouter extends Component {
  componentDidMount() {
    this.renderChildren = false
    const { submission, params, dispatch } = this.props
    const status = submission.status

    if (!params.institution || !params.filing) {
      return this.goToAppHome()
    }

    const unmatchedId =
      submission.id && submission.id.institutionId !== params.institution

    if (unmatchedId) dispatch(refreshState())

    dispatch(setInstitution(params.institution))
    dispatch(updateFilingPeriod(params.filing))

    const size = localStorage.getItem(`HMDA_FILE_SIZE/${params.institution}`)
    //  if (size > 5e6) dispatch(suppressEdits())

    if (unmatchedId || !status || status.code === UNINITIALIZED) {
      return dispatch(fetchSubmission()).then(json => {
        if (this.editsNeeded()) {
          dispatch(fetchEdits()).then(json => {
            this.route()
          })
        } else {
          this.route()
        }
      })
    }

    if (this.editsNeeded()) {
      return dispatch(fetchEdits()).then(json => {
        this.route()
      })
    }

    this.route()
  }

  editsNeeded() {
    const { submission } = this.props
    return (
      submission.status.code > VALIDATING && submission.status.code < VALIDATED
    )
  }

  replaceHistory(splat) {
    const { institution, filing } = this.props.params
    return browserHistory.replace(
      `/filing/2018/${institution}/${filing}/${splat}`
    )
  }

  goToAppHome() {
    return browserHistory.replace('/filing/2018/')
  }

  getLatestPage() {
    const status = this.props.submission.status
    const code = status.code
    const types = this.props.types
    const synvalExist = false
    const qualityExist = false

    if (code <= VALIDATING) return 'upload'
    if (code >= VALIDATED) return 'submission'
    if (code === SYNTACTICAL_VALIDITY_EDITS) return 'syntacticalvalidity'
    if (code === QUALITY_EDITS) return 'quality'
    return 'macro'
  }

  route() {
    const status = this.props.submission.status
    const code = status.code
    const splat = this.props.params.splat
    const latest = this.getLatestPage()

    this.renderChildren = true

    if (!splat) {
      return this.replaceHistory(latest)
    }

    if (submissionRoutes.indexOf(splat) === -1) {
      return this.goToAppHome()
    }

    if (code <= VALIDATING)
      if (splat === 'upload') return this.forceUpdate()
      else return this.replaceHistory('upload')

    if (code >= VALIDATING && code <= VALIDATED) {
      if (splat === latest) return this.forceUpdate()
      else if (
        submissionRoutes.indexOf(splat) > submissionRoutes.indexOf(latest)
      ) {
        return this.replaceHistory(latest)
      }
    }

    return this.forceUpdate()
  }

  render() {
    const { submission, params } = this.props

    if (
      submission.status.code === UNINITIALIZED ||
      submission.id.lei !== params.institution ||
      !this.renderChildren ||
      !params.splat
    )
      return <Loading className="floatingIcon" />
    return <SubmissionContainer {...this.props} />
  }
}

export function mapStateToProps(state, ownProps) {
  const { submission } = state.app
  const { types } = state.app.edits

  const { params } = ownProps

  return {
    submission,
    types,
    params
  }
}

export default connect(mapStateToProps)(SubmissionRouter)
