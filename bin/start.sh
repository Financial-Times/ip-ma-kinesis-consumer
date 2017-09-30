#!/usr/bin/env bash

cd "$(dirname "$0")/.." || exit 10
PATH=$(npm bin):$PATH

steam_name="$1"
./node_modules/aws-kcl/bin/kcl-bootstrap -e -p ./app/${stream_name}.properties
