#!/bin/bash
envvars=( 'NVM_DIR' 'GOPATH' 'oi' )
len=$(expr ${#envvars[@]} - 1)

echo '{' > dist/env.json
for envvar in "${envvars[@]}"
do
  eval curr=\$$envvar

  echo "Setting $envvar to $curr"
  line="\"$envvar\": \"$curr\""

  if [ $envvar != ${envvars[$len]} ]; then
    line+=","
  fi  

  echo "$line" >> dist/env.json
done
echo '}' >> dist/env.json
