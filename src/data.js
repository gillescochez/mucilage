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
}
