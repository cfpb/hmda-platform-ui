#!/bin/bash
set -e
./env.sh && nginx -g "daemon off;"
