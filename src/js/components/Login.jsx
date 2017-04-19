import React, { PropTypes } from 'react'

const Login = (props) => {
  return (
    <div className="Login">
      <h2>Welcome to HMDA Filing, please <a href="#" onClick={props.redirect}>login here</a></h2>
    </div>
  )
}

Login.propTypes = {
  redirect: PropTypes.func
}

export default Login
