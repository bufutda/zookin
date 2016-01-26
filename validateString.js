var bg = require("./dict/bigrams.english.json");
var wT = require("./dict/wordTree.json");

module.exports = function(s) {
    var str = s.toUpperCase();
    var ar = str.split("");
    var rank = 0;

    if (wordTreeSearch(0, wT, ar)) {
        for (var i = 0; i < str.length - 1; i++) {
            rank += bg[str[i] + str[i+1]];
        }
    }
    return rank;
}

var wordTreeSearch = function(c, o, w) {
    if (o.hasOwnProperty(w[c])) {
        if (o[w[c]].hasOwnProperty("_")) {
            return 1;
        } else {
            return wordTreeSearch(c + 1, o[w[c]], w);
        }
    } else {
        return 0;
    }
}
