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
	  ["n0","n1","sub","click",null,0],
	  ["n1","n2","get","salutation",null,1],
	  ["n1","n4","get","name",null,2],
	  ["n1","n3","set","greeting",null,3],
	  ["n1","n5","flo","","greeting === 'Hello World'",4],
	  ["n5","n3","set",".css",null,5]
	 ]
  },
"shake 2":
{"graph":{"name":"shake 2.5","template":"<input type='text' id='textbox' value='type here' />"}, "nodes":[
  {"view":{"position":{"x":90,"y":88}},"id":"n4","name":"2000 ms","node_type":"data","data":{"timeout":2000}},
  {"view":{"position":{"x":450,"y":251}},"id":"n3","name":"finally","node_type":"data","data":{"action":"shake"}},
  {"view":{"position":{"x":281,"y":290}},"id":"n2","name":"''","node_type":"data","data":{"s":""}},
  {"view":{"position":{"x":322,"y":127}},"id":"n1","name":"text box","node_type":"io","io":{"selector":"#textbox"}},
  {"view":{"position":{"x":146,"y":192}},"id":"n0","name":"timer","node_type":"process","process":["setTimeout(this.transition, this.timeout);","this.wait();"]}
 ],
 "edges":[
  ["n1","n0","sub","change",null,0],
  ["n0","n2","flo","on finish",null,1],
  ["n2","n3","flo","next",null,2],
  ["n2","n1","set","s",null,3],
  ["n3","n1","pub","shake",null,4],
  ["n0","n4","get","as seconds",null,5]
 ]
}};


