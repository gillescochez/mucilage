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
    };
};
