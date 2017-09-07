import React from 'react'
import PropTypes from 'prop-types'

const InstitutionNameAndId = ({ name, id }) => {
  return (
    <h3>{name} - {id}</h3>
  )
}

InstitutionNameAndId.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string
}

export default InstitutionNameAndId
