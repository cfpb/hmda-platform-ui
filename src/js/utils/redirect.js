import { browserHistory } from 'react-router'

let userManager = null

const setUserManager = manager => {
  userManager = manager
}

const getUserManager = () => {
  return userManager
}

const signinRedirect = () => {
  if(!userManager) return console.error('userManager needs to be set on app initialization')
  if(process.env.NODE_ENV !== 'production') console.log('signinRedirect triggered, saving page:', location.pathname)
//  localStorage.setItem('hmdaPageBeforeSignin', location.pathname)
//  userManager.signinRedirect()
  userManager.signinSilent()
  userManager.signinSilentCallback().then(arg => {
    console.log('SIGNING IN SILENTLY')
  })
}


const restorePage = () => {
  const restored = localStorage.getItem('hmdaPageBeforeSignin')
  localStorage.removeItem('hmdaPageBeforeSignin')
  if(process.env.NODE_ENV !== 'production') console.log('restoring page to', restored)
  browserHistory.replace(restored)
}

const logout = () => {
 if(!userManager) return console.error('userManager needs to be set on app initialization')
 browserHistory.push('/')
 userManager.signoutRedirect()
}

export {
  signinRedirect,
  restorePage,
  logout,
  setUserManager,
  getUserManager
}
