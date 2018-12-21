import React from 'react'
import PropTypes from 'prop-types'

const InstitutionNameAndId = ({ name, lei }) => {
  return (
    <h3>
      {name} - {lei}
    </h3>
  )
}

InstitutionNameAndId.propTypes = {
  name: PropTypes.string,
  lei: PropTypes.string
}

export default InstitutionNameAndId
