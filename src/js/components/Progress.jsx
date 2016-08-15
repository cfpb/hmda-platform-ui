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
    <div className="Progress">
      <span>{props.progress + ' of ' + props.total + ' ' +
        getUnits(props) + getDescriptor(props)}</span>
    </div>
  )
}

Progress.propTypes = {
  progress: PropTypes.number,
  total: PropTypes.number.isRequired,
  units: React.PropTypes.string.isRequired,
  singleUnit: React.PropTypes.string,
  descriptor: React.PropTypes.string
}

Progress.defaultProps = {
  progress: 0,
  descriptor: ''
}

export default Progress
