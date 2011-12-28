## Mucilage

Mucilage is a simple data to template binding engine which allows to bind the updating of the template with the data.
Mucilage return an object containing methods matching the data keys which can then be used to update the data object or retrieve current values.

Due to the nature of the template engine the template is re-compiled everytime the data object changes.

## API

### mucilage( string template, object data, HTMLElement target );

Bind template and data together and return a new mucilage data object

### mucilage.templateSettings( object settings );

Change the settings of the template.

Default settings
```javascript
    evaluate: /\{\{([\s\S]+?)\}\}/g, // {{ ... }}
    interpolate: /\{\{=([\s\S]+?)\}\}/g, // {{= ... }}
    encode: /\{\{!([\s\S]+?)\}\}/g, // {{! ... }}
    use: /\{\{#([\s\S]+?)\}\}/g, // {{# ... }} compile time evaluation
    define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g, // {{## ... }} compile time defs
    varname: '$', // only default settings change from doT (doT uses 'it')
    strip : true,
    append: true
```

## Template engine features

* no dependencies
* custom delimiters
* runtime evaluation
* runtime interpolation
* compile-time evaluation
* partials support
* encoding
* control whitespace - strip or preserve
* streaming friendly

## Basic usage


```html
<!DOCTYPE html>
<html>
<script src="mucilage.js"></script>
<body>
<div id="content"></div>
<script>
```

```javascript
var template = '<h1>{{=$.title}}</h1><p>{{=$.message}}</p>',
    data = {
	title: 'Title',
	message: 'Message'
    },
    muc = mucilage(template, data, document.getElementById('content')); 

    // the content element now contains <h1>Title</h1><p>Message</p>

    // this will update the Message in 3 seconds
    setTimeout(function() {
	console.log(muc.message());
	muc.message('New message');
	console.log(muc.message());
    }, 3000);


```
```html
</script>
</body>
</html>
```

## Credits

The template engine is powered by [doT.js](http://olado.github.com/doT/), written by Laura Doktorova, which is a very performant template engine. See the link for more information.
