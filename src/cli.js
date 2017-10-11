/*!
 * dockerops
 * Copyright(c) 2016-2017 Javanile.org
 * MIT Licensed
 */

var fs   = require("fs");
var path = require("path");
var util = require("./util");
var ops  = require("./ops");

module.exports = {
    /**
     *
     *
     * @param args
     */
    run: function(args, callback) {
        if (!args || args.length === 0) { return util.err("&cmd-required"); }
        console.log(args);
        var cmd = args.shift().trim();
        var fnc = "cmd" + cmd.charAt(0).toUpperCase() + cmd.slice(1).toLowerCase();

        // Handle as OPS direct command with arguments
        if (typeof ops[fnc] === "function") {
            return ops[fnc](args, callback);
        }

        // Handle internal command
        switch (cmd) {
            case "--help":
                return this.getHelp(args);
            case "--version":
                return this.getVersion();
        }

        // handle as docker-compose service name with default OPS command
        var service = cmd;
        ops.cmdRun([service].concat(args), callback)
    },

    /**
     *
     * @param args
     */
    getHelp: function (args) {
        var help = path.join(__dirname, "../help/help.txt");
        if (!args[0]) { return fs.readFileSync(help); }
        help = path.join(__dirname, "../help/" + args[0] + ".txt");
        if (fs.existsSync(help)) { return fs.readFileSync(help); }
        return util.err("&cmd-undefined", { cmd: args[0] });
    },

    /**
     * Get software version.
     *
     * @param args
     */
    getVersion: function () {
        var info = JSON.parse(fs.readFileSync(path.join(__dirname, "../package.json")), "utf8");
        return info.name + "@" + info.version;
    }
};
