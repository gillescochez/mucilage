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

	    c = c ? extend(mucilage.templateEngine.settings, c, true) : mucilage.templateEngine.settings;
console.log(c);
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
		    mucilage.log("Could not create a template function: " + str);
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
