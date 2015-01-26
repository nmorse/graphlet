

asyncTest( "Graphlet sample transpiler output run test", function(assert) {
  expect(4);
  var $env = $('#qunit-work-area');
  var $fixture = $env.append('<div id="graphlet">loading</div>');

  init("#graphlet");

  setTimeout(function() {
    // trigger event
    $('#start_button').trigger("click");
    setTimeout(function() {
  	  assert.equal( $('.counter').text(), "1", "the counter graphlet ran and set the counter to '1'" );

      $('#start_button').trigger("click");
      setTimeout(function() {
    	  assert.equal( $('.counter').text(), "2", "the counter graphlet ran and set the counter to '2'" );

        $('#start_button').trigger("click");
        setTimeout(function() {
      	  assert.equal( $('.counter').text(), "3", "the counter graphlet ran and set the counter to '3'" );

          $('#start_button').trigger("click");
            setTimeout(function() {
          	  assert.equal( $('.counter').text(), "1", "the counter graphlet ran once more and set the counter back to '1'" );
              QUnit.start();
              $('#qunit-work-area').empty();
            }, 500);
        }, 500);
      }, 500);
    }, 500);
  }, 1000);
});

