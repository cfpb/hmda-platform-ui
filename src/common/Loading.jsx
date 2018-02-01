import React from 'react'

const LoadingIcon = props => {
  let className = 'LoadingIconWrapper'
  if (props.className) className += ' ' + props.className
  return (
    <div className={className}>
      <img src="/img/LoadingIcon.png" className="LoadingIcon" alt="Loading" />
    </div>
  )
}

export default LoadingIcon
