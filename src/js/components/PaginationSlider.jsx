import React from 'react'

const makeTable = (className, pagination) => {

  const rows = []
  for(var i=0; i<pagination.count; i++) {
    rows.push(0)
  }

  return (
    <table className={className}>
      <thead>
        <tr>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
      {rows.map((v, i) => {
        return (
          <tr key={i}>
            <td>&nbsp;</td>
          </tr>
        )
     })}
      </tbody>
    </table>
  )
}

const PaginationSlider = props => {
  let prevClass = 'PaginationPrev'
  let centerClass = 'PaginationTarget'
  let nextClass = 'PaginationNext'

  if(props.paginationSlide === 'left'){
    centerClass += ' slideLeft'
    nextClass += ' slideLeft'
  }else if(props.paginationSlide === 'right'){
    prevClass += ' slideRight'
    centerClass += ' slideRight'
  }

  centerClass = props.children.props.className ?  `${props.children.className} ${centerClass}` : centerClass
  props.children.props.className = centerClass

  return (
   <div className="PaginationTargetWrapper">
      {makeTable(prevClass, props.pagination)}
      {props.children}
      {makeTable(nextClass, props.pagination)}
   </div>
  )
}

export default PaginationSlider
