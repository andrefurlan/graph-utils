var assert = require('assert');
var GraphUtils = require('../GraphUtils.js');
describe('GraphUtils', function() {
    describe('#stronglyConnectedNodes()', function () {
        var graph = {
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
        };
        it('should not consider cross edges', function () {
            var scc = GraphUtils.stronglyConnectedNodes(graph);
            assert.deepEqual(scc, [['L'],['E'],['K'],['J'],['I'],['H'],['G'],['F'],['C'],['D','B','A']]);
            assert.equal(10, scc.length);
        });
    });
});