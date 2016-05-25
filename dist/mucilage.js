(function(){

// engine delcaration
function mucilage(templ, data, target) {
    return new mucilage.init(templ, data, target);
}

// engine settings
mucilage.settings = {
    special: true
};

// template and data object are stored in key 0 and 1 so text base methods = object keys
mucilage.init = function(templ, data, target) {

    // allows the initialization methods to be used to set global settings
    if (isObject(templ) && !isArray(templ)) {
        extend(mucilage.settings, templ);
        return;
    }

    // create the template object
    mucilage._template(this, templ);

    // create the data object
    mucilage.bind(this, data, target);

    // update the target with the initial compiled template
    if (target) mucilage.update(this, target);

    // add $ and _ methods by default but allows disabling
    if (mucilage.settings.special) {
	
        // function to update multiple keys or retrieve current data object
        this._ = function(obj, ext) {

            if (obj) {

                // extend or replace the data object
                if (ext) extend(this[1], obj);
                else this[1] = obj;

                // update target if any
                if (target) mucilage.update(this, target);

            } else return this[1];
        };

        // function to retrieve aIfreshly compiled template or set a new template
        this.$ = function(templ) {
            if (!templ) return this[0](this[1]);
            else mucilage._template(this, templ);
        }
    }

    // return instance
    return this;
};

mucilage.update = function(instance, target) {
    
    var len = target.length,
	i = 0;

    if (len) {
	    for (; i < len; i++) target[i].innerHTML = instance[0](instance[1]);
    } else {
        target.innerHTML = instance[0](instance[1]);
    }
};

mucilage._template = function(instance, templ) {
    // use call if template is an array to allow advanced usage of the template engine
    if (isArray(templ)) instance[0] = mucilage.template.apply(instance, templ);
    else instance[0] = mucilage.template(templ);
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
mucilage.templateEngine = function() {

    var resolveDefs = function(c, block, def) {

	return ((typeof block === 'string') ? block : block.toString()).replace(c.define, function (match, code, assign, value) {

            if (code.indexOf('def.') === 0) code = code.substring(4);

            if (!(code in def)) {
                if (assign === ':') def[code]= value;
                else eval("def[code]=" + value);
            }

            return '';
	    })
	    .replace(c.use, function(match, code) {

            var v = eval(code);
            return v ? resolveDefs(c, v, def) : v;

	    });
    };

    return {

	    init: function(tmpl, c, def) {

            c = extend(mucilage.templateEngine.settings, c, true);

            var cstart = c.append ? "'+(" : "';out+=(",
            cend   = c.append ? ")+'" : ");out+='",
            str = (c.use || c.define) ? resolveDefs(c, tmpl, def || {}) : tmpl;

            str = ("var out='" +
                ((c.strip) ? str.replace(/\s*<!\[CDATA\[\s*|\s*\]\]>\s*|[\r\n\t]|(\/\*[\s\S]*?\*\/)/g, ''): str)
                .replace(/\\/g, '\\\\')
                .replace(/'/g, "\\'")
                .replace(c.interpolate, function(match, code) {
                return cstart + code.replace(/\\'/g, "'").replace(/\\\\/g,"\\").replace(/[\r\t\n]/g, ' ') + cend;
                })
                .replace(c.encode, function(match, code) {
                return cstart + code.replace(/\\'/g, "'").replace(/\\\\/g, "\\").replace(/[\r\t\n]/g, ' ') + ").toString().replace(/&(?!\\w+;)/g, '&#38;').split('<').join('&#60;').split('>').join('&#62;').split('" + '"' + "').join('&#34;').split(" + '"' + "'" + '"' + ").join('&#39;').split('/').join('&#47;'" + cend;
                })
                .replace(c.evaluate, function(match, code) {
                return "';" + code.replace(/\\'/g, "'").replace(/\\\\/g,"\\").replace(/[\r\t\n]/g, ' ') + "out+='";
                })
                + "';return out;")
                .replace(/\n/g, '\\n')
                .replace(/\t/g, '\\t')
                .replace(/\r/g, '\\r')
                .split("out+='';").join('')
                .split("var out='';out+=").join('var out=');

            try {
                return new Function(c.varname, str);
            } catch (e) {
                throw e;
            }
	    }
    };
}();

mucilage.template = mucilage.templateEngine.init;

mucilage.templateEngine.settings = {
    evaluate: /\{\{([\s\S]+?)\}\}/g,
    interpolate: /\{\{=([\s\S]+?)\}\}/g,
    encode: /\{\{!([\s\S]+?)\}\}/g,
    use: /\{\{#([\s\S]+?)\}\}/g, //compile time evaluation
    define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g, //compile time defs
    varname: '$',
    strip : true,
    append: true
};

mucilage.templateSettings = function(obj) {
    extend(mucilage.templateEngine.settings, obj);
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
