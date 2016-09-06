// Code in this file is a modified verison of code originally authored
// by Tyler Akins for http://rumkin.com
// All credit is due to Tyler Akins

var cutil = require("./Util");
module.exports = function (encdec, text, mult, inc, key, alphabet) {
    var s = "";

    if (typeof(alphabet) != 'string') {
        alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }

    mult = mult * 1;
    inc = inc * 1;

    if (encdec < 0) {
        var i = 1;
        while ((mult * i) % 26 != 1) {
            i += 2;
        }
        mult = i;
        inc = mult * (alphabet.length - inc) % alphabet.length;
    }

    key = cutil.MakeKeyedAlphabet(key, alphabet);

    for (var i = 0; i < text.length; i++) {
        var b = text.charAt(i);
        var idx;
        if ((idx = alphabet.indexOf(b)) >= 0) {
            idx = (mult * idx + inc) % alphabet.length;
            b = key.charAt(idx);
        } else if ((idx = alphabet.indexOf(b.toUpperCase())) >= 0) {
            idx = (mult * idx + inc) % alphabet.length;
            b = key.charAt(idx).toLowerCase();
        }
        s += b;
    }
    return s;
}
