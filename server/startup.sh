#!/bin/bash
#
# Example startup script for the node server.
#
# Notes:
#
#   Change the JWT_EXPIRES_IN_MINUTES to the number of minutes a 'session'
#   should last without having to re-authenticate.  The JWT secret key is
#   generated randomly with each server start to a 64 character string.
#
#   Pass the location of your mongo db to the script as the only arg.  This
#   will simply have "mongodb://" prepended to it.
#
#   The environment is set to 'prod' which means the server will NOT serve
#   files from the web application - you are expected to have an nginx or
#   apache server do that using the compressed/minified sources.
#
#   To shutdown the server, run:
#      kill $(cat /var/run/tournament-app.pid)
#
# ---------------------------------------------------------------------------
usage() {
    echo "Usage: $0 [location_of_mongo_db] <development|test|prod>"
    exit 1
}

[[ $# -gt 0 ]] || usage

env=$2
[[ "$env" == "" ]] && env=prod
pidfile=/var/run/tournament-app.pid

key=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 64 | head -n 1) 
JWT_EXPIRES_IN_MINUTES=600 \
  JWT_SECRET_KEY=$key \
  STBGFC_MONGO_URI=mongodb://$1 \
  NODE_ENV=$env \
  node app.js > /var/log/tournament-app.log & 2>&1

echo $! > $pidfile
cat $pidfile

