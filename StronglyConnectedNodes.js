exports.stronglyConnectedNodes = stronglyConnectedNodes;

var Stack = require('./DataStructures.js').Stack;

/**
 * Iterative implementation of Tarjan's algorithm for finding
 * strongly connected nodes in a graph
 * @param initialGraph: Graph
 * @typeDef Graph
 * {
 *  "A": {succs:["B"]},
 *  "B": {succs:[]}
 * }
 */
function stronglyConnectedNodes(initialGraph) {
    var graph = initializeGraph(initialGraph);
    var keys = Object.keys(graph);
    var scc = [];
    var key;
    for (var i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        if (graph[key].index < 0) {
            Array.prototype.push.apply(scc, strongConnnect(graph, key));
        }
    }
    return scc
}

function strongConnnect(graph, root) {
    var resulsSet = [];
    var todo = [root];
    var stack = new Stack();
    var index = 0;
    var key, node, todoLength;
    while (todo.length > 0) {
        todoLength = todo.length;
        // don't pop the node from todo yet, the node will only be processed when it is
        // a leaf or all it's children have been processed
        key = todo[todoLength - 1];
        if (!graph[key]) {
            todo.pop();
            continue;
        }
        if (graph[key].index < 0) {
            node = updateNode(graph[key], index);
            index++;
            stack.push(key);
            node.succs.forEach(processSucc);
        } else {
            node = graph[key];
        }
        // it is a leaf on the DFS tree or all children have been visited
        if (todoLength === todo.length) {
            todo.pop();
            processNode(node);
        }
    }
    return resulsSet;

    function processNode(node) {
        var components = [];
        if (node.pred) {
            graph[node.pred].lowLink = Math.min(graph[node.pred].lowLink, node.lowLink);
        }
        if (graph[key].lowLink === graph[key].index) {
            components = getComponents(key, stack);
            if (components.length > 0){
                resulsSet.push(components);
            }
        }
    }

    function processSucc(succKey) {
        var succNode = graph[succKey];
        if (succNode && succNode.index < 0) {
            todo.push(succKey);
            // keep the back reference for update later
            succNode.pred = key;
        } else if (stack.contains(succKey)) {
            node.lowLink = Math.min(node.lowLink, succNode.index);
        }
    }
}

function getComponents(key, stack) {
    var components = [];
    var component = null;
    if (stack.length() > 0) {
        do {
            component = stack.pop();
            components.push(component);
        } while (key !== component);
    }
    return components;
}

function updateNode(node, index) {
    node.index = index;
    node.lowLink = index;
    return node;
}

function initializeGraph(initialGraph) {
    var graph = {};
    var keys = Object.keys(initialGraph);
    var key;
    for (var i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        graph[key] = {
            key: key,
            pred: undefined,
            succs: initialGraph[key].succs || [],
            index: -1,
            lowLink: -1,
        };
    }
    return graph;
}