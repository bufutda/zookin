"use strict";

module.exports.init = function () {
    var log = console.log;
    var info = console.info;
    var warn = console.error;

    /**
     * Create a date string from a date object
     * @param {Date} date - the date object to get the date from
     * @param {String} pre - a prepend string
     * @returns {String} str - the formatted date string
     */
    function formatConsoleDate (date, pre) {
        var hour = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();

        return "[" +
               ((hour < 10) ? "0" + hour : hour) +
               ":" +
               ((minutes < 10) ? "0" + minutes : minutes) +
               ":" +
               ((seconds < 10) ? "0" + seconds : seconds) +
               "] " + pre + "\t";
    }

    console.log = function () {
        var first_parameter = arguments[0];
        var other_parameters = Array.prototype.slice.call(arguments, 1);
        log.apply(console, [formatConsoleDate(new Date(), "\x1b[32mOK\x1b[0m") + first_parameter].concat(other_parameters));
    };
    console.info = function () {
        var first_parameter = arguments[0];
        var other_parameters = Array.prototype.slice.call(arguments, 1);
        info.apply(console, [formatConsoleDate(new Date(), "\x1b[34mINFO\x1b[0m") + first_parameter].concat(other_parameters));
    };
    console.debug = function () {
        var first_parameter = arguments[0];
        var other_parameters = Array.prototype.slice.call(arguments, 1);
        info.apply(console, [formatConsoleDate(new Date(), "\x1b[37mDBUG\x1b[0m") + first_parameter].concat(other_parameters));
    };
    console.warn = console.wrn = function () {
        var first_parameter = arguments[0];
        var other_parameters = Array.prototype.slice.call(arguments, 1);
        warn.apply(console, [formatConsoleDate(new Date(), "\x1b[33mWARN\x1b[0m") + first_parameter].concat(other_parameters));
    };
    console.err = console.error = function () {
        var first_parameter = arguments[0];
        var other_parameters = Array.prototype.slice.call(arguments, 1);
        warn.apply(console, [formatConsoleDate(new Date(), "\x1b[31mERR\x1b[0m") + first_parameter].concat(other_parameters));
    };
    return console;
};
