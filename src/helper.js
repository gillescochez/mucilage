// helper function to extend objects
function extend(target, options, newObj) {

    if (!options) return target;

    // function scope variables
    var name, src, copy,
	obj = {};

    // extend object with target if needed 
    if (newObj) extend(obj, target);

    // extend the base object
    for (name in options) {
	
        // grab original and new value
        src = target[name];
        copy = options[name];

        // Prevent never-ending loop
        if (target === copy) continue;

        // Don't copy undefined values
        if (copy !== undefined) (newObj ? obj : target)[name] = copy;
    }

    return newObj ? obj : target;
}

// object type check helper
function isObject(it) {
    return typeof it  === 'object';
}

// array type check helper
function isArray(it) {
    if (isObject(it)) return it.constructor == Array;
    else return false;
}
