var graph_examples = [{"graph":{"name":"Hello World"},"nodes":[
  {"name":"start","id":"n0","view":{"position":{"x":124,"y":80}},"node_type":"process"},
  {"name":"send","process":["~salutation = ~salutation . ~name"],"data":{"salutation":"Hi "},"id":"n1","view":{"position":{"x":124,"y":196}},"node_type":"process"},
  {"name":"Hello","data":{"salutation":"Hello "},"id":"n2","view":{"position":{"x":316,"y":105}},"node_type":"data"},
  {"name":"out","type":"io","node_type":"io","id":"n3","view":{"position":{"x":446,"y":304}}},
  {"name":"name","type":"io","subtype":"POST","data":{"name":"World"},"node_type":"io","id":"n4","view":{"position":{"x":446,"y":196}}},
  {"name":"end","id":"n5","view":{"position":{"x":124,"y":302}},"node_type":"process"}
 ],
 "edges":[
  ["n0","n1","flo","",null],
  ["n1","n2","get","salutation",null],
  ["n1","n4","get","name",null],
  ["n1","n3","set","greeting",null],
  ["n1","n5","evt","",null]
 ]
}];


