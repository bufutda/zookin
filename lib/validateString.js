"use strict";
var bg = require(__dirname + "/dict/bigrams.english.json");
var wT = require(__dirname + "/dict/wordTree.json");
var Event = require("events").EventEmitter;

module.exports = function score (string, callback) {
    string = string.toUpperCase() + "\0";
    var fork = new Event();
    var activeBranches = 0;
    var rank = 0;
    var bestSplit = [];
    var setFullString = false;
    fork.on("branch", function (currentIndex, splits) {
        activeBranches++;
        if (currentIndex === string.length - 1) {
            fork.emit("end", splits, true);
        } else {
            wtS(currentIndex, string, wT, splits, fork);
        }
    });
    fork.on("end", function (splits, isFullString) {
        if (activeBranches <= 0) {
            throw new Error("activeBranches is too low");
        }
        activeBranches--;
        if (!setFullString && (splits.length >= bestSplit.length || isFullString)) {
            bestSplit = splits.slice(0);
            if (isFullString) {
                setFullString = true;
            }
        }
        if (activeBranches === 0) {
            for (var i = 0; i < string.length - 2; i++) {
                rank += bg[string[i] + string[i + 1]];
            }
            callback(rank, bestSplit, setFullString);
            return;
        }
    });
    fork.emit("branch", 0, [0]);
};

/**
 * Search a WordTree for a word
 * @param {Integer} index - the index of string to work from
 * @param {String} string - the string to search for words in
 * @param {WordTree} tree - a generated WordTree to use as a dictionary
 * @param {ArrayInteger} splits - an existing array to add word endings to
 * @param {EventEmitter} fork - an EventEmitter to be able to branch the search (to search for multiple words)
 * @returns {undefined} undefined
 */
function wtS (index, string, tree, splits, fork) {
    if (string[index] === "\0") {
        fork.emit("end", splits);
    } else if (tree.hasOwnProperty(string[index])) {
        if (tree[string[index]].hasOwnProperty("_")) {
            var branchSplits = splits.slice(0);
            branchSplits.push(index + 1);
            fork.emit("branch", index + 1, branchSplits);
        }
        wtS(index + 1, string, tree[string[index]], splits, fork);
    } else {
        fork.emit("end", splits);
    }
}
