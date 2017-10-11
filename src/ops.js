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
        return this.compose(params, true, callback);
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
     * @param params
     * @param callback
     */
    compose: function (params, showErrors, callback) {
        var compose = "docker-compose " + params.join(" ");

        util.exec(compose, showErrors, function (output) {
            callback(output);
        });

        return compose;
    }
}