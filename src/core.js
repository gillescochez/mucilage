// engine delcaration
function mucilage(templ, data, target) {
    return new mucilage.init(templ, data, target);
}

// engine settings
mucilage.settings = {
    special: true
}

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
    if (target) target.innerHTML = this[0](this[1]);

    // add $ and _ methods by default but allows disabling
    if (mucilage.settings.special) {
	
	// function to update multiple keys or retrieve current data object
	this._ = function(obj, ext) {
	    if (obj) {

		// extend or replace the data object
		if (ext) extend(this[1], obj);
		else this[1] = obj;

		// update target if any
		if (target) target.innerHTML = this[0](this[1]);

	    } else return this[1];
	}

	// function to retrieve a freshly compiled template or set a new template
	this.$ = function(templ) {
	    if (!templ) return this[0](this[1]);
	    else mucilage._template(this, templ);
	}
    }

    // return instance
    return this;
}

mucilage._template = function(instance, templ) {
    // use call if template is an array to allow advanced usage of the template engine
    if (isArray(templ)) instance[0] = mucilage.template.apply(instance, templ);
    else instance[0] = mucilage.template(templ);
}
