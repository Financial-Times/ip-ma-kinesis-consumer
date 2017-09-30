#!/usr/bin/env bash

set -e
cd "$(dirname "$0")/.." || exit 10
PATH=$(npm bin):$PATH

./bin/render-properties.js ./deploy/app.tpl.properties
