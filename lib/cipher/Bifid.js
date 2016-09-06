// Code in this file is a modified verison of code originally authored
// by Tyler Akins for http://rumkin.com
// All credit is due to Tyler Akins

var cutil = require("./Util");
module.exports = function Bifid (encdec, text, skip, skipto, key) {
    var enc, out, bet, otemp, c;

    if (typeof(skip) != 'string' || skip.length != 1 || skip.toUpperCase() < 'A' || skip.toUpperCase() > 'Z') {
        skip = "J";
    }
    skip = skip.toUpperCase();

    if (typeof(skipto) != 'string' || skipto.length != 1 || skipto.toUpperCase() < 'A' || skipto.toUpperCase() > 'Z') {
        skipto = "I";
    }
    skipto = skipto.toUpperCase();

    if (skip == skipto) {
        skipto = String.fromCharCode(skip.charCodeAt(0) + 1);
    }
    if (skipto > 'Z') {
        skipto = 'A';
    }

    if (typeof(key) != 'string') {
        key = "";
    }

    key = cutil.MakeKeyedAlphabet(skip + key);
    key = key.slice(1, key.length);

    enc = '';
    out = '';
    bet = '';
    for (var i = 0; i < text.length; i ++) {
        c = text.charAt(i).toUpperCase();
        if (c == skip) {
            c = skipto;
        }

        if (key.indexOf(c) >= 0) {
            enc += c;
        }
    }
    enc = Bifid_Mangle(encdec, enc, key)

    for (var i = 0, j = 0; i < text.length; i ++)
    {
        c = text.charAt(i).toUpperCase();
        if (c == skip) {
            c = skipto;
        }

        if (key.indexOf(c) >= 0) {
            if (text.charAt(i) != text.charAt(i).toUpperCase()) {
                out += enc.charAt(j).toLowerCase();
            } else {
                out += enc.charAt(j);
            }
            j ++;
        } else {
            out += text.charAt(i);
        }
    }

    return out;
}

function Bifid_Mangle (encdec, chars, key) {
    var pos, line1, line2;

    line1 = '';
    line2 = '';

    for (var i = 0; i < chars.length; i ++) {
        var row, col;

        pos = key.indexOf(chars.charAt(i));
        row = Math.floor(pos / 5);
        col = pos % 5;

        line1 += row;
        if (encdec > 0) {
            line2 += col;
        } else {
            line1 += col;
        }
    }

    line1 += line2;

    if (encdec < 0) {
        line2 = '';
        for (var i = 0; i < line1.length / 2; i ++) {
            line2 += line1.charAt(i);
            line2 += line1.charAt(line1.length / 2 + i);
        }
        line1 = line2;
    }

    chars = '';

    for (var i = 0; i < line1.length; i += 2) {
        chars += key.charAt(line1.charAt(i) * 5 + line1.charAt(i + 1) * 1);
    }

    return chars;
}
