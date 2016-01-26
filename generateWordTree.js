var fs = require("fs");
var words = fs.readFileSync("./dict/english.txt").toString().split("\n");

var wT = {};

var recursiveTreeBuild = function(c, o, w) {
    if (o.hasOwnProperty(w[c])) {
        if (o[w[c]].hasOwnProperty("_"))
            return;
        var fO = o[w[c]];
    } else {
        o[w[c]] = {};
        var fO = o[w[c]];
    }

    if (c == w.length - 1) {
        o[w[c]]._ = 1;
        // console.log(JSON.stringify(wT, null, 4));
        return;
    } else {
        return recursiveTreeBuild(c + 1, fO, w);
    }
}

for (var i = 0; i < words.length; i++) {
    var word = words[i].toUpperCase().split("");
    // console.log("\033[31m" + words[i].toUpperCase() + "\033[0m");
    if (word.length)
        recursiveTreeBuild(0, wT, word);
}
fs.writeFileSync("./dict/wordTree.json", JSON.stringify(wT));
