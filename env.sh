#!/bin/bash
sed \
  -e "s@##APP_URL##@${APP_URL:-https://192.168.99.100}@"\
  -e "s@##HMDA_API##@${HMDA_API:-https://192.168.99.100:4443/hmda}@"\
  -e "s@##KEYCLOAK_URL##@${KEYCLOAK_URL:-https://192.168.99.100:8443/auth/realms/hmda}@"\
  env.tmpl > ./dist/env.json

if [ -f /etc/nginx/nginx.tmpl ]; then
  sed \
  -e "s@##APP_SERVER##@${APP_SERVER:-https://192.168.99.100}@g"\
  -e "s@##KEYCLOAK_SERVER##@${KEYCLOAK_SERVER:-https://192.168.99.100:8443}@g"\
  -e "s@##HMDA_API_SERVER##@${HMDA_API_SERVER:-https://192.168.99.100:4443}@g"\
  /etc/nginx/nginx.tmpl > /etc/nginx/nginx.conf
fi
