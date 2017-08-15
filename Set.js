// Usage:
// var a = new Set();
// var b = new Set();
//
// a.add("a").add("b").add("c");
// b.add("a").add("d").add("e");
//
// var u = a.union(b); // set u should contain "a", "b", "c", "d", "e"
// var i = a.intersect(b); // set i should contain "a"
// var d = a.difference(b); // set d should contain "b", "c", "d", "e"

var Set = function() {
    this.bucklet = {};
    return this;
};

Set.prototype.add = function(item) {
    if(!this.bucket.hasOwnProperty(item)) {
        this.bucket[item] = item;
    }
    
    return this;
};

Set.prototype.remove = function(item) {
    if(this.bucket.hasOwnProperty(item)) {
        delete this.bucket[item];
    }
    
    return this;
};

Set.prototype.isEmpty = function() {
    return this.size() === 0;
};

Set.prototype.size = function() {
    return Object.keys(this.bucket).length;
};

Set.prototype.union = function(set) {
    var newSet = new Set();
    
    Object.keys(this.bucket).forEach(function(item, index, array) {
        newSet.add(item);
    });
    
    Object.keys(set.bucket).forEach(function(item, index, array) {
        newSet.add(item);
    });
    
    return newSet;
};

Set.prototype.intersect = function(set) {
    var newSet = new Set();
    
    Object.keys(this.bucket).forEach(function(item, index, array) {
        if(set.isMember(item)) {
            newSet.add(item);
        }
    });
    
    return newSet;
};

Set.prototype.difference = function(set) {
    var that = this;
    var newSet = new Set();
    
    Object.keys(this.bucket).forEach(function(item, index, array) {
        if(!set.isMember(item)) {
            newSet.add(item);
        }
    });
    
    Object.keys(set.bucket).forEach(function(item, index, array) {
        if(!that.isMember(item)) {
            newSet.add(item);
        }
    });

    return newSet;
};
