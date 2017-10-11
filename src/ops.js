/*!
 * dockerops
 * Copyright(c) 2016-2017 Javanile.org
 * MIT Licensed
 */

var fs = require("fs");
var join = require("path").join;
var spawn = require("child_process").spawn;
var exec = require("child_process").execSync;
var user = require('username');
var base = require("path").basename;
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
    cmdUp: function (args, opts, callback) {
        var params = ["up"];
        params.push("-d");
        params.push("--remove-orphans");
        if (args) { params = params.concat(args); }

        return this.compose(params, opts, callback);
    },

    /**
     *
     * @param args
     */
    cmdPs: function (args, opts, callback) {
        var params = ["ps"];
        //params.push("-d");
        opts['hideStdErr'] = true;
        return this.compose(params, opts, callback);
    },

    /**
     *
     * @param args
     */
    cmdRun: function (args, opts, callback) {
        var params = ["run"];
        //params.push("-d");
        if (args) { params = params.concat(args); }

        return this.compose(params, opts, callback);
    },

    /**
     *
     * @param params
     * @param callback
     */
    compose: function (params, opts, callback) {
        return this.exec("docker-compose", params, opts, function (output) {
            callback(output);
        });
    },

    /**
     *
     */
    exec: function (cmd, params, opts, callback) {
        process.env['DOCKEROPS_HOST_USER'] = user.sync();
        process.env['DOCKEROPS_HOST_GROUP'] = util.getGroup();

        if (typeof opts['showInfo'] != "undefined" && opts['showInfo']) {
            console.log("<<dockerops>> <<exec>>", cmd, params.join(" "), "\n");
        }

        var wrapper = spawn(cmd, params);

        //
        wrapper.stdout.on("data", function (data) {
            process.stdout.write(data.toString());
        });

        //
        wrapper.stderr.on("data", function (data) {
            if (typeof opts['hideStdErr'] != "undefined" && opts['hideStdErr']) { return; }
            process.stdout.write(data.toString());
        });

        //
        wrapper.on("exit", function (code) {
            //console.log('child process exited with code ' + code.toString());
        });

        return cmd + " " + params.join(" ");
    }
}