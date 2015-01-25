

asyncTest( "Graphlet sample transpiler output run test", function(assert) {
  expect(1);
  var $env = $('#qunit-work-area');
  var $fixture = $env.append('<div id="graphlet">loading</div>');

  init();
  // trigger event
  $('#start_button').trigger("click");
  setTimeout(function() {
	  assert.equal( $('.counter').text(), "1", "the graphlet ran and set counter to 1" );
    QUnit.start();
    //$('#qunit-work-area').empty();
  }, 1000);
});

