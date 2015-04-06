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

## Web App

### Build & development

The web part of the  project was originally generated with [yo angular
generator](https://github.com/yeoman/generator-angular) version 0.11.1.

Run `grunt build` for building and `grunt serve` for preview.


### Testing

Running `grunt test` will run the unit tests with karma.

## API

