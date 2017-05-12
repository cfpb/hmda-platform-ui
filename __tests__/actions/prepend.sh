#!/bin/bash
names=($(find *.js -type f | grep -Eo '[^/]{4,}'))

sed -i '' "1s|^|\\
|" "$1"

for i in "${names[@]}"
do
  echo "Adding $i to $1"
  sed -i '' "1s|^|import * as types from '../../src/js/constants'\\
|" "$1"
sed -i '' "1s|^|jest.unmock('../../src/js/actions/$i')\\
|" "$1"
done
