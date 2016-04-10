// node script file
var GraphUtils = require('./GraphUtils.js');

var graph = {
    "0": {succs: ["1", "5"]},
    "1": {succs: []},
    "2": {succs: ["0", "3"]},
    "3": {succs: ["2", "5"]},
    "4": {succs: ["2"]},
    "5": {succs: ["4"]},
    "6": {succs: ["0", "9"]},
    "7": {succs: ["6", "8"]},
    "8": {succs: ["7", "9"]},
    "9": {succs: ["10", "11"]},
    "10": {succs: ["12"]},
    "11": {succs: ["4", "12"]},
    "12": {succs: ["9"]},
    "13": {succs: ["13"]},
    "14": {succs: ["15"]},
    "15": {succs: ["16"]},
    "16": {succs: ["17"]},
    "17": {succs: ["14"]},
    "18": {succs: ["1"]},
};

var scc = GraphUtils.stronglyConnectedNodes(graph);

scc.forEach(function(c) {
    console.log(c);
});