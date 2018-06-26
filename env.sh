#!/bin/bash

get_baseurl () {
  local proto=$(echo ${1} | sed -e's,^\(.*://\).*,\1,g')
  local baseUrl=$(echo ${1} | awk -F/ '{print $3}')
  echo "${proto}${baseUrl}"
}

KEYCLOAK_SERVER=$(get_baseurl ${KEYCLOAK_URL})
HMDA_API_SERVER=$(get_baseurl ${HMDA_API})

files=($(ls ./dist/js/*.js 2>/dev/null))
  for i in "${files[@]}"
  do
    if [ -f "$i.bak" ]; then
      sed \
        -e "s@##HOMEPAGE_URL##@${HOMEPAGE_URL:-https://192.168.99.100}@"\
        -e "s@##FILING_APP_URL##@${FILING_APP_URL:-https://192.168.99.100/filing/}@"\
        -e "s@##HMDA_API##@${HMDA_API:-https://192.168.99.100:4443/hmda}@"\
        -e "s@##KEYCLOAK_URL##@${KEYCLOAK_URL:-https://192.168.99.100:8443/auth/realms/hmda}@"\
        "$i.bak" > "$i"
    else
      sed -i.bak \
        -e "s@##HOMEPAGE_URL##@${HOMEPAGE_URL:-https://192.168.99.100}@"\
        -e "s@##FILING_APP_URL##@${FILING_APP_URL:-https://192.168.99.100/filing/}@"\
        -e "s@##HMDA_API##@${HMDA_API:-https://192.168.99.100:4443/hmda}@"\
        -e "s@##KEYCLOAK_URL##@${KEYCLOAK_URL:-https://192.168.99.100:8443/auth/realms/hmda}@"\
        "$i"
    fi
  done

if [ -f /etc/nginx/nginx.tmpl ]; then
  sed \
  -e "s@##APP_SERVER##@${HOMEPAGE_URL:-https://192.168.99.100}@g"\
  -e "s@##KEYCLOAK_SERVER##@${KEYCLOAK_SERVER:-https://192.168.99.100:8443}@g"\
  -e "s@##HMDA_API_SERVER##@${HMDA_API_SERVER:-https://192.168.99.100:4443}@g"\
  /etc/nginx/nginx.tmpl > /etc/nginx/nginx.conf
fi
