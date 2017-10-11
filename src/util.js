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

module.exports = {

    /**
     * Print info message.
     *
     * @param msg
     */
    log: function (msg, tokens) {
        return this.indent("(ndev)  ", this.applyTokens(msg, tokens));
    },

    /**
     * Print error message.
     *
     * @param msg
     */
    err: function (msg, tokens) {
        switch (msg) {
            case "&cmd-undefined": msg = "Undefined command '${cmd}', type 'ndev --help'."; break;
            case "&cmd-required":  msg = "Command required, type 'ndev --help'."; break;
        }
        return this.applyTokens(msg, tokens);
    },

    /**
     *
     * @param token
     */
    applyTokens: function (msg, tokens) {
        for (token in tokens) {
            if (tokens.hasOwnProperty(token)) {
                msg = msg.replace("${"+token+"}", tokens[token]);
            }
        }
        return msg;
    },

    /**
     *
     */
    indent: function (pre, msg) {
        return pre + msg.split("\n").join("\n" + this.pad(pre.length));
    },

    /**
     *
     */
    pad: function (len) {
        var str = "";
        for (var i = 0; i < len; i++) { str += " "; }
        return str;
    },

    /**
     *
     */
    trim: function (str) {
        return str.trim();
    },

    /**
     *
     * @param file
     */
    loadJson: function (file) {
        return require(file);
    },

    /**
     *
     * @param file
     * @param info
     */
    saveJson: function (file, info) {
        fs.writeFileSync(file, JSON.stringify(info, null, 4));
    },

    /**
     *
     */
    getGroup: function () {
        return exec("id -g -n");
    }
};


