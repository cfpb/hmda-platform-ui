import React, { PropTypes } from 'react'

const getUnits = props => {
  var singleUnit = props.singleUnit || props.units.slice(0, -1)
  return props.total === 1 ? singleUnit : props.units
}

const getDescriptor = props => {
  var descriptor = props.descriptor
  if(descriptor) descriptor = ' ' + descriptor
  return descriptor
}

const Progress = props => {
  return (
    <p className="Progress">{props.progress + ' of ' + props.total + ' ' +
        getUnits(props) + getDescriptor(props)}</p>
  )
}

Progress.propTypes = {
  progress: PropTypes.number,
  total: PropTypes.number.isRequired,
  units: PropTypes.string.isRequired,
  singleUnit: PropTypes.string,
  descriptor: PropTypes.string
}

Progress.defaultProps = {
  progress: 0,
  descriptor: ''
}

export default Progress
