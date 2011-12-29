test('Setup', function(){
    
    // test count
    expect(12);

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

    var oldVal = mucilage.settings.special,
	newVal = !oldVal;

    mucilage({
	special: newVal
    });

    equal(mucilage.settings.special, newVal, 'muciale(obj) -> update settings');

    mucilage.settings.special = oldVal;

    // making sure target is optional
    muc = mucilage('{{= $.foo }}', {foo:'foo'});
    deepEqual(muc[1], {foo:'foo'}, 'No target: data correctly set');
    equal(muc[0](muc[1]), 'foo', 'No target: templating works');

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

test('$ and _ ON', function() {

    expect(5);

    mucilage.settings.special = true;

    var tpl = '{{= $.foo }}',
	data = {foo:'foo'},
	muc = mucilage(tpl, data, document.createElement('div'));

    deepEqual(muc._(), data, 'retrieve data object');

    // data replace test
    muc._({foo:'FOO'});
    deepEqual(muc._(), {foo:'FOO'}, 'replace data object');

    // data extend test
    muc._({boo:'boo'}, true);
    deepEqual(muc._(), {foo:'FOO',boo:'boo'}, 'extend data object');

    equal(muc.$(), 'FOO', 'retrieve a freshly compiled template');

    muc.$('P{{= $.foo }}');
    equal(muc.$(), 'PFOO', 'updated template');

});

test('$ and _ OFF', function() {

     mucilage.settings.special = false;

    expect(2);

    var tpl = '{{= $.foo }}',
	data = {foo:'foo'},
	muc = mucilage(tpl, data, document.createElement('div'), false);

   equal(!!muc._, false, '_ not found');
   equal(!!muc.$, false, '$ not found');

});
