import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ProgressText from './ProgressText.jsx'
import * as STATUS from '../../constants/statusCodes.js'

import './ValidationProgress.css'

const isErrored = props => {
  return (
    props.code === STATUS.PARSED_WITH_ERRORS ||
    props.errorUpload ||
    props.errorApp
  )
}

const getFillError = props => {
  if (isErrored(props)) return 'error'
  return ''
}

const getFillWidth = props => {
  const progress = props.progress[props.target]
  let width = 100 * progress.processed / progress.total
  if (isErrored(props) || props.code > STATUS.VALIDATING) {
    width = 100
  }

  return width
}

const makeLabel = props => {
  const target = props.target
  const progress = props.progress[target]
  const units = target === 'uploading' ? 'bytes' : 'rows'
  let label = target
  if (progress.processed >= progress.total) label = label.slice(0,-3) + 'ed'

  let counter = ` ${progress.processed} / ${progress.total} ${units}`

  if (progress.total === 0) counter = ''

  return (
    <b>
      <span>{label}</span>
      {counter}
    </b>
  )

}

const ValidationProgress = props => {
  console.log('vp render', props)
  const { code, target, uploading } = props

  if (code < STATUS.UPLOADING && !uploading) return null
  if (code < STATUS.PARSING && target === 'parsing') return null
  if (code < STATUS.VALIDATING && target === 'validating') return null

  return (
    <section className="ValidationProgress">
      {makeLabel(props)}
      {/* the background bar */}
      <div className="progressTotal" />
      {/* the progress bar */}
      <div
        className={`progressFill ${getFillError(props)}`}
        style={{ width: getFillWidth(props) + '%' }}
      />
    </section>
  )
}

ValidationProgress.propTypes = {
target: PropTypes.string,
code: PropTypes.number,
errorApp: PropTypes.object,
errorUpload: PropTypes.object,
id: PropTypes.string,
uploading: PropTypes.bool
}

export default ValidationProgress
