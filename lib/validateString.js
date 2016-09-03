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
            // console.log("end, found,", separateString(string, splits));
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
                rank += bg[string[i] + string[i+1]];
            }
            callback(rank, bestSplit, setFullString);
        }
    });
    fork.emit("branch", 0, [0]);
}

function wtS (index, string, tree, splits, fork) {
    if (string[index] === "\0") {
        // console.log("end, notfound,", separateString(string, splits));
        fork.emit("end", splits);
    } else if (tree.hasOwnProperty(string[index])) {
        if (tree[string[index]].hasOwnProperty("_")) {
            var branchSplits = splits.slice(0);
            branchSplits.push(index + 1);
            fork.emit("branch", index + 1, branchSplits);
        }
        wtS(index + 1, string, tree[string[index]], splits, fork);
    } else {
        // console.log("notfound,", separateString(string, splits));
        fork.emit("end", splits);
    }
}

function separateString (string, splits) {
    var str = [];
    for (var i = 0; i < splits.length - 1; i++) {
        str.push(string.substring(splits[i], splits[i + 1]));
    }
    return str.join("\x1b[31m|\x1b[0m");
}
