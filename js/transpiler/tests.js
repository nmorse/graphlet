test( "Graphlet selector tests", function(assert) {
  expect(2);
  var graph = {"graph":{"name":"a"},"nodes":[
	  {"name":"a","id":"n0","view":{"position":{"x":124,"y":80}}},
	  {"name":"b","id":"n1","view":{"position":{"x":124,"y":196}}}
	 ],
	 "edges":[
	  ["n0","n1","flo","goto_b","a to b",0],
	  ["n1","n0","flo","goto_a","b to a",1]
	 ]
  };

  var state_out = graphlet2statemachine.process(graph);
  // 1
  assert.deepEqual(state_out.states.a, {
                                          "trans": {
                                            "goto_b": "a to b"
                                          }
                                        },
	"a transitions to b"
  );
  // 2
  assert.deepEqual(state_out.states.b, {
                                          "trans": {
                                            "goto_a": "b to a"
                                          }
                                        },
	"b transitions back to a"
  );
});

/*
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
*/
