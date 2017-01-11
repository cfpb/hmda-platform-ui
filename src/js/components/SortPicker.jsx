import React, { PropTypes } from 'react'

const getText = (groupByRow) => {
  if(groupByRow) return 'Group by Edit'
  return 'Group by Row'
}

const getClass = (groupByRow) => {
  if(groupByRow) return 'usa-button usa-button-secondary'
  return 'usa-button'
}

const SortPicker = (props) => {
  const groupByRow = props.groupByRow
  return (
    <a
      className={getClass(groupByRow)}
      href="#"
      onClick={(e)=>{
        e.preventDefault()
        props.toggle(groupByRow)
      }}>
      {getText(groupByRow)}
    </a>
  )
}

SortPicker.propTypes = {
  groupByRow: PropTypes.bool,
  toggle: PropTypes.func
}

export default SortPicker
