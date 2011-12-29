## Mucilage

Mucilage is a lightweight (full ~4KB, light ~1.2KB) data to template binding engine which allows to bind the updating of the template with the data.
Mucilage return an object containing methods matching the data keys which can then be used to update the data object or retrieve current values.

Due to the nature of the template engine the template is re-compiled everytime the data object changes.

Mucilage also come in a "light build" which is based on a strip down version of the template engine so it allows only interpolation and doesn't have any configurable settings.

## Core API

### mucilage( string template, object data, HTMLElement target );

Bind template and data together, fill the targetted element with the compiled template and return a new mucilage data object.

### mucilage( array[template, settings, default] , object, HTMLElement );

Same as above but uses the array to pass arguments to the template engine.

### mucilage.templateSettings( object settings );

Change the default settings of the template engine. All instance of mucilage after that will use those settings.

NOTE: Not available on the light version of Mucilage.

### mucilage( object settings )

Change mucilage default settings in one call

## Instance Special API

Available on the full version when the setting "special" is set to to true.

### instance._()

return the current data object

### instance._(object)

update the current data object and then recompiled the template

### instance.$()

return a freshly compiled template

### instance.$(string)

update the current instance template

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

## Usage

### Mucilage light (interpolation only)

```html
<!DOCTYPE html>
<html>
<script src="mucilage-light.js"></script>
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

### Mucilage full featured

```html
<!DOCTYPE html>
<html>
<script src="mucilage.js"></script>
<body>
<div id="content"></div>
<script type="text/mucilage-template" id="templ">
<h1>Just static text</h1>
<p>Interpolation {{=$.f1   +	$.f3}} </p>
<div> JavaScript block evaluation
{{ for(var i=0; i < $.f2; i++) {
    console.log("Pass\t" + i);
    }}
    <div>{{=$.f3}}</div>
    {{ } }}
    </div>
    <div> Encoding {{!'<a   href="http://github.com"></a>'}}</div>
</script>
</body>
<script>
```
```javascript
// original data and template
var data = {
	f1: 10,
	f2: 10,
	f3: 10,
    },
    template = document.getElementById('templ').text;

// convert data into a mucilage object
data = mucilage(template, data, document.getElementById('content'));

// update data object and update the template
setTimeout(function(){
    data.f1(5);
}, 3000);
```
```html
</script>
</body>
</html>
```

### Pass template options in instance call

Mucilage first argument can be an array which is used to pass parameters directly to the template engine
so that the full power of doT can be released.

```javascript
// change template settings for the created instance
mucilage(['{{= it.foo }}', {varname:'it'}], {foo:'foo'}, document.getElementById('content')); 
```

### Use special instance methods

```javascript

mucilage({
    special: true
});

var div = document.createElement('div'),
    muc = mucilage('', {}, div);

muc._({
    foo: 'foo'
});

muc.$('{{= $.foo }}');

var compiled = muc.$();

```

## Credits

The template engine is powered by [doT.js](http://olado.github.com/doT/), written by Laura Doktorova, which is a very performant template engine. See the link for more information.

