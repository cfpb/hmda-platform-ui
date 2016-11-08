import React from 'react'

const Login = (props) => {
  return (
    <div className="Login">
      <h2>Welcome to HMDA Filing, please <a href="#" onClick={props.redirect}>login here</a></h2>
    </div>
  )
}

export default Login
