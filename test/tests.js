// Test core functions
test('Mucilage', function(){
    
    // test count
    expect(3);

    // some basic core tests
    ok(mucilage, 'mucilage');

    var template = '<h1>{{=$.title}}</h1><p>{{=$.message}}</p>',
	data = {
	    title: 'Title',
	    message: 'Message'
	},
	div = document.createElement('div'),
	muc = mucilage(template, data, div);

    equal(div.innerHTML, '<h1>Title</h1><p>Message</p>', 'initial state');

    muc.title('New');

    equal(div.innerHTML, '<h1>New</h1><p>Message</p>', 'update state');


});
