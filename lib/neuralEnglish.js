#!/usr/bin/env node
var synaptic = require("synaptic");
var fs = require("fs");

module.exports.score = function (text) {
    if (text.length < 6) {
        console.error("\x1b[33m[WRN]\x1b[0m Text too short. Padding with 'a'");
        do {
            text += "a";
        } while (text.length < 6);
    } else if (text.length > 6) {
        console.error("\x1b[33m[WRN]\x1b[0m Text too long. Cutting off.");
        text = text.substr(0, 6);
    }
    var normalText = module.exports.normalize(text);
    console.log(normalText);
    // test
};

module.exports.normalize = function (text) {
    var normalText = [];
    for (var i = 0; i < text.length; i++) {
        normalText.push((text.charCodeAt(i) - 97) / 25);
    }
    return normalText;
};

module.exports.grabEnglish20 = function (amount, cb) {
    fs.readFile(__dirname + "/dict/english.txt", function (err, file) {
        if (err) {
            cb(err);
        } else {
            file = file.toString().split("\n");
            var twenties = [];
            for (var i = 0; i < amount; i++) {
                var str = "";
                do {
                    str += file[Math.floor(Math.random() * file.length)];
                } while (str.length < 6);
                twenties.push(str.substr(0, 6));
            }
            cb(null, twenties);
        }
    });
};

module.exports.generateRandom20 = function (amount, cb) {
    var twenties = [];
    for (var i = 0; i < amount; i++) {
        var str = "";
        for (var j = 0; j < 6; j++) {
            str += String.fromCharCode(Math.floor(Math.random() * 25) + 97);
        }
        twenties.push(str);
    }
    cb(null, twenties);
};

module.exports.createTrainingSet = function (yes, no, cb) {
    var trainingSet = [];
    module.exports.grabEnglish20(yes, function (err, tokens) {
        if (err) {
            cb(err);
        } else {
            for (var i = 0; i < tokens.length; i++) {
                trainingSet.push({
                    input: module.exports.normalize(tokens[i]),
                    output: [1]
                });
            }
            module.exports.generateRandom20(no, function (err, tokens) {
                if (err) {
                    cb(err);
                } else {
                    for (var i = 0; i < tokens.length; i++) {
                        trainingSet.push({
                            input: module.exports.normalize(tokens[i]),
                            output: [0]
                        });
                    }
                    cb(null, trainingSet);
                }
            });
        }
    });
};

module.exports.createAndTrain = function (yes, no, cb) {
    var neuralNetwork = new synaptic.Architect.Perceptron(6, 25, 1);

    var trainer = new synaptic.Trainer(neuralNetwork);

    module.exports.createTrainingSet(yes, no, function (err, set) {
        if (err) {
            cb(err);
        } else {
            trainer.train(set, {
                rate: 0.07,
                iterations: 5000000,
                error: 0.001
            });
            cb(null, neuralNetwork);
        }
    });
};
