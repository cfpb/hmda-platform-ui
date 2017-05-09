#!/bin/bash
sed -n '51p' index.js | grep -Eo '^[^(]+' | awk '{print $3".js"}'
