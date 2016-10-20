import React from 'react'



const Login = (props) => {
/*lk
    console.log(this.props)
    if(this.props.idToken && this.props.accessToken){
      console.log('PUSHING')
    }else{
    }
  }
*/
console.log(props)
  return (
    <div className="Login">
      <h2>Welcome to HMDA Filing, please <a href="#" onClick={props.forward}>login here</a></h2>
    </div>
  )
}

export default Login
