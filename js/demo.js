var graph = {"nodes":[
  {"view":{"position":{"x":66,"y":152}},"id":"start"},
  {"view":{"position":{"x":328,"y":152}},"id":"process"},
  {"view":{"position":{"x":328,"y":300}},"id":"end"},
  {"view":{"position":{"x":205,"y":51}},"id":"input 1","node_type":"io"},
  {"view":{"position":{"x":445,"y":51}},"id":"output 1","node_type":"io"}
 ],
 "edges":[
  ["start","input 1","get","a"],
  ["start","end","flo","exit"],
  ["process","end","flo","done"],
  ["process","input 1","get","a"],
  ["process","output 1","set","'Hello '+a"],
  ["start","process","flo","a.length"],
  ["input 1","start","evt","on-change"]
 ]
};
graph = {"nodes":[
  {"id":"0","ele":"body","type":"in","input":{"event":{"mousemove":"traverse"}},"view":{"position":{"x":78,"y":52}}},
  {"id":"1","name":"move","data":{"lastEvent":{}},"process":"function() {  this.move = (this.lastEvent.offsetX !== this.event.offsetX || this.lastEvent.offsetY !== this.event.offsetY);  this.lastEvent.offsetX = this.event.offsetX;  this.lastEvent.offsetY = this.event.offsetY;}","view":{"position":{"x":276,"y":40}}},
  {"id":"2","name":"show","data":{"count":2},"process":"function() {$('.rollshow').show('slow');}","view":{"position":{"x":277,"y":150}}},
  {"id":"3","name":"count","data":{"count":2},"view":{"position":{"x":448,"y":204}}},
  {"id":"4","name":"countDown","process":"function() {this.count -= 1;}","view":{"position":{"x":210,"y":230}}},
  {"id":"5","name":"hide","process":"function() {  $('.rollshow').fadeOut(2000);}","view":{"position":{"x":214,"y":344}}},
  {"id":"6","name":"timer","type":"in","timer":{"duration":2000,"action":"traverse"},"view":{"position":{"x":68,"y":201}}}
 ],
 "edges":[
  ["0","1","evt","mousemove"],
  ["1","2","flo","function() {return this.move;}"],
  ["4","5","flo","function() {return (this.count <= 0);}"],
  ["4","3","get","count"],
  ["4","3","set","count"],
  ["2","3","set","count"],
  ["6","4","flo",""]
 ]
};
graph = {"nodes":[
  {"view":{"position":{"x":186,"y":116}},"id":"start","node_type":"process"},
  {"view":{"position":{"x":186,"y":266}},"id":"process","node_type":"process"},
  {"view":{"position":{"x":390,"y":83}},"id":"input_1","node_type":"io"},
  {"view":{"position":{"x":390,"y":324}},"id":"output_1","node_type":"io"}
 ],
 "edges":[
  ["start","input_1","get","a"],
  ["process","input_1","get","a"],
  ["process","output_1","set","'Hello '+a"],
  ["start","process","flo","a.length"],
  ["input_1","start","evt","on-\"change\""]
 ]
};
graph={"nodes":[
  {"name":"start","id":"n0","view":{"position":{"x":126,"y":121}}},
  {"name":"convey","process":["~salutation = ~salutation . ~name"],"data":{"salutation":"Hi "},"id":"n1","view":{"position":{"x":172,"y":192}}},
  {"name":"contents","data":{"salutation":"Hello "},"id":"n2","view":{"position":{"x":256,"y":55}}},
  {"name":"out","type":"out","id":"n3","view":{"position":{"x":500,"y":100}}},
  {"name":"name","type":"in","subtype":"POST","data":{"name":"World"},"id":"n4","view":{"position":{"x":300,"y":100}}},
  {"name":"end","id":"n5","view":{"position":{"x":98,"y":278}}}
 ],
 "edges":[
  ["n0","n1","evt","",null],
  ["n1","n2","get","salutation",null],
  ["n1","n4","get","name",null],
  ["n1","n3","set","salutation",null],
  ["n1","n5","evt","",null]
 ]
};
graph={"nodes":[
  {"name":"start","id":"n0","view":{"position":{"x":125.26381440203345,"y":78.79226141662504}},"node_type":"process"},
  {"name":"send","process":["~salutation = ~salutation . ~name"],"data":{"salutation":"Hi "},"id":"n1","view":{"position":{"x":124.26381440203345,"y":195.79226141662497}},"node_type":"process"},
  {"name":"contents","data":{"salutation":"Hello "},"id":"n2","view":{"position":{"x":345.2638144020333,"y":68.15574793951224}},"node_type":"data"},
  {"name":"out","type":"io","node_type":"io","id":"n3","view":{"position":{"x":402.2638144020333,"y":281.7922614166249}}},
  {"name":"name","type":"io","subtype":"POST","data":{"name":"World"},"node_type":"io","id":"n4","view":{"position":{"x":445.57712639586674,"y":173.93124726609923}}},
  {"name":"end","id":"n5","view":{"position":{"x":124.26381440203345,"y":301.7922614166249}},"node_type":"process"}
 ],
 "edges":[
  ["n0","n1","flo","",null],
  ["n1","n2","get","salutation",null],
  ["n1","n4","get","name",null],
  ["n1","n3","set","salutation",null],
  ["n1","n5","evt","",null]
 ]
};


