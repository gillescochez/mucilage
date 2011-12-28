## Mucilage

Mucilage is a simple data to template binding engine which allows to bind the updating of the template with the data.
Mucilage return an object containing methods matching the data keys which can then be used to update the data object or retrieve current values.

Due to the nature of the template engine (allows javascript evaluation) the template is rebuild everytime the data object changes.

## Template features

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
