// Code in this file is a modified verison of code originally authored
// by Tyler Akins for http://rumkin.com
// All credit is due to Tyler Akins

var cutil = require("./Util");
module.exports = function (encdec, text, inc, key, alphabet) {
    var s = "", b, i, idx;

    if (typeof(alphabet) != 'string') {
        alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }

    inc = inc * 1;

    key = cutil.MakeKeyedAlphabet(key, alphabet);

    if (encdec < 0) {
        inc = alphabet.length - inc;
        b = key;
        key = alphabet;
        alphabet = b;
    }

    for (i = 0; i < text.length; i++) {
        b = text.charAt(i);
        if ((idx = alphabet.indexOf(b)) >= 0) {
            idx = (idx + inc) % alphabet.length;
            b = key.charAt(idx);
        } else if ((idx = alphabet.indexOf(b.toUpperCase())) >= 0) {
            idx = (idx + inc) % alphabet.length;
            b = key.charAt(idx).toLowerCase();
        }
        s += b;
    }
    return s;
};
