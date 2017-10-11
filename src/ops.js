/*!
 * dockerops
 * Copyright(c) 2016-2017 Javanile.org
 * MIT Licensed
 */

var base = require("path").basename;
var join = require("path").join;
var util = require("./util");

module.exports = {

    /**
     * Contain current working direcotry.
     * @var string
     */
    cwd: process.cwd(),

    /**
     *
     * @param args
     */
    cmdUp: function (args, callback) {
        var params = ["up"];
        params.push("-d");
        if (args) {
            params = params.concat(args);
        }
        return this.compose(params, callback);
    },

    /**
     *
     * @param args
     */
    cmdPs: function (args, callback) {
        var params = ["ps"];
        //params.push("-d");
        return this.compose(params, false, callback);
    },

    /**
     *
     * @param args
     */
    cmdRun: function (args, callback) {
        var params = ["run"];
        //params.push("-d");
        if (args) {
            params = params.concat(args);
        }

        return this.compose(params, false, callback);
    },

    /**
     *
     * @param params
     * @param callback
     */
    compose: function (params, callback) {
        var compose =  + params.join(" ");

        util.exec("docker-compose", params, function (output) {
            callback(output);
        });

        console.log(compose);
        return compose;
    }
}