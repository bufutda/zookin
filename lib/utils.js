"use strict";
module.exports.Table = require("cli-table");
module.exports.validate = require(__dirname + "/validateString");

/**
 * Inserts a coloured marker into string at every index indicated in splits
 * @param {string} string - the string to insert markers into
 * @param {ArrayInteger} splits - an Integer Array of string indices
 * @returns {string} result - a new string with coloured markers in it
 */
module.exports.separateString = function (string, splits) {
    var str = [];
    for (var i = 0; i < splits.length - 1; i++) {
        str.push(string.substring(splits[i], splits[i + 1]));
    }
    return str.join("\x1b[31m|\x1b[0m");
};

/**
 * Insert a decryption result into the leaderboard
 * @param {Leaderboard} top - the leaderboard to insert into
 * @param {String} string - the decrypted cyphertext
 * @param {Interger} score - the sum of bigrams in the cyphertext
 * @param {String} key - the string used to decrypt the ciphertext
 * @param {ArrayInteger} split - the indices of the decrpyted text where word endings occur
 * @param {String} cipher - [Optional] the cipher used
 * @returns {undefined} undefined
 */
module.exports.insert = function (top, string, score, key, split, cipher) {
    for (var i = 0; i < top.length - 1; i++) {
        if ((split.length > top[i][3].length) || (split.length === top[i][3].length && score > top[i][1])) {
            for (var j = top.length - 1; j > i; j--) {
                top[j] = top[j - 1];
            }
            if (cipher) {
                top[i] = [string, score, key, split, cipher];
            } else {
                top[i] = [string, score, key, split];
            }
            break;
        }
    }
};

/**
 * Clear ANSI styling and terminate the process
 * @param {Integer} code - the code to exit with
 * @returns {Undefined} undefined
 */
module.exports.shutdown = function (code) {
    process.stdout.write("\x1b[?25h");
    process.stdout.write("\x1b[0m\n");
    process.exit(code);
};

/**
 * Set up event listeners for process exiting
 * @returns {Undefined} undefined
 */
module.exports.listenForExit = function () {
    process.on("exit", module.exports.shutdown);
    process.on("SIGINT", module.exports.shutdown);
    process.on("SIGHUP", module.exports.shutdown);
};

module.exports.permutations = function (list, i, ev) {
    if (i === list.length) {
        ev.emit("perms", list);
    }
    for (var j = i; j < list.length; j++) {
        var permutation = list.slice(0);
        permutation[i] = list[j];
        permutation[j] = list[i];
        module.exports.permutations(permutation, i + 1, ev);
    }
};
