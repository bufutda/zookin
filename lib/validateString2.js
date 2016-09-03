var fs = require("fs");
var score = require("synaptic").Network.fromJSON(JSON.parse(fs.readFileSync(__dirname + "/network.json"))).standalone();
module.exports = function (string, depth) {
    return score(normalize(string))[0];
}
function normalize (text) {
    if (text.length < 6) {
        do {
            text += "z";
        } while (text.length < 6);
    } else {
        text = text.substr(0, 6);
    }
    var normalText = [];
    for (var i = 0; i < text.length; i++) {
        normalText.push((text.charCodeAt(i) - 97) / 25);
    }
    return normalText;
};
