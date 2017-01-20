import React, { PropTypes } from 'react'

const getClass = (groupByRow) => {
  if(groupByRow) return 'usa-button usa-button-active'
  return 'usa-button'
}

const SortPicker = (props) => {
  const groupByRow = props.groupByRow
  return (
    <div>
      <a
        className={getClass(!groupByRow)}
        href="#"
        onClick={(e)=>{
          e.preventDefault()
          if(groupByRow) props.toggle(groupByRow)
        }}>
        Group by Edit
      </a>
      <a
        className={getClass(groupByRow)}
        href="#"
        onClick={(e)=>{
          e.preventDefault()
          if(!groupByRow) props.toggle(groupByRow)
        }}>
        Group by Row
      </a>
    </div>
  )
}

SortPicker.propTypes = {
  groupByRow: PropTypes.bool,
  toggle: PropTypes.func
}

export default SortPicker
