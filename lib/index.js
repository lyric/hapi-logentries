/*
 * hapi-logentries
 * https://github.com/lyric/hapi-logentries
 *
 * Copyright (c) 2014 Lyric Hartley
 * Licensed under the MIT license.
 */

'use strict';

// Load modules
//Fs = require('fs');
var Hoek = require('hoek');
var bunyan = require('bunyan');
var bunyanLogentries = require('bunyan-logentries');

var internals = {

};

// Defaults
internals.defaults = {
    token: '123abc',
    appName: 'set_the_appName'
};

exports.register = function(plugin, options, next) {

    var settings = Hoek.applyToDefaults(internals.defaults, options);

    var logger = bunyan.createLogger({
        name: settings.appName,
        streams: [
            {
                level: 'info',
                stream: process.stdout    // log INFO and above to stdout
            },
            {
                level: 'info',
                stream: bunyanLogentries.createStream({token: settings.token}),
                type: 'raw'
            }
        ]

    });

    plugin.events.on("log", function(event) {
        logger.info(event);
    });

    plugin.events.on('request', function (request, event, tags) {
        if (tags.info || tags.received) { logger.info(event);}
        if (tags.error) { logger.error(event);}
    });

    next();
};

exports.register.attributes = {
    pkg: require('../package.json')
};