#!/bin/bash

git pull
npm install
cd web
npm install
bower install
grunt build
cd ..

echo Ready..
