/*eslint no-restricted-globals: 0*/
import { error } from '../utils/log.js'
import isRedirecting from '../actions/isRedirecting.js'
import * as AccessToken from '../api/AccessToken.js'
let keycloak = null
let dispatch = () => {}

const setDispatch = fn => {
  dispatch = fn
}

const setKeycloak = cloak => {
  keycloak = cloak
}

const getKeycloak = () => {
  return keycloak
}

const login = (path = '/filing/2019/institutions') => {
  if (!keycloak) return error('keycloak needs to be set on app initialization')
  dispatch(isRedirecting(true))
  keycloak.login({ redirectUri: location.origin + path })
}

const refresh = () => {
  const updateKeycloak = () => {
    setTimeout(() => {
      keycloak
        .updateToken(20)
        .success(refreshed => {
          if (refreshed) {
            AccessToken.set(keycloak.token)
          }
          updateKeycloak()
        })
        .error(() => {
          return keycloak.login()
        })
    }, +(keycloak.tokenParsed.exp + '000') - Date.now() - 10000)
  }
  updateKeycloak()
}

const register = () => {
  if (!keycloak) return error('keycloak needs to be set on app initialization')

  dispatch(isRedirecting(true))
  var year = window.location.pathname.substring(8,12)
  keycloak.login({
    redirectUri: location.origin + '/filing/'+year+'/institutions',
    action: 'register'
  })
}

const logout = () => {
  var year = window.location.pathname.substring(8,12)
  if (!keycloak) return error('keycloak needs to be set on app initialization')
  keycloak.logout({ redirectUri: location.origin + '/filing/'+year+'/' })
}

export {
  setDispatch,
  getKeycloak,
  setKeycloak,
  register,
  login,
  logout,
  refresh
}
