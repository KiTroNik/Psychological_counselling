#!/bin/bash

SWITCH="${FE_CMD}"

START_VAR="start"
BUILD_VAR="build"

START_CMD="npm start"
BUILD_CMD="npm run build"


function run () {
    case ${SWITCH} in
        ${START_VAR})
            eval "${START_CMD}"
            ;;
        ${BUILD_VAR})
            eval "${BUILD_CMD}"
            ;;
        *)
            echo -e "Command ${SWITCH} not found."
            exit 1
        esac
}

run
