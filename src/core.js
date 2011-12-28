function mucilage(templ, data, target) {
    return new mucilage.init(templ, data, target);
}

mucilage.init = function(templ, data, target) {

    // build the template
    this[0] = mucilage.template(templ);

    // extend instance with methods matching data key to provide an api to update the data object
    mucilage.bind(this, data, target);

    // update target
    target.innerHTML = this[0](this[1]);

    // return instance
    return this;
}
