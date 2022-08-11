#!/bin/bash

if [ $DEBUG ]; then
    poetry install
else
    poetry install --no-dev
fi
