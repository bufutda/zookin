var nE = require(__dirname + "/neuralEnglish.js");
var fs = require("fs");
nE.createAndTrain(1000, 1000, function (err, network) {
    if (err) {
        console.error(err);
    } else {
        var results = []
        nE.generateRandom20(10, function(err, tw) {
            if (err) {
                console.error(err);
            } else {
                for (var i = 0; i < tw.length; i++) {
                    results.push({n:network.activate(nE.normalize(tw[i])), e:0});
                }
                nE.grabEnglish20(10, function(err, tw) {
                    if (err) {
                        console.error(err);
                    } else {
                        for (var i = 0; i < tw.length; i++) {
                            results.push({n:network.activate(nE.normalize(tw[i])), e:1});
                        }
                    }
                    results.sort(function (a, b) {
                        if (a.n < b.n) return 1;
                        if (a.n > b.n) return -1;
                        return 0;
                    });
                    console.log(results);
                    fs.writeFileSync(__dirname + "/network.json", JSON.stringify(network.toJSON()));
                });
            }
        });
    }
});
