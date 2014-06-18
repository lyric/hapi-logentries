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
var Path = require('path');
var bunyan = require('bunyan');
var bunyanLogentries = require('bunyan-logentries');

var internals = {

};

// Defaults
internals.defaults = {
    token: 'abc123',
    appName: 'set_the_appName',
//    streams: [
//        {
//            level: 'info',
//            stream: process.stdout    // log INFO and above to stdout
//        }
//    ]
};

exports.register = function(plugin, options, next) {

    var settings = Hoek.applyToDefaults(internals.defaults, options);
    console.log(settings);


//     Hoek.assert(settings.streams, 'Invalid streams configuration');

    var selection = plugin.select('api');
//    console.log(selection.servers);

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

    })

    logger.info("testing the logger1");

    plugin.events.on("log", function(event, tags) {
            var tagsJoined = Object.keys(tags).join();
            var message = event.data;
            console.log("Log entry [" + tagsJoined + "] (" + (message || "") + ")");
        });

        logger.info("in the server.on");
    plugin.events.on('request', function (request, event, tags) {

            //    if (tags.error) {
            logger.info(event);
            //    }
        });



    plugin.route({
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
          reply('log it!');
        }
    });

    next();
};

exports.register.attributes = {
    pkg: require('../package.json')
};