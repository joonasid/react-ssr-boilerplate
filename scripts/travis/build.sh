#!/bin/bash

set -o errexit

export NODE_ENV=test
yarn install
yarn build
