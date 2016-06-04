#!/bin/bash

id|grep www-data
if [[ $? -eq 1 ]]; then
        echo please run as www-data
        exit 1
fi

echo updating code..
git pull
npm install
cd web
npm install
bower install

echo building..
grunt clean build karma

echo stopping node server..
cd ../server
pm2 stop 0
pm2 delete 0
echo Ready to restart node server.. please run ./startup.sh <mongodb>
