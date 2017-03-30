#!/bin/bash
envvars=( 'APP_URL' 'HMDA_API' 'KEYCLOAK_URL' )
defaults=( 'http://192.168.99.100' 'https://192.168.99.100:4443/hmda' 'https://192.168.99.100:8443/auth/realms/hmda' )
len=$(expr ${#envvars[@]} - 1)

echo '{' > dist/env.json

for i in $(seq 0 "$len")
do
  envvar=${envvars[$i]}
  default=${defaults[$i]}
  eval curr=\${$envvar:-"$default"}

  echo "Setting $envvar to $curr"
  line="\"$envvar\": \"$curr\""

  if [ $envvar != ${envvars[$len]} ]; then
    line+=","
  fi  

  echo "$line" >> dist/env.json
done

echo '}' >> dist/env.json
