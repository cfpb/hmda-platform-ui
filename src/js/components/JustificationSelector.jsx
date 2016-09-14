import React, { PropTypes } from 'react'
import Select from 'react-select'

const JustificationSelector = props => {
  const justifications = props.justifications.map((justification) => {
    return {
      ...justification,
      value: justification.label
    }
  })
  console.log(justifications)
  return (
    <Select multi={true} options={justifications}/>
  )
}

JustificationSelector.propTypes = {
  justifications: PropTypes.array
}

JustificationSelector.defaultProps = {
  justifications: []
}

export default JustificationSelector
