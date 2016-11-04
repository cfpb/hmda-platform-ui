import { createUserManager } from 'redux-oidc'
import { WebStorageStateStore } from 'oidc-client'

const userManager = createUserManager({
  authority: 'https://192.168.99.100:8443/auth/realms/hmda',
  client_id: 'hmda-api',
  redirect_uri: 'http://192.168.99.100/oidc-callback',
  silent_redirect_uri: 'http://192.168.99.100/silent_renew.html',
  automaticSilentRenew: true,
  scope: 'openid profile',
  response_type: 'id_token token',
  store: new WebStorageStateStore({store: localStorage})
})

userManager.events.addUserLoaded(user => console.log('USER LOADED', user))

export default userManager
