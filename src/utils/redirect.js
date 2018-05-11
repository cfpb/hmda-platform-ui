/* global HMDA_ENV */
import { browserHistory } from 'react-router'
import log, { error } from '../utils/log.js'
import isRedirecting from '../actions/isRedirecting.js'

let userManager = null
let dispatch = () => {}

const setUserManager = manager => {
  userManager = manager
}

const getUserManager = () => {
  return userManager
}

const setDispatch = fn => {
  dispatch = fn
}

const register = (path = location.pathname) => {
  if (!userManager)
    return error('userManager needs to be set on app initialization')
  userManager.settings.metadataService.getAuthorizationEndpoint = () =>
    Promise.resolve(
      `${HMDA_ENV.KEYCLOAK_URL}/protocol/openid-connect/registrations`
    )
  signinRedirect(path)
}

const signinRedirect = (path = location.pathname) => {
  if (!userManager)
    return error('userManager needs to be set on app initialization')
  log('signinRedirect triggered, saving page:', location.pathname)
  localStorage.setItem('hmdaPageBeforeSignin', path)
  dispatch(isRedirecting(true))
  userManager.signinRedirect()
}

const restorePage = () => {
  const restored = localStorage.getItem('hmdaPageBeforeSignin')
  localStorage.removeItem('hmdaPageBeforeSignin')
  log('restoring page to', restored)
  browserHistory.replace(restored)
}

const logout = () => {
  if (!userManager)
    return error('userManager needs to be set on app initialization')
  browserHistory.push(HMDA_ENV.APP_SUFFIX)
  userManager.signoutRedirect()
}

export {
  register,
  signinRedirect,
  restorePage,
  logout,
  setUserManager,
  getUserManager,
  setDispatch
}
