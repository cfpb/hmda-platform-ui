#!/bin/bash
sed \
  -e "s@##APP_URL##@${APP_URL:-http://192.168.99.100}@"\
  -e "s@##HMDA_API##@${HMDA_API:-https://192.168.99.100:4443/hmda}@"\
  -e "s@##KEYCLOAK_URL##@${KEYCLOAK_URL:-https://192.168.99.100:8443/auth/realms/hmda}@"\
  env.tmpl > env.json
