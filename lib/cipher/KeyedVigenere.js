// Code in this file is a modified verison of code originally authored
// by Tyler Akins for http://rumkin.com
// All credit is due to Tyler Akins

var cutil = require("./Util.js");

module.exports = function(encdec, text, pass, key, autokey) {
    var s, b, i;
    pass = cutil.OnlyAlpha(pass.toUpperCase());

    key = cutil.MakeKeyedAlphabet(key);

    s = "";
    for (i = 0; i < text.length; i++) {
        b = text.charAt(i);
        limit = ' ';
        if (b >= 'A' && b <= 'Z')
            limit = 'A';
        if (b >= 'a' && b <= 'z')
            limit = 'a';
        if (limit != ' ' && pass.length) {
            b = b.toUpperCase();

            if (autokey && encdec > 0)
                pass += b;

            bval = key.indexOf(b) + encdec * key.indexOf(pass.charAt(0));
            bval = (bval + 26) % 26;
            b = key.charAt(bval);

            if (autokey && encdec < 0)
                pass += b;

            if (limit == 'a')
                b = b.toLowerCase();

            if (! autokey)
                pass += pass.charAt(0);

            pass = pass.slice(1, pass.length);
        }
        s += b;
    }
    return s;
}

function BuildTableau(k, n) {
    var Alpha = cutil.MakeKeyedAlphabet(k);
    var AtoZ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var s = "<tt><b><u>&nbsp;&nbsp;|&nbsp;" +
        Alpha.substr(0, 4) + '&nbsp;' +
        Alpha.substr(4, 4) + '&nbsp;' +
        Alpha.substr(8, 4) + '&nbsp;' +
        Alpha.substr(12, 4) + '&nbsp;' +
        Alpha.substr(16, 4) + '&nbsp;' +
        Alpha.substr(20, 4) + '&nbsp;' +
        Alpha.substr(24, 2) + "</u></b>";

    if (! n) {
        n = 26;
    }

    for (var i = 0; i < n; i ++) {
        s += '<br><b>' + Alpha.charAt(0) + '</b>&nbsp;|&nbsp;' +
        Alpha.substr(0, 4) + '&nbsp;' +
        Alpha.substr(4, 4) + '&nbsp;' +
        Alpha.substr(8, 4) + '&nbsp;' +
        Alpha.substr(12, 4) + '&nbsp;' +
        Alpha.substr(16, 4) + '&nbsp;' +
        Alpha.substr(20, 4) + '&nbsp;' +
        Alpha.substr(24, 2);
        Alpha += Alpha.charAt(0);
        Alpha = Alpha.substr(1);
    }
    s += "</tt>";
    return s;
}

function GronsfeldToVigenere(p) {
    var out = '';
    var i;
    var Alpha = 'ABCDEFGHIJ';

    for (i = 0; i < p.length; i ++) {
        var c = p.charAt(i);
        if (c >= '0' && c <= '9') {
            out += Alpha.charAt(c - '0');
        }
    }

    return out;
}
