function mucilage(templ, data, target) {
    return new mucilage.init(templ, data, target);
}

// template and data object are stored in key 0 and 1 so text base methods = object keys
mucilage.init = function(templ, data, target) {

    // use call if template is an array to allow advanced usage of the template engine
    if (isArray(templ)) this[0] = mucilage.template.apply(this, templ);
    else this[0] = mucilage.template(templ);

    // extend instance with methods matching data key to provide an api to update the data object
    mucilage.bind(this, data, target);

    // update target
    target.innerHTML = this[0](this[1]);

    // return instance
    return this;
}
