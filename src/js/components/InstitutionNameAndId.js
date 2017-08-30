import React from 'react'
import PropTypes from 'prop-types'

const InstitutionNameAndId = props => {
  return (
    <h3>{props.name} - {props.id}</h3>
  )
}

InstitutionNameAndId.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string
}

export default InstitutionNameAndId
