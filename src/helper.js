// helper function to extend objects
function extend(target, options) {

    // function scope variables
    var name, src, copy;

    // Extend the base object
    for (name in options) {
	
	// grab original and new value
	src = target[name];
	copy = options[name];

	// Prevent never-ending loop
	if (target === copy) continue;

	// Don't copy undefined values
	if (copy !== undefined) target[name] = copy;
    }

    // Return the modified object
    return target;
}
