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
     * Perform "docker-compose up" base command.
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
     * Perform "docker-compose ps" base command.
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
     * Perform "docker-compose run" base command.
     *
     * @param args
     */
    cmdStop: function (args, opts, callback) {
        var params = ["stop"];
        //params.push("-d");
        //params.push("-d");
        //params.push("-d");
        if (args) {
            if (args.indexOf("--all") > -1) {
                return this.dockerStopAll(args, opts, callback)
            }
            params = params.concat(args);
        }

        return this.compose(params, opts, callback);
    },

    /**
     * Perform "docker-compose run" base command.
     *
     * @param args
     */
    cmdRun: function (args, opts, callback) {
        var params = ["run"];
        //params.push("-d");
        //params.push("-d");
        //params.push("-d");
        if (args) { params = params.concat(args); }

        return this.compose(params, opts, callback);
    },

    /**
     * Perform "docker-compose exec" base command.
     *
     * @param args
     */
    cmdExec: function (args, opts, callback) {
        var params = ["exec"];
        //params.push("-d");
        //params.push("-d");
        //params.push("-d");
        if (args) { params = params.concat(args); }

        return this.compose(params, opts, callback);
    },

    /**
     * Perform "docker-compose" base command.
     *
     * @param args
     */
    compose: function (params, opts, callback) {
        return this.exec("docker-compose", params, opts, function (output) {
            callback(output);
        });
    },

    /**
     *
     *
     */
    dockerStopAll: function (args, opts, callback) {
        opts['showInfo'] = true;
        var containers = exec("docker ps -q -a")+"";
        containers = containers.trim().split("\n");
        opts['hideStdOut'] = true;
        return this.exec("docker", ["stop"].concat(containers), opts, callback);
    },

    /**
     *
     */
    exec: function (cmd, params, opts, callback) {
        process.env['DOCKEROPS_HOST_USER'] = user.sync();
        process.env['DOCKEROPS_HOST_GROUP'] = util.getGroup();

        if (util.isEnabled(opts, 'showInfo')) {
            util.info("exec", cmd + " " + params.join(" "));
        }

        var wrapper = spawn(cmd, params);

        //
        wrapper.stdout.on("data", function (data) {
            if (util.isEnabled(opts, 'hideStdOut')) { return; }
            process.stdout.write(data.toString());
        });

        //
        wrapper.stderr.on("data", function (data) {
            if (util.isEnabled(opts, 'hideStdErr')) { return; }
            process.stdout.write(data.toString());
        });

        //
        wrapper.on("exit", function (code) {
            if (util.isEnabled(opts, 'showInfo')) {
                var code = code.toString();
                var msg = "sound like success.";
                if (code != "0") {
                    msg = "some error occurred.";
                }
                util.info('done',  "(exit="+code+") " + msg);
            }
        });

        return cmd + " " + params.join(" ");
    }
}
