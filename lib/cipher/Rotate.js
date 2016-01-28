// Code in this file is a modified verison of code originally authored
// by Tyler Akins for http://rumkin.com
// All credit is due to Tyler Akins

var cutil = require("./Util");
module.exports = function(encdec, text, cols) {
    var t2 = cutil.Tr(text, "\r\n");

    cols = Math.floor(cols);
    if (cols < 1)
        cols = 1;

    while (t2.length % cols) {
        text += 'X';
        t2 += 'X';
    }

    var grid = new Array(cols);
    for (var i = 0; i < cols; i ++) {
        grid[i] = '';
    }

    for (i = 0; i < t2.length; i ++) {
        grid[i % cols] += t2.charAt(i);
    }

    t2 = '';
    if (encdec > 0) {
        for (i = 0; i < cols; i ++) {
            t2 += grid[cols - (i + 1)];
        }
    } else {
        for (i = 0; i < cols; i ++) {
            t2 += cutil.Reverse_String(grid[i]);
        }
    }

    return cutil.InsertCRLF(text, t2);
}
