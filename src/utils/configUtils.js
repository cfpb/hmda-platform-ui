const CONFIG_URL = 'https://raw.githubusercontent.com/cfpb/hmda-platform/master/frontend/config.json'

export function fetchEnvConfig() {
  return fetch(CONFIG_URL).then(data => data.json())
}

export function isProd(host){
  return !!host.match('^ffiec')
}

export function isBeta(host){
  return !!host.match('beta')
}

export function getEnvConfig(config, host){
  let env = isProd(host) ? {...config.prod} : {...config.dev}
  if(isBeta(host)) env = {...env.beta}
  return env
}
