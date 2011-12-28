test('Setup', function(){
    
    // test count
    expect(8);

    // test exposure and presence
    ok(mucilage, 'mucilage');
    equal(!!mucilage.templateEngine, false, 'no complex template engine');
    equal(!!mucilage.templateSettings, false, 'no template engine settings method');
    ok(mucilage.template, 'template engine API');
    ok(mucilage.bind, 'data binding method');

    var muc = mucilage('{{=$.foo}}',{foo:'foo'},document.createElement('div'));
    ok(muc[0], 'template instance created');
    ok(muc[1], 'data object created');
    ok(muc.foo, 'data based method created');

});

test('Template', function() {

    expect(3);

    // basic usage tests
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

    // return value basic test
    equal(muc.title(), 'New', 'return key value');

});
