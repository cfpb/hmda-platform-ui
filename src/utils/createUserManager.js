import { UserManager } from 'oidc-client'
import { set } from '../api/AccessToken.js'
import makeAction from '../actions/makeAction.js'
import {
  USER_EXPIRED,
  SILENT_RENEW_ERROR,
  USER_FOUND,
  SESSION_TERMINATED,
  USER_SIGNED_OUT
} from '../constants'

const createUserManager = dispatch => {
  if (!dispatch) return new UserManager()

  const keycloak =  window.HMDA_ENV.KEYCLOAK_URL
  const app = window.HMDA_ENV.FILING_APP_URL

  const manager = new UserManager({
    authority: keycloak,
    client_id: 'hmda-api',
    redirect_uri: app + 'oidc-callback',
    silent_redirect_uri: app + 'silent_renew.html',
    post_logout_redirect_uri: app,
    automaticSilentRenew: true,
    scope: 'openid profile',
    response_type: 'id_token token',
    monitorSession: false,
    clockSkew: 60 * 10
  })

  attachEvents(manager, dispatch)

  return manager
}

const eventToActionMap = {
  addAccessTokenExpired: USER_EXPIRED,
  addSilentRenewError: SILENT_RENEW_ERROR,
  addUserLoaded: USER_FOUND,
  addUserUnloaded: SESSION_TERMINATED,
  addUserSignedOut: USER_SIGNED_OUT
}

const attachEvents = (manager, dispatch) => {
  Object.keys(eventToActionMap).forEach(key => {
    manager.events[key](arg => {
      if (key === 'addUserLoaded') set(arg.access_token)
      dispatch(makeAction(eventToActionMap[key], arg))
    })
  })
}

export default createUserManager
