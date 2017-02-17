import React, { PropTypes } from 'react'

const getClass = (groupByRow) => {
  if(groupByRow) return 'usa-button usa-button-active usa-text-small'
  return 'usa-button usa-text-small'
}

const SortPicker = (props) => {
  const groupByRow = props.groupByRow
  return (
    <div className="SortPicker">
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
