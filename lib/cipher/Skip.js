// Code in this file is a modified verison of code originally authored
// by Tyler Akins for http://rumkin.com
// All credit is due to Tyler Akins

var cutil = require("./Util");

// encdec = -1 for decode, 1 for encode
// text = the data you want to encode/decode
// inc = how many letters you want to skip (1 or more)
// start = what position you want to start at (0 = beginning)
module.exports = function(encdec, text, inc, start) {
    enctext = cutil.Tr(text, "\r\n");
    inc = inc * 1;
    start = start * 1;

    if (enctext.length < 2)
        return false;
    if (inc < 1)
        return false;
    if (inc > enctext.length - 1)
        return false;
    if (start < 0)
        return false;
    if (start > enctext.length)
        return false;
    if (HasAFactorMatch(enctext.length, inc))
        return false;

    if (encdec * 1 < 0) {
        enctext = Skip_Decode(enctext, inc, start);
    } else {
        enctext = Skip_Encode(enctext, inc, start);
    }

    return cutil.InsertCRLF(text, enctext);
}

function HasAFactorMatch(t_len, sk) {
    var i, j, sk_half, primes = new Array(1), div, div2;

    if (sk == 1)
        return 0;

    div = t_len / sk;
    if (div == Math.floor(div))
        return 1;

    div = sk / 2;
    div2 = t_len / 2;
    if (div == Math.floor(div) && div2 == Math.floor(div2))
        return 1;

    sk_half = Math.floor(sk / 2);
    primes[0] = 2;
    for (i = 3; i <= sk_half; i ++) {
        for (j = 0; j < primes.length; j ++) {
            div = i / primes[j];
            if (div == Math.floor(div)) {
                j = primes.length + 1
            }
        }
        if (j == primes.length) {
            primes[primes.length] = i;
            div = sk / i;
            div2 = t_len / i;
            if (div == Math.floor(div) && div2 == Math.floor(div2)) {
                return 1;
            }
        }
    }

    return 0;
}


function Skip_Encode(t, sk, st) {
    var i, pos, o = t;

    for (i = 0, pos = st; i < t.length; i ++) {
        o = o.slice(0, pos) + t.charAt(i) + o.slice(pos + 1, o.length);
        pos += sk;
        pos = pos % t.length;
    }

    return o;
}

function Skip_Decode(t, sk, st) {
    var i, pos, o = "";

    for (i = 0, pos = st; i < t.length; i ++) {
        o += t.charAt(pos);
        pos += sk;
        pos = pos % t.length;
    }

    return o;
}
