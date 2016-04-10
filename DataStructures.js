exports.Stack = Stack;

function Stack(init) {
    this.array = (init || []).filter(function() {return true;});
    this.store = {};
    (init || []).forEach(function(element) {
        this.store[element] = true;
    }.bind(this));
    return this;
}
Stack.prototype.peek = function() {
    return this.array[this.array.length - 1];
}
Stack.prototype.pop = function() {
    var key = this.array.pop();
    delete this.store[key];
    return key;
}
Stack.prototype.push = function(key) {
    this.array.push(key);
    this.store[key] = true;
    return this;
}
Stack.prototype.length = function() {
    return this.array.length;
}
Stack.prototype.contains = function(key) {
    return !!this.store[key];
}