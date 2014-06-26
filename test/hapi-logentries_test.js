'use strict';

var Lab = require('lab'),
  Hapi = require('hapi');

var describe = Lab.experiment;
var it = Lab.test;
var expect = Lab.expect;
var before = Lab.before;
var after = Lab.after;

describe('hapiLogentries', function() {
    var server = new Hapi.Server('localhost', 8800);

    var options = {
        token: '0bfdfa51-4d68-46f3-9157-145eed6e8ad8',
        appName: "Tix"
    };

    it('Plugin successfully loads', function(done) {
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
        done();
    });

});
