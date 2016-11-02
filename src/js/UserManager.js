import { createUserManager } from 'redux-oidc'

const userManager = createUserManager({
  authority: 'https://192.168.99.100:8443/auth/realms/hmda',
  client_id: 'hmda-api',
  redirect_uri: 'http://192.168.99.100/oidc-callback',
  silent_redirect_uri: 'http://192.168.99.100/silent_renew.html',
  automaticSilentRenew: true,
  scope: 'openid profile',
  response_type: 'id_token token'
})

export default userManager
