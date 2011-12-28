test('Setup', function(){
    
    // test count
    expect(9);

    // test exposure and presence
    ok(mucilage, 'mucilage');
    ok(mucilage.templateEngine, 'template engine');
    ok(mucilage.templateEngine.settings, 'template engine settings');
    ok(mucilage.templateSettings, 'template engine settings method');
    ok(mucilage.template, 'template engine API');
    ok(mucilage.bind, 'data binding method');

    var muc = mucilage('{{=$.foo}}',{foo:'foo'},document.createElement('div'));
    ok(muc[0], 'template instance created');
    ok(muc[1], 'data object created');
    ok(muc.foo, 'data based method created');

});

test('Template', function() {

    expect(5);

    // basic interpolation test
    var template = '<h1>{{=$.title}}</h1><p>{{=$.message}}</p>',
	data = {
	    title: 'Title',
	    message: 'Message'
	},
	div = document.createElement('div'),
	muc = mucilage(template, data, div);

    equal(div.innerHTML, '<h1>Title</h1><p>Message</p>', 'initial state');
    muc.title('New');
    equal(div.innerHTML, '<h1>New</h1><p>Message</p>', 'updated state');

    // return data key value basic test
    equal(muc.title(), 'New', 'return key value');

    // interpolation with change of template settings
    muc = mucilage(['{{= it.title }}', {varname:'it'}], data, div);
    equal(div.innerHTML, 'Title', 'template using custom varname "it"');

    // evaluation test
    template = '{{ for (var i = 0, len = $.arr.length; i < len; i++) { }}{{= $.arr[i] }}{{ } }}';
    data = { arr: ['f','fo','foo'] };
    muc = mucilage(template, data, div);
    equal(div.innerHTML, 'ffofoo', 'evaluation (for loop)');

});
