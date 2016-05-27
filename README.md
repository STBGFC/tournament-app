[![Stories in Ready](https://badge.waffle.io/STBGFC/tournament-app.png?label=ready&title=Ready)](https://waffle.io/STBGFC/tournament-app)
[![Build Status](https://travis-ci.org/STBGFC/tournament-app.svg)](https://travis-ci.org/STBGFC/tournament-app)
# tournament-app

A simple Node/Express API server with an HTML5 application used to distribute
scores and update league tables during the football tournaments held at STBGFC.

It includes a sockets based score update (and a 'videprinter' to ticker the
score updates as they are received) giving a simulated real-time update for
results and league tables.  The webapp can also display news and announcements
broadcast by the organisers.

If you wish to use the code, you can get a lot of front-end customisation done
simply by changing the CSS in the file `branding.css` and supplying your own
images and icons.  Most of the CSS in `structure.css` affects layouts and
functional parts of the display.

## Server

### Running

The API is an [Express](https://www.npmjs.org/package/express) application that
creates a RESTful interface to the data stored in a MongoDB.

To run the server up quickly, `npm start` should work, but the secret key
will be insecure.  In production, use the provided `startup.sh` script which
generates a secure key for the JWT digest.

### Testing

`npm test` will run the mocha test suite for the API, but you must already
have the server running (i.e. with `npm start` in a separate terminal).  This
is because the express app won't seem to start correctly if invoked by the 
[supertest](https://www.npmjs.org/package/supertest) framework.  PR's welcome :)


## Web App

### Build & development

The web part of the  project was originally generated with [yo angular
generator](https://github.com/yeoman/generator-angular) version 0.11.1.

Run `grunt build` for building production artifacts, including minified
and CDNified resources. `grunt serve` for dev preview.


### Testing

Running `grunt test` will run the unit tests with karma and the e2e tests with
protractor. For the e2e tests a backend API will need to be running (see
above).  `grunt watch` will auto run tests as the code changes.


