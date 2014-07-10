# hapi-logentries 
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image]

Hapi plugin for logging to to logentries

Basically you add your logentries token and app name to the options, and it will start logging to the console and the channel you provide.

It currently has a very narrow focus, but it would be easy to make it do more.

See the example server.js for how to use it.

## Install
You will need to point your package.json to this repo, or a fork until it is cleaned up for npm release.

_(Coming soon)_
```bash
$ npm install --save git://github.com/lyric/hapi-logentries.git
```

```javascript
var options = {
        token: '000token111',
        appName: "MyApp"
    };

server.pack.register({
        plugin: require("../index.js"),
        options: options
    }
    , function(err) {
        if (err) throw err;
        server.start(function() {
        console.log("Hapi server started @ " + server.info.uri);
    });
});
```

## Contributing
Currently this is very basic for my needs, PRs are welcome

## Release History

_(Nothing yet)_


## License

Copyright (c) 2014 Lyric Hartley. Licensed under the MIT license.


[npm-url]: https://npmjs.org/package/hapi-logentries
[npm-image]: https://badge.fury.io/js/hapi-logentries.svg
[travis-url]: https://travis-ci.org/lyric/hapi-logentries
[travis-image]: https://travis-ci.org/lyric/hapi-logentries.svg?branch=master
[daviddm-url]: https://david-dm.org/lyric/hapi-logentries.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/lyric/hapi-logentries
