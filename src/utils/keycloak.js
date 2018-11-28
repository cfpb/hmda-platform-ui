/*eslint no-restricted-globals: 0*/
import { browserHistory } from 'react-router'
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

const login = (path = '/filing/institutions')=> {
  if (!keycloak) return error('keycloak needs to be set on app initialization')
  dispatch(isRedirecting(true))
  keycloak.login({ redirectUri: location.origin + path })
}

const refresh = () => {
  const updateKeycloak = () => {
    setTimeout(() => {
      keycloak.updateToken().then(success => {
        if(!success) return keycloak.login()
        AccessToken.set(keycloak.token)
        updateKeycloak()
      })
    }, +(keycloak.tokenParsed.exp + '000') - Date.now() - 10000)
  }
  updateKeycloak()
}

const register = () => {
  if (!keycloak) return error('keycloak needs to be set on app initialization')

  dispatch(isRedirecting(true))
  keycloak.login({
    redirectUri: location.origin + '/filing/institutions',
    action: 'register'
  })
}

const logout = () => {
  if (!keycloak) return error('keycloak needs to be set on app initialization')
  keycloak.logout({ redirectUri: location.origin + '/filing' })
  browserHistory.push('/filing')
}

export { setDispatch, getKeycloak, setKeycloak, register, login, logout, refresh }
