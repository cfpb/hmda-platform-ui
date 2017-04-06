import { createUserManager } from 'redux-oidc'

const UserManager = () => {
  const keycloak = window.HMDA_ENV.KEYCLOAK_URL
  const app = window.HMDA_ENV.APP_URL

  return createUserManager({
    authority: keycloak,
    client_id: 'hmda-api',
    redirect_uri: app + '/oidc-callback',
    silent_redirect_uri: app + '/silent_renew.html',
    post_logout_redirect_uri: app,
    automaticSilentRenew: true,
    scope: 'openid profile',
    response_type: 'id_token token',
    monitorSession: false
  })
}

export default UserManager
