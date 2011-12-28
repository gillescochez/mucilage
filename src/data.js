// store data in the instance and create methods based on data object
mucilage.bind = function(instance, data, target) {
    
    // create instance data object
    instance[1] = {};
    
    // loop through data object
    for (var name in data) {
	
	// store the data on the current instance
	instance[1][name] = data[name] || null;

	// self executing function to take care of name scope
	(function(name) {

	    // create a new method on the instance to update the given key
	    instance[name] = function(val) {

		// update data object
		instance[1][name] = val;

		// update the template
		target.innerHTML = instance[0](instance[1]);
	    }

	})(name);
    }
}
