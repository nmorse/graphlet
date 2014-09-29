var graph_examples = {
"Hello World version 1":
{"graph":{"name":"Hello World", "template":"<button id='start_button'>Say Hello</button><div class='greeting'></div>"},"nodes":[
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
  },
"shake 2":
{"graph":{"name":"shake 2"}, "nodes":[
  {"view":{"position":{"x":89,"y":74}},"id":"n4","name":"2000 ms"},
  {"view":{"position":{"x":449,"y":237}},"id":"n3","name":"finally"},
  {"view":{"position":{"x":280,"y":276}},"id":"n2","name":"''"},
  {"view":{"position":{"x":321,"y":113}},"id":"n1","name":"text box","node_type":"io"},
  {"view":{"position":{"x":145,"y":178}},"id":"n0","name":"timer","node_type":"process"}
 ],
 "edges":[
  ["n1","n0","evt","on change","change"],
  ["n0","n2","evt","on finish","finish"],
  ["n2","n3","flo","next",""],
  ["n2","n1","set","",null],
  ["n3","n1","evt","shake",null],
  ["n0","n4","get","as seconds",null]
 ]
}};


