
test( "Graphlet selector tests", function(assert) {
  expect(7);
  var graph = {"graph":{"name":"Hello World"},"nodes":[
	  {"name":"start","id":"n0", "io":{"type":"button"},"view":{"position":{"x":124,"y":80}},"node_type":"io"},
	  {"name":"send","process":["~salutation = ~salutation . ~name"],"data":{"salutation":"Hi "},"id":"n1","view":{"position":{"x":124,"y":196}},"node_type":"process"},
	  {"name":"Hello","data":{"salutation":"Hello "},"id":"n2","view":{"position":{"x":316,"y":105}},"node_type":"data"},
	  {"name":"out","node_type":"io","id":"n3","view":{"position":{"x":446,"y":304}}},
	  {"name":"name","io":{"method":"POST","data":{"name":"World"}},"node_type":"io","id":"n4","view":{"position":{"x":446,"y":196}}},
	  {"name":"end","id":"n5","view":{"position":{"x":124,"y":302}},"node_type":"process"}
	 ],
	 "edges":[
	  ["n0","n1","flo","",null,0],
	  ["n1","n2","get","salutation",null,1],
	  ["n1","n4","get","name",null,2],
	  ["n1","n3","set","greeting",null,3],
	  ["n1","n5","evt","",null,4]
	 ]
  };
	
  // 1
  assert.deepEqual( 
	gq.using(graph).find({"element":"node", "id":"n1"}).graph(),  
	{"nodes":[{"name":"send","process":["~salutation = ~salutation . ~name"],"data":{"salutation":"Hi "},"id":"n1","view":{"position":{"x":124,"y":196}},"node_type":"process"}]},
	"selection of node n1 as a graph" 
  );
  // 2
  assert.deepEqual( 
	gq.using(graph).find({"element":"node", "id":"n1"}).nodes(),  
	[{"name":"send","process":["~salutation = ~salutation . ~name"],"data":{"salutation":"Hi "},"id":"n1","view":{"position":{"x":124,"y":196}},"node_type":"process"}],
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
  var $env = $("body");
  var $fixture = $env.append('<div id="graphlet">loading</div>');
 
  init_graphlet({"graph":{"name":"Hello World", "template":"<button id='start_button'>Say Hello</button><div class='greeting'></div>"},"nodes":[
	  {"name":"start","id":"n0", "io":{"selector":"#start_button", "event":"click"},"view":{"position":{"x":124,"y":80}},"node_type":"io"},
	  {"name":"send","process":["this.greeting = salutation + ' ' + name;"],"id":"n1","view":{"position":{"x":124,"y":196}},"node_type":"process"},
	  {"name":"Hello","data":{"salutation":"Hello"},"id":"n2","view":{"position":{"x":316,"y":105}},"node_type":"data"},
	  {"name":"greeting","node_type":"io", "io":{"selector":".greeting"},"id":"n3","view":{"position":{"x":446,"y":304}}},
	  {"name":"name","data":{"name":"World"},"node_type":"data","id":"n4","view":{"position":{"x":446,"y":196}}},
	  {"name":"end","id":"n5","view":{"position":{"x":124,"y":302}},"node_type":"data", "data":{"color": "rgb(255, 0, 0)"}}
	 ],
	 "edges":[
	  ["n0","n1","evt","click",null,0],
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
  }, 1000);
});
