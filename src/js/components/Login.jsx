import React, { Component } from 'react'

function forwardToLogin(){
    // set client_id and redirect_uri
    var clientInfo = {
        client_id : 'hmda-api-ui',
        redirect_uri: 'http://localhost:8080/institutions'
    };
    OIDC.setClientInfo( clientInfo );
    
    // set Identity Provider configuration information using discovery
    var providerInfo = OIDC.discover('https://192.168.99.100:8443/auth/realms/hmda');
    
    // set Identity Provider configuration
    OIDC.setProviderInfo( providerInfo );
    
    // store configuration for reuse in the callback page
    OIDC.storeInfo(providerInfo, clientInfo);
    
    // Redirect to login
    // login with default scope=openid, response_type=id_token
    //OIDC.login();
    console.log('redirecting')
    OIDC.login( {
              scope : 'openid profile email',
              response_type : 'id_token token',
              max_age : 60//,
              //claims : {
              //           id_token : ['email', 'phone_number'],
              //           userinfo : ['given_name', 'family_name']
              //         }
             }
    );
}

export default class Login extends Component {
  constructor(props) {
      super(props)
  }

  componentDidMount() {

    console.log(this.props)
    if(this.props.idToken && this.props.accessToken){
      console.log('PUSHING')
      this.props.router.push('/institutions')
    }else{
      OIDC.restoreInfo();
    }
  }

  render() {
    return (
      <div className="Login">
        <h2>Welcome to HMDA Filing, please <a href="#" onClick={forwardToLogin}>login here</a></h2>
      </div>
    )
  }
}
