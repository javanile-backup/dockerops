/*!
 * dockerops
 * Copyright(c) 2016-2017 Javanile.org
 * MIT Licensed
 */

var fs = require("fs");
var join = require("path").join;
var spawn = require("child_process").spawn;
var exec = require("child_process").execSync;
var wrap = require('wordwrap');
var user = require("username");
var col = require("colors");

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
        return console.log(
            col.red.bold("<<error>>"),
            col.white(this.applyTokens(msg, tokens))
        );
    },

    /**
     *
     * @param key
     * @param msg
     */
    info: function (key, msg) {
        var offset = 11 + key.length;
        var column = process.stdout.columns - offset;
        msg = this.indent(wrap(column)(msg), offset);
        console.log(col.yellow.bold("<<info>> "+key+":"), col.white(msg));
    },

    /**
     *
     * @param opts
     * @param key
     */
    isEnabled: function (opts, key) {
        return typeof opts[key] != "undefined" && opts[key]
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
    indent: function (msg, offset) {
        return msg.split("\n").join("\n" + this.pad(offset));
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


