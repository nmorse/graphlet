var graph_examples = {
"Hello World": {
"graph":{"name":"Hello World version 1","template":"<button id='start_button'>Say Hello</button><div class='greeting'></div>"}, "nodes":[
  {"name":"start","id":"n0","io":{"selector":"#start_button"},"node_type":"io"},
  {"name":"send","process":["this.greeting = salutation + ' ' + name;"],"id":"n1","node_type":"process"},
  {"name":"Hello","data":{"salutation":"Hello"},"id":"n2","node_type":"data"},
  {"name":"greeting","node_type":"io","io":{"selector":".greeting"},"id":"n3"},
  {"name":"name","data":{"name":"World"},"node_type":"data","id":"n4"},
  {"name":"end","id":"n5","node_type":"data","data":{"color":"rgb(255, 0, 0)"}}
 ],
 "edges":[
  ["n0","n1","sub","click",null,0],
  ["n1","n2","get","salutation",null,1],
  ["n1","n4","get","name",null,2],
  ["n1","n3","set","greeting",null,3],
  ["n1","n5","flo","next",null,4]
 ],
 "views":{
	"primary":{"nodes":{
  "n0":{"position":{"x":124,"y":80}},
  "n1":{"position":{"x":124,"y":196}},
  "n2":{"position":{"x":316,"y":105}},
  "n3":{"position":{"x":446,"y":302}},
  "n4":{"position":{"x":446,"y":196}},
  "n5":{"position":{"x":124,"y":302}}
 },
 "edges":{}}, 
 "second":{"nodes":{
  "n0":{"position":{"x":114,"y":80}},
  "n1":{"position":{"x":134,"y":196}},
  "n2":{"position":{"x":326,"y":105}},
  "n3":{"position":{"x":436,"y":302}},
  "n4":{"position":{"x":426,"y":196}},
  "n5":{"position":{"x":144,"y":302}}
 },
 "edges":{}}}
},"Hello World version 2": {"graph": {"name":"Hello World version 1","template":"<button id='start_button'>Say Hello</button><div class='greeting'></div>"}, "nodes":[
  {"name":"start","id":"n0","io":{"selector":"#start_button"},"view":{"position":{"x":124,"y":80}},"node_type":"io"},
  {"name":"send","process":["this.greeting = salutation + ' ' + name;"],"id":"n1","view":{"position":{"x":124,"y":196}},"node_type":"process"},
  {"name":"Hello","data":{"salutation":"Hello"},"id":"n2","view":{"position":{"x":316,"y":105}},"node_type":"data"},
  {"name":"greeting","node_type":"io","io":{"selector":".greeting"},"id":"n3","view":{"position":{"x":446,"y":302}}},
  {"name":"name","data":{"name":"World"},"node_type":"data","id":"n4","view":{"position":{"x":446,"y":196}}},
  {"name":"end","id":"n5","view":{"position":{"x":124,"y":302}},"node_type":"data","data":{"color":"rgb(255, 0, 0)"}}
 ],
 "edges":[
  ["n0","n1","sub","click",null,0],
  ["n1","n2","get","salutation",null,1],
  ["n1","n4","get","name",null,2],
  ["n1","n3","set","greeting",null,3],
  ["n1","n5","flo","next","greeting === 'Hello World'",4],
  ["n5","n3","set",".css",null,5]
 ]
},
"shake 1":
{"graph": {"name":"shake 2.5","template":"<input type='text' id='textbox' value='' placeholder='type here' />"}, "nodes":[
  {"view":{"position":{"x":90,"y":88}},"id":"n4","name":"2000 ms","node_type":"data","data":{"timeout":2000}},
  {"view":{"position":{"x":450,"y":251}},"id":"n3","name":"shake","node_type":"data","data":{"effect":"shake", "distance":5}},
  {"view":{"position":{"x":281,"y":290}},"id":"n2","name":"new text","node_type":"data","data":{"string":""}},
  {"view":{"position":{"x":322,"y":127}},"id":"n1","name":"text box","node_type":"io","io":{"selector":"#textbox"}},
  {"view":{"position":{"x":146,"y":192}},"id":"n0","name":"timer","node_type":"process","process":["this.defered_transition = true; wait(target_node_id, timeout);"]}
 ],
 "edges": [
  ["n1","n0","sub","keyup",null,0],
  ["n0","n2","flo","when done",null,1],
  ["n2","n3","flo","next",null,2],
  ["n2","n1","set","string",null,3],
  ["n3","n1","pub","effect",null,4],
  ["n0","n4","get","timeout",null,5]
 ]
},
"shake 2":
{"graph": {"name":"shake 2","template":"<input type='text' id='textbox' value='' placeholder='type here' />"}, "nodes":[
  {"view":{"position":{"x":146,"y":192}},"id":"n0","name":"timer","node_type":"process","process":["this.defered_transition = true; wait(target_node_id, timeout);"]},
  {"view":{"position":{"x":322,"y":127}},"id":"n1","name":"text box","node_type":"io","io":{"selector":"#textbox"}},
  {"view":{"position":{"x":245,"y":290}},"id":"n2","name":"new text","node_type":"data","data":{"string":""}},
  {"view":{"position":{"x":450,"y":251}},"id":"n3","name":"shake","node_type":"data","data":{"effect":"shake","distance":5}},
  {"view":{"position":{"x":90,"y":88}},"id":"n4","name":"2000 ms","node_type":"data","data":{"timeout":2000}}
 ],
 "edges": [
  ["n1","n0","sub","keyup",null,0],
  ["n0","n2","flo","when done",null,1],
  ["n2","n3","flo","next",null,2],
  ["n2","n1","set","string",null,3],
  ["n3","n1","pub","effect",null,4],
  ["n0","n4","get","timeout",null,5],
  ["n2","n1","get","effect state","",6]
 ]
},
"Loop 1": {"graph":{"name":"loop 1","template":"<button id='start_button'>Start</button><div class='counter'></div>"}, "nodes":[
  {"name":"start","id":"n0","io":{"selector":"#start_button"},"node_type":"io","view":{"position":{"x":124,"y":80}}},
  {"name":"c+=1","process":["this.c = c + 1;"],"id":"n1","node_type":"process","view":{"position":{"x":123,"y":248}}},
  {"name":"fin","id":"n5","node_type":"data","data":{"c":0},"view":{"position":{"x":124,"y":336}}},
  {"id":"n3","node_type":"io","name":"c","io":{"selector":".counter"},"data":{"c":0},"view":{"position":{"x":327,"y":253}}},
  {"id":"n4","node_type":"data","data":{"c":0},"name":"0","view":{"position":{"x":123,"y":165}}}
 ],
 "edges":[
  ["n1","n5","flo","c > 5","c > 5",0],
  ["n1","n3","set","","",1],
  ["n0","n4","sub","click","",2],
  ["n4","n1","flo","","",3],
  ["n1","n3","get","","",4],
  ["n4","n3","set","","",5],
  ["n1","n1","flo","","c <=5",6]
 ]
},
"Loop 2": {"graph":{"name":"loop 2","template":"<button id='start_button'>Start</button><div class='counter'></div>"}, "nodes":[
  {"id":"n4","node_type":"data","data":{"c":0},"name":"0","view":{"position":{"x":123,"y":165}}},
  {"id":"n3","node_type":"io","name":"c","io":{"selector":".counter"},"data":{"c":0},"view":{"position":{"x":333,"y":94}}},
  {"name":"fin","id":"n5","node_type":"data","data":{"c":0},"view":{"position":{"x":124,"y":336}}},
  {"name":"c+=1","process":["this.c = c + 1;"],"id":"n1","node_type":"process","view":{"position":{"x":123,"y":248}}},
  {"name":"start","id":"n0","io":{"selector":"#start_button"},"node_type":"io","view":{"position":{"x":124,"y":80}}},
  {"id":"n6","node_type":"process","process":[" this.defered_transition = true; wait(target_node_id, 750);"],"name":"pause","view":{"position":{"x":330,"y":248}}}
 ],
 "edges":[
  ["n1","n5","flo","c > 5","c > 5",0],
  ["n1","n3","set","","",1],
  ["n0","n4","sub","click","",2],
  ["n4","n1","flo","","",3],
  ["n1","n3","get","","",4],
  ["n4","n3","set","","",5],
  ["n1","n6","flo","c <= 5","c <= 5",6],
  ["n6","n1","flo","","",7]
 ]
},
"counter 1":
{"graph":{"name":"counter 1","template":"<button id='start_button'>Start</button><div class='counter'></div>"}, "nodes":[
  {"id":"n3","node_type":"io","name":"c","io":{"selector":".counter"},"data":{"c":0},"view":{"position":{"x":298,"y":83}}},
  {"name":"0","id":"n5","node_type":"data","data":{"c":0},"view":{"position":{"x":298,"y":192}}},
  {"name":"+1","process":["this.c = c + 1;"],"id":"n1","node_type":"process","view":{"position":{"x":124,"y":196}}},
  {"name":"start","id":"n0","io":{"selector":"#start_button"},"node_type":"io","view":{"position":{"x":124,"y":80}}}
 ],
 "edges":[
  ["n0","n1","sub","click","",0],
  ["n1","n5","flo","c > 5","c > 5",1],
  ["n1","n3","set","","",2],
  ["n1","n3","get","","",3],
  ["n5","n3","set","","",4]
 ]
}};


