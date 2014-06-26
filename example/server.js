/*
 * hapi-logentries
 * https://github.com/lyric/hapi-logentries
 *
 * Copyright (c) 2014 Lyric Hartley
 * Licensed under the MIT license.
 */

'use strict';

var Hapi = require('hapi');

var server = new Hapi.Server('localhost', 8000);

var options = {
        token: 'logentries-token',
        appName: "Tix"
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

server.route({
    path: "/log",
    method: "GET",
    handler: function(request, reply) {
        request.log(request.event);
        reply("Logged request to " + request.path);
    }
});