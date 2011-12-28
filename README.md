## Mucilage

Mucilage is a simple data to template binding engine which allows to bind the updating of the template with the data.
Mucilage return an object containing methods matching the data keys which can then be used to update the data object later.

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
	muc.message('New message');
    }, 3000);


```
```html
</script>
</body>
</html>
```

## Credits

The template engine is powered by [doT.js](http://olado.github.com/doT/) which is written by Laura Doktorova.

