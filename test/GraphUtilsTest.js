var assert = require('assert');
var GraphUtils = require('../GraphUtils.js');
describe('GraphUtils', function() {
    describe('#stronglyConnectedNodes()', function() {
        var graphs = getGraphs();
        it('should not consider cross edges', function() {
            var scc = GraphUtils.stronglyConnectedNodes(graphs.crossEdge);
            assert.deepEqual(scc, [['L'],['E'],['K'],['J'],['I'],['H'],['G'],['F'],['C'],['D','B','A']]);
        });
        it('should separate several strongly connected nodes in the same graph', function() {
            var scc = GraphUtils.stronglyConnectedNodes(graphs.complex);
            assert.deepEqual(scc, [['1'],['3','2','4','5','0'],['10','12','11','9'],['6'],['8','7'],['13'],['17','16','15','14'],['18']]);
        });
    });
});
function getGraphs() {
    return {
        "crossEdge" : {
            'A': {succs: ['B','H']},
            'B': {succs: ['C','D']},
            'C': {succs: []},
            'D': {succs: ['E','F','G','A']},
            'E': {succs: []},
            'F': {succs: []},
            'G': {succs: []},
            'H': {succs: ['I','J','L']},
            'I': {succs: []},
            'J': {succs: ['K','L']},
            'K': {succs: ['E']},
            'L': {succs: []},
        },
        "complex": {
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
        }
    }
}