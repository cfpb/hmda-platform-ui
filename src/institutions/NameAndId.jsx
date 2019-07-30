import React from 'react'
import PropTypes from 'prop-types'

const InstitutionNameAndId = ({ name, lei, year }) => {
  return (
    <h3>
      {name} - {lei} - {year}
    </h3>
  )
}

InstitutionNameAndId.propTypes = {
  name: PropTypes.string,
  lei: PropTypes.string,
  year: PropTypes.string
}

export default InstitutionNameAndId
