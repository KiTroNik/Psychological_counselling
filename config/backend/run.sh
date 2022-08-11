#!/bin/bash

# shellcheck disable=SC2086
python /scripts/connection_test -w -t ${DB_HOST} -p ${DB_PORT}
