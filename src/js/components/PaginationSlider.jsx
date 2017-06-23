import React from 'react'

const makeTable = (className, {caption, pagination}) => {

  const rows = []
  for(var i=0; i<pagination.count; i++) {
    rows.push(0)
  }

  if(!rows.length) return null

  return (
    <table className={className}>
      {caption}
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
  const child = React.cloneElement(props.children, {className: centerClass})

  return (
   <div className="PaginationTargetWrapper">
      {makeTable(prevClass, props)}
      {child}
      {makeTable(nextClass, props)}
   </div>
  )
}

export default PaginationSlider
