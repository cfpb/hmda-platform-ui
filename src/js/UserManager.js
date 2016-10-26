import { createUserManager } from 'redux-oidc'

const userManager = createUserManager({
  authority: 'https://192.168.99.100:8443/auth/realms/hmda',
  client_id: 'hmda-api',
  redirect_uri: 'http://192.168.99.100/oidc-callback',
  scope: 'openid profile email',
  response_type: 'id_token token',
  automaticSilentRenew: true
})

//Mock client-side validation until Keycloak implements CORS on certs endpoint
userManager.settings.validator.validateSigninResponse = function(state, response){
  return Promise.resolve(response)
}

export default userManager
