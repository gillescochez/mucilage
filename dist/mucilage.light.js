(function(){

function mucilage(templ, data, target) {
    return new mucilage.init(templ, data, target);
}

// template and data object are stored in key 0 and 1 so text base methods = object keys
mucilage.init = function(templ, data, target) {

    // build the template
    this[0] = mucilage.template(templ);

    // extend instance with methods matching data key to provide an api to update the data object
    mucilage.bind(this, data, target);

    // update target
    if (target) target.innerHTML = this[0](this[1]);

    // return instance
    return this;
};

// store data in the instance and create methods based on data object
mucilage.bind = function(instance, data, target) {

    var name;
    
    // create instance data object
    instance[1] = {};
    
    // loop through data object
    for (name in data) {
	
        // store the data on the current instance
        instance[1][name] = data[name] || null;

        // self executing function to take care of name scope
        (function(name) {

            // create a new method on the instance to update the given key
            instance[name] = function(val) {

            // if no value is given return the current value
            if (!val) return instance[1][name];

            // update data object
            instance[1][name] = val;

            // update the template
            if (target) target.innerHTML = instance[0](instance[1]);
            }

        })(name);
    }
};

// original code from doT.js - 2011, Laura Doktorova https://github.com/olado/doT
// simplified version of the template which allows only interpolation
mucilage.template = function(str) {

    str = (
	    "var out='" 
	    + str.replace(/\s*<!\[CDATA\[\s*|\s*\]\]>\s*|[\r\n\t]|(\/\*[\s\S]*?\*\/)/g, '')
	    .replace(/\\/g, '\\\\')
	    .replace(/'/g, "\\'")
	    .replace(/\{\{=([\s\S]+?)\}\}/g, function(match, code) {
		return "'+(" + code.replace(/\\'/g, "'").replace(/\\\\/g,"\\").replace(/[\r\t\n]/g, ' ') + ")+'";
	    }) 
	    + "';return out;"
	)
	.replace(/\n/g, '\\n')
	.replace(/\t/g, '\\t')
	.replace(/\r/g, '\\r')
	.split("out+='';").join('')
	.split("var out='';out+=").join('var out=');
	
    try {
	    return new Function('$', str);
    } catch (e) {
	    throw e;
    }
};

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

window.mucilage = mucilage;})();
