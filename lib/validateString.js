var bg = require("./dict/bigrams.english.json");
var wT = require("./dict/wordTree.json");

module.exports = function(s, d, callback) {
    var str = s.toUpperCase();
    var ar = str.split("");
    var rank = 0;
    var index = 0;
    var lIndex = 0;
    var split = [];

    for (var i = 0; i < d; i++) {
        // console.log("testing at index " + index + "(" + ar[index] +")");
        lIndex = index;
        maybe = false;
        index = wordTreeSearch(index, wT, ar);
        // console.log("returned " + index + "(" + maybe + ")");
        if (isNaN(index)) {
            if (typeof maybe !== "boolean")
                index = maybe;
            else
                break;
        }
        split.push(str.substring(lIndex, index + 1));
        index++;
    }
    if (!isNaN(index)) {
        for (var i = 0; i < str.length - 1; i++) {
            rank += bg[str[i] + str[i+1]];
        }
    }
    if (callback) {
        callback(split, rank);
    }
    return rank;
}

// check all possible words (currently is first match)
var maybe = false;
var wordTreeSearch = function(c, o, w) {
    //  console.log(c);
    if (o.hasOwnProperty(w[c])) {
        if (o[w[c]].hasOwnProperty("_")) {
            maybe = c;
            // console.log("setting maybe to " +maybe);
            return wordTreeSearch(c + 1, o[w[c]], w);
        } else {
            return wordTreeSearch(c + 1, o[w[c]], w);
        }
    } else {
        // console.log(w[c] + " no match");
        // console.log(o);
        return NaN;
    }
}
