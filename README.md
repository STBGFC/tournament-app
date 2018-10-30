[![Build Status](https://travis-ci.org/STBGFC/tournament-app.svg)](https://travis-ci.org/STBGFC/tournament-app)
[![Dependency Status](https://david-dm.org/STBGFC/tournament-app.svg)](https://david-dm.org/STBGFC/tournament-app)
[![devDependency Status](https://david-dm.org/STBGFC/tournament-app/dev-status.svg)](https://david-dm.org/STBGFC/tournament-app#info=devDependencies)
# STBGFC Tournament App

An api and SPA built using Vue.js, Node, Express and Mongodb used to distribute
scores and update league tables during the football tournaments held at STBGFC.

The remainder of this text is aimed at developers contributing to the project
or wishing to customise it for their own use.

## Pre-requisites

After cloning the repo, ensure you have done a `npm install -g vue-cli mocha`

## Project Structure

The API (Node/Express application) is within the `server` directory off the
project root, the Vue.js front-end is in the `src` directory.  Run
`npm install` to pull in the build and runtime dependencies.

Inside the `server/test` directory, you can use the `testdb-seed.js` file to 
populate a mongo database locally in order to get started.  Running 
`npm run pretest:server` will also apply this script to a local mongo db named 
"tournament-auto-tests".

## Server

### Running

The API is an [Express](https://www.npmjs.org/package/express) application that
creates a RESTful interface to the data stored in a MongoDB.

To run the server up quickly, `npm start:server`, but note the secret key will
be insecure.  This method will create (if needed), and pre-seed a test database
that can be used with the api tests or the e2e web tests.  If you want to start
up with a different database, or you're running in production, use the provided
`startup.sh` script which generates a secure key for the JWT digest and allows
you to specify the mongo URL and the node environment (i.e. `dev` or `prod`)

### Testing

`npm test` will run the mocha test suite for the API using a backend invoked
via the [supertest](https://www.npmjs.org/package/supertest) framework.  The
`npm test` command will also cause the `tournament-auto-tests` database to be
seeded with the initial test data used by API and web e2e tests.


## Web App

### Build & development

The web part of the  project was originally generated with [yo angular
generator](https://github.com/yeoman/generator-angular) version 0.11.1.

Run `grunt build` for building production artifacts, including minified
and CDNified resources. `grunt serve` for dev preview.

You can get a lot of front-end customisation done simply by changing the CSS in
the file `branding.css` and supplying your own images and icons.  Most of the
CSS in `structure.css` affects layouts and functional parts of the display and 
in most cases you won't need or want to modify it for branding.


### Testing

Running `grunt test` will run the unit tests with karma and the e2e tests with
protractor.  For the e2e tests a backend API will need to be running (see
above).  `grunt watch` will auto run tests as the code changes.

## Contributing

Any and all contributions will be gratefully received, whether it's a bug report,
feature request, code or test improvement, documentation or suggestions.  There
are a number of open issues and backlog requests you can take a look at (I use [waffle.io](https://waffle.io/STBGFC/tournament-app) to provide a Kanban board from 
the github issues)

Please get in touch if you're interested in helping out.
