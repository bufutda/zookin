// Code in this file is a modified verison of code originally authored
// by Tyler Akins for http://rumkin.com
// All credit is due to Tyler Akins

module.exports.Trim = function(s) {
    while (s.length && " \t\r\n".indexOf(s.charAt(0)) >= 0) {
        s = s.slice(1, s.length);
    }
    while (s.length && " \t\r\n".indexOf(s.charAt(s.length - 1)) >= 0) {
        s = s.slice(0, s.length - 1);
    }

    return s;
}
var Trim = module.exports.Trim;

module.exports.Tr = function(s, f, t) {
    var o = '';

    if (typeof(t) != 'string') {
        t = '';
    }

    for (var i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        var idx = f.indexOf(c);
        if (idx >= 0) {
            if (idx < t.length) {
                o += t.charAt(idx);
            }
        } else {
            o += c;
        }
    }

    return o;
}
var Tr = module.exports.Tr;

module.exports.InsertCRLF = function(t, e) {
    var o = "", i, j;

    for (i = 0, j = 0; i < t.length; i++) {
        if ("\r\n".indexOf(t.charAt(i)) >= 0) {
            o += t.charAt(i);
        } else {
            o += e.charAt(j++);
        }
    }

    return o;
}
var InsertCRLF = module.exports.InsertCRLF;

module.exports.MakeKeyedAlphabet = function(key, alphabet) {
    var out = "";

    if (typeof(alphabet) != 'string')
        alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    else
        alphabet = alphabet.toUpperCase();

    if (typeof(key) != 'string')
        return alphabet;

    key = key.toUpperCase() + alphabet;
    for (var i = 0; i < key.length; i++) {
        if (out.indexOf(key.charAt(i)) < 0 && alphabet.indexOf(key.charAt(i)) >= 0) {
            out += key.charAt(i);
        }
    }

    return out;
}
var MakeKeyedAlphabet = module.exports.MakeKeyedAlphabet;

module.exports.OnlyAlpha = function(str) {
    var out = "";

    for (i = 0; i < str.length; i++) {
        var b = str.charAt(i);
        if (b.toUpperCase() >= 'A' && b.toUpperCase() <= 'Z') {
            out += b;
        }
    }

    return out;
}
var OnlyAlpha = module.exports.OnlyAlpha;


module.exports.HTMLEscape = function(str) {
    var out = "";

    for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i);
        if (c == '&')
            c = '&amp;';
        if (c == '>')
            c = '&gt;';
        if (c == '<')
            c = '&lt;';
        if (c == "\n")
            c = "<br>\n";
        out += c;
    }

    return out;
}
var HTMLEscape = module.exports.HTMLEscape;


module.exports.ResizeTextArea = function(obj) {
    var s = obj.value + "\n";
    var newlines = 0;
    var max_chars = 0;
    var i, chars = 0, wide = 0;
    var obj_max_cols = 100, obj_min_cols = 40, obj_max_rows = 15;
    var scrollbar_width = 2;

    for (i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        if (c == "\n") {
            if (max_chars < chars)
                max_chars = chars;
            chars = 0;
            newlines++;
        } else {
            if (chars == obj_max_cols - scrollbar_width) {
                max_chars = chars;
                j = i;
                var c2 = s.charAt(j);
                while (c2 != "\n" && c2 != ' ' && c2 != "\t" && j > 0) {
                    j--;
                    c2 = s.charAt(j);
                }
                if (c2 != "\n" && j > 0) {
                    newlines++;
                    chars = 0;
                    i = j;
                } else {
                    wide = 1;
                }
            } else {
                chars++;
            }
        }
        if (obj_max_rows <= newlines + wide + 1 && obj_max_cols <= max_chars + scrollbar_width) {
            obj.rows = obj_max_rows;
            obj.cols = obj_max_cols;
            return;
        }
    }

    obj.rows = Math.min(obj_max_rows, newlines + wide + 1);
    obj.cols = Math.min(Math.max(obj_min_cols, max_chars + scrollbar_width), obj_max_cols);
}
var ResizeTextArea = module.exports.ResizeTextArea;


module.exports.Reverse_String = function(s) {
    var o = '', i = s.length;

    while (i--) {
        o += s.charAt(i);
    }

    return o;
}
var Reverse_String = module.exports.Reverse_String;

module.exports.IsUnchanged = function(e) {
    var v;

    if (e.type == 'checkbox') {
        v = e.checked.toString();
    } else {
        v = e.value;
    }

    if (v != e.getAttribute('_oldValue')) {
        e.setAttribute('_oldValue', v);
        return 0;
    }

    return 1;
}
var IsUnchanged = module.exports.IsUnchanged;

module.exports.HTMLTableau = function(key) {
    var out = '';

    for (var i = 0; i < 25; i++) {
        if (i > 0 && i % 5 == 0) {
            out += "<br>\n";
        }
        if (i % 5) {
            out += " ";
        }
        out += key.charAt(i);
    }

    return "<tt>" + out + "</tt>";
}
var HTMLTableau = module.exports.HTMLTableau;

module.exports.SwapSpaces = function(in_str) {
    var out = '';
    var multi = 1;

    for (var i = 0; i < in_str.length; i++) {
        var c = in_str.charAt(i);

        if (c == ' ') {
            if (multi) {
                out += '&nbsp;';
                multi = 0;
            } else {
                out += ' ';
                multi = 1;
            }
        } else if (multi && (c == '\r' || c == '\n' || c == '\t')) {
            out = out.slice(0, out.length - 1) + '&nbsp;' + c;
            multi = 0;
        } else {
            out += c;
            multi = 0;
        }
    }

    if (out.charAt(out.length - 1) == ' ') {
        out = out.slice(0, out.length - 1) + '&nbsp;';
    }

    return out;
}
var SwapSpaces = module.exports.SwapSpaces;

var LetterFrequency_LastText = '';
var LetterFrequency_LastFreq = new Array();
module.exports.LetterFrequency = function(text) {
    var n = new Array();
    var i = 0, j;

    if (LetterFrequency_LastText == text) {
        return LetterFrequency_LastFreq;
    }

    if (text.slice(0, LetterFrequency_LastText.length) == LetterFrequency_LastText) {
        n = LetterFrequency_LastFreq;
        i = LetterFrequency_LastText.length;
    }

    for (j = text.length; i < j; i++) {
        var c = text.charAt(i);
        if (! n[c]) {
            n[c] = 1;
        } else {
            n[c]++;
        }
    }

    LetterFrequency_LastText = text;
    LetterFrequency_LastFreq = n;

    return n;
}
var LetterFrequency = module.exports.LetterFrequency;

var PrimeList = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
module.exports.IsPrime = function(n) {
    if (n < 2 || n != Math.floor(n)) {
        return false;
    }

    for (var i = 0; i < PrimeList.length; i++) {
        if (PrimeList[i] == n) {
            return true;
        }
        if (PrimeList[i] > n) {
            return false;
        }
    }

    var m = Math.floor(Math.sqrt(n));
    var m2 = PrimeList[PrimeList.length - 1];
    if (m2 < m) {
        while (m2 <= m) {
            m2 += 2;
            if (IsPrime(m2)) {
                PrimeList[PrimeList.length] = m2;
            }
        }
    }

    for (var i = 0; PrimeList[i] <= m; i++) {
        var d = n / PrimeList[i];
        if (d == Math.floor(d)) {
            return false;
        }
    }

    return true;
}
var IsPrime = module.exports.IsPrime;

module.exports.GetFactors = function(n) {
    var factors = new Array();
    if (n < 1 || n != Math.floor(n)) {
        return factors;
    }
    if (IsPrime(n)) {
        factors[factors.length] = n;
        return factors;
    }

    var index = 0;
    var skipCheck = 0;
    while (skipCheck || ! IsPrime(n)) {
        var d = n / PrimeList[index];
        if (d == Math.floor(d)) {
            if (PrimeList[index] != factors[factors.length - 1]) {
                factors[factors.length] = PrimeList[index];
            }
            n = d;
            skipCheck = 0;
        } else {
            index++;
            skipCheck = 1;
        }
    }
    if (n != factors[factors.length - 1]) {
        factors[factors.length] = n;
    }

    return factors;
}
var GetFactors = module.exports.GetFactors;

var CoprimeCache = new Array();
var CoprimeCacheNum = new Array();
module.exports.IsCoprime = function(a, b) {
    var a_factors = false, b_factors = false;

    if (a < 1 || b < 1 || a != Math.floor(a) || b != Math.floor(b)) {
        return false;
    }
    if (a == 1 || b == 1) {
        return true;
    }

    for (var i = 0; i < CoprimeCacheNum.length; i++) {
        if (CoprimeCacheNum[i] == a) {
            a_factors = CoprimeCache[i];
        }
        if (CoprimeCacheNum[i] == b) {
            b_factors = CoprimeCache[i];
        }
    }

    if (! a_factors) {
        a_factors = GetFactors(a);
    }
    if (! b_factors) {
        b_factors = GetFactors(b);
    }

    CoprimeCache = [a_factors, b_factors];
    CoprimeCacheNum = [a, b];

    var a_idx = 0;
    var b_idx = 0;
    while (a_idx < a_factors.length && b_idx < b_factors.length) {
        if (a_factors[a_idx] < b_factors[b_idx]) {
            a_idx++;
        } else if (a_factors[a_idx] > b_factors[b_idx]) {
            b_idx++;
        } else {
            return false;
        }
    }
    return true;
}
var IsCoprime = module.exports.IsCoprime;
