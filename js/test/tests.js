// test

test( "Graphlet selector tests", function(assert) {
  expect(7);
  var graph = {"graph":{"name":"Hello World"},"nodes":[
	  {"name":"start","id":"n0", "io":{"type":"button"},"view":{"position":{"x":124,"y":80}}},
	  {"name":"send","process":["~salutation = ~salutation . ~name"],"data":{"salutation":"Hi "},"id":"n1","view":{"position":{"x":124,"y":196}}},
	  {"name":"Hello","data":{"salutation":"Hello "},"id":"n2","view":{"position":{"x":316,"y":105}}},
	  {"name":"out","id":"n3","view":{"position":{"x":446,"y":304}}},
	  {"name":"name","io":{"method":"POST","data":{"name":"World"}},"id":"n4","view":{"position":{"x":446,"y":196}}},
	  {"name":"end","id":"n5","view":{"position":{"x":124,"y":302}}}
	 ],
	 "edges":[
	  ["n0","n1","flo","",null,0],
	  ["n1","n2","get","salutation",null,1],
	  ["n1","n4","get","name",null,2],
	  ["n1","n3","set","greeting",null,3],
	  ["n1","n5","sub","",null,4]
	 ]
  };

  // 1
  assert.deepEqual(
	gq.using(graph).find({"element":"node", "id":"n1"}).graph(),
	{"nodes":[{"name":"send","process":["~salutation = ~salutation . ~name"],"data":{"salutation":"Hi "},"id":"n1","view":{"position":{"x":124,"y":196}}}]},
	"selection of node n1 as a graph"
  );
  // 2
  assert.deepEqual(
	gq.using(graph).find({"element":"node", "id":"n1"}).nodes(),
	[{"name":"send","process":["~salutation = ~salutation . ~name"],"data":{"salutation":"Hi "},"id":"n1","view":{"position":{"x":124,"y":196}}}],
	"selection of node n1 as nodes"
  );
  // 3
  assert.deepEqual(
	gq.using(graph).find({"element":"edge", "type":"get", "from":"n1"}).edges(),
	[["n1","n2","get","salutation",null,1],
	 ["n1","n4","get","name",null,2]],
	"only 'get' edges out of node n1"
  );
  // 4
  assert.deepEqual(
	gq.using(graph).find({"element":"edge", "from":"n1"}).edges().length,
	4,
	"count all edges out of node n1"
  );
  // 5
  assert.deepEqual(
	gq.using(graph).find({"element":"edge", "from":"n0"}).graph(),
	{"edges":[["n0","n1","flo","",null,0]]},
	"all edges out of node n0"
  );
  // 6
  assert.deepEqual(
	gq.using(graph).find({"element":"edge", "from":"n1", "to":"n3"}).edges(),
	[["n1","n3","set","greeting",null,3]],
	"combined selector to find only an edge that connects 2 nodes"
  );
  // 7
  assert.deepEqual(
	gq.using(graph).find({"element":"edge", "from":"n1"}).find({"element":"edge", "to":"n3"}).graph(),
	{"edges":[["n1","n3","set","greeting",null,3]]},
	"chain selectors to find only an edge that connects 2 nodes"
  );
});

asyncTest( "Graphlet procedural run test on a simple Hello World graphlet", function(assert) {
  expect(2);
  var $env = $('#qunit-work-area');
  var $fixture = $env.append('<div id="graphlet">loading</div>');

  init_graphlet({"graph":{"name":"Hello World", "template":"<button id='start_button'>Say Hello</button><div class='greeting'></div>"},"nodes":[
	  {"name":"start","id":"n0", "io":{"selector":"#start_button"},"view":{"position":{"x":124,"y":80}}},
	  {"name":"send","process":["this.greeting = salutation + ' ' + name;"],"id":"n1","view":{"position":{"x":124,"y":196}}},
	  {"name":"Hello","data":{"salutation":"Hello"},"id":"n2","view":{"position":{"x":316,"y":105}}},
	  {"name":"greeting", "io":{"selector":".greeting"},"id":"n3","view":{"position":{"x":446,"y":304}}},
	  {"name":"name","data":{"name":"World"},"id":"n4","view":{"position":{"x":446,"y":196}}},
	  {"name":"end","id":"n5","view":{"position":{"x":124,"y":302}}, "data":{"color": "rgb(255, 0, 0)"}}
	 ],
	 "edges":[
	  ["n0","n1","sub","click",null,0],
	  ["n1","n2","get","salutation",null,1],
	  ["n1","n4","get","name",null,2],
	  ["n1","n3","set","greeting",null,3],
	  ["n1","n5","flo","","greeting === 'Hello World'",4],
	  ["n5","n3","set",".css",null,5]
	 ]
  });

  // trigger event
  $('#start_button').trigger("click");
  setTimeout(function() {
	  assert.equal( $('.greeting').text(), "Hello World", "the graphlet ran and set the greeting to Hello World" );
	  assert.equal( $('.greeting').css('color'), "rgb(255, 0, 0)", "the graphlet ran and set the greeting to Hello World" );
    QUnit.start();
    $('#qunit-work-area').empty();
  }, 1000);
});

asyncTest( "Graphlet procedural run test on the demo 'shake 2' graphlet", function(assert) {
  expect(1);
  var $env = $('#qunit-work-area');
  var $fixture = $env.append('<div id="graphlet">loading</div>');

  init_graphlet({"graph":{"name":"shake 2.5","template":"<input type='text' id='textbox' value='' placeholder='type here' />"},
   "nodes":[
    {"id":"n4","name":"2000 ms","data":{"timeout":1000}},
    {"id":"n3","name":"shake","data":{"effect":"shake", "distance":5}},
    {"id":"n2","name":"new text","data":{"string":"new text"}},
    {"id":"n1","name":"text box","io":{"selector":"#textbox"}},
    {"id":"n0","name":"timer","process":["this.defered_transition = true; wait(target_node_id, timeout);"]}
   ],
   "edges":[
    ["n1","n0","sub","keyup",null,0],
    ["n0","n2","flo","when done",null,1],
    ["n2","n3","flo","next",null,2],
    ["n2","n1","set","string",null,3],
    ["n3","n1","pub","effect",null,4],
    ["n0","n4","get","timeout",null,5]
   ]
  });

  // trigger event
  $('#textbox').trigger("keyup");
  setTimeout(function() {
	  assert.equal( $('#textbox').val(), "new text", "the graphlet ran and set the textbox to 'new text'" );
    QUnit.start();
    $('#qunit-work-area').empty();
  }, 3000);
});

asyncTest( "Graphlet procedural run test on the demo 'loop 2' graphlet", function(assert) {
  expect(1);
  var $env = $('#qunit-work-area');
  var $fixture = $env.append('<div id="graphlet">loading</div>');

  init_graphlet(graph_examples['Loop 2']);

  // trigger event
  $('#start_button').trigger("click");
  setTimeout(function() {
	  assert.equal( $('.counter').text(), "6", "the graphlet ran and set the counter to '6'" );
    QUnit.start();
    $('#qunit-work-area').empty();
  }, 5000);
});

asyncTest( "Graphlet procedural run test on the demo 'Double Loop 1' graphlet", function(assert) {
  expect(2);
  var $env = $('#qunit-work-area');
  $('#qunit-work-area').empty();
  var $fixture = $env.append('<div id="graphlet">loading</div>');

  init_graphlet(graph_examples['Double Loop 1']);

  // trigger event
  $('#start_button').trigger("click");
  setTimeout(function() {
	  assert.equal( $('.var_i').text(), "3", "the graphlet ran and set the i to '3'" );
	  assert.equal( $('.var_i').text(), "3", "the graphlet ran and set the j to '3'" );
    QUnit.start();
    $('#qunit-work-area').empty();
  }, 1000);
});

asyncTest( "Graphlet procedural run test on the demo 'counter 3' graphlet", function(assert) {
  expect(4);
  var $env = $('#qunit-work-area');
  var $fixture = $env.append('<div id="graphlet">loading</div>');

  init_graphlet(graph_examples['counter 3']);

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
          }, 300);
      }, 300);
    }, 300);
  }, 300);
});

asyncTest( "Graphlet test 'calc 3'", function(assert) {
  expect(9);
  var $env = $('#qunit-work-area');
  var $fixture = $env.append('<div id="graphlet">loading</div>');

  init_graphlet(graph_examples['calc 3']);

  setTimeout(function() {
	  assert.equal( $('#mode').text(), "new number", "the mode starts at new number." );

    $('#num_7').trigger("click");
    setTimeout(function() {
  	  assert.equal( $('.readout').text(), "7", "A click on the 7 key works." );
  	  assert.equal( $('#mode').text(), "number", "the mode reflects a number." );

      $('#mult').trigger("click");
      setTimeout(function() {
    	  assert.equal( $('.readout').text(), "7*", "Multiply operator key" );
    	  assert.equal( $('#mode').text(), "new number", "the mode goes back to 'new number'" );

        $('#num_7').trigger("click");
          setTimeout(function() {
        	  assert.equal( $('.readout').text(), "7*7", "'7' key" );
        	  assert.equal( $('#mode').text(), "number", "the mode reflects a number." );

            $('#equals').trigger("click");
              setTimeout(function() {
            	  assert.equal( $('.readout').text(), "49", "after the '=' key" );
            	  assert.equal( $('#mode').text(), "number", "the mode reflects a number." );
                QUnit.start();
                $('#qunit-work-area').empty();
              }, 300);
          }, 300);
      }, 300);
    }, 300);
  }, 300);
});

// graphlet_vis is not inluded so...
// stubbed out function so that test.html does not have to pull in all scripts
vis_node_selected = function (node_id) {
	  return false;
};

