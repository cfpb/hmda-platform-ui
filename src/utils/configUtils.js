const CONFIG_URL = 'https://raw.githubusercontent.com/cfpb/hmda-platform/master/frontend/config.json'

export function fetchEnvConfig() {
  return fetch(CONFIG_URL).then(data => data.json())
}
