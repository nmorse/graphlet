var graph_examples = {
"Hello World": {"graph":{"name":"Hello World","template":"<button id='start_button'>Say Hello</button><div class='greeting'></div>"}, "nodes":[
  {"name":"selector","id":"n0","io":{"selector":"#start_button"},"node_type":"io"},
  {"name":"concat","process":["this.greeting = salutation + ' ' + name;"],"id":"n1","node_type":"process"},
  {"name":"","data":{"salutation":"Hello"},"id":"n2","node_type":"data"},
  {"name":"selector","node_type":"io","io":{"selector":".greeting"},"id":"n3","parent":"n6"},
  {"name":"name","data":{"name":"World"},"node_type":"data","id":"n4","parent":"n6"},
  {"name":"end","id":"n5","node_type":"data","data":{}},
  {"name":"group","id":"n6","node_type":"process"}
 ],
 "edges":[
  ["n0","n1","sub","click","",0],
  ["n1","n2","get","salutation","",1],
  ["n1","n4","get","name","",2],
  ["n1","n3","set","greeting","",3],
  ["n1","n5","flo","next","",4]
 ],
 "views":[{"name":"first","nodes":{"n6":{"position":{"x":423,"y":226}},"n5":{"position":{"x":128,"y":302},"width":80},"n4":{"position":{"x":423,"y":186},"width":100},"n3":{"position":{"x":424,"y":265},"width":80},"n2":{"position":{"x":316,"y":105},"width":128},"n1":{"position":{"x":124,"y":196},"width":80},"n0":{"position":{"x":124,"y":80},"width":110}},"edges":{}},{"name":"second view","nodes":{"n0":{"position":{"x":114,"y":80},"width":110},"n1":{"position":{"x":134,"y":196},"width":60},"n2":{"position":{"x":326,"y":105},"width":140},"n3":{"position":{"x":456,"y":310},"width":80},"n4":{"position":{"x":415,"y":196},"width":80},"n5":{"position":{"x":153,"y":316},"width":60},"n6":{"position":{"x":436,"y":253}}},"edges":{}},{"name":"sideways","nodes":{"n6":{"position":{"x":380,"y":121}},"n5":{"position":{"x":296,"y":329},"width":70},"n4":{"position":{"x":278,"y":92},"width":70},"n3":{"position":{"x":481,"y":151},"width":70},"n2":{"position":{"x":118,"y":207},"width":140},"n1":{"position":{"x":296,"y":254},"width":70},"n0":{"position":{"x":489,"y":308},"width":110}},"edges":{}}]
},
"Hello World version 2": {"graph":{"name":"Hello World version 2","template":"<button id='start_button'>Say Hello</button><div class='greeting'></div>"}, "nodes":[
  {"name":"start","id":"n0","io":{"selector":"#start_button"},"node_type":"io"},
  {"name":"send","process":["this.greeting = salutation + ' ' + name;"],"id":"n1","node_type":"process"},
  {"name":"salutation","data":{"salutation":"Hello"},"id":"n2","node_type":"data"},
  {"name":"greeting","node_type":"io","io":{"selector":".greeting"},"id":"n3"},
  {"name":"name","data":{"name":"World"},"node_type":"data","id":"n4"},
  {"name":"end","id":"n5","node_type":"data","data":{"color":"rgb(255, 0, 0)"}}
 ],
 "edges":[
  ["n0","n1","sub","click",null,0],
  ["n1","n2","get","salutation",null,1],
  ["n1","n4","get","name",null,2],
  ["n1","n3","set","greeting",null,3],
  ["n1","n5","flo","next","greeting === 'Hello World'",4],
  ["n5","n3","set",".css",null,5]
 ],
 "views":[{"name":"primary","nodes":{"n0":{"position":{"x":124,"y":80},"width":60},"n1":{"position":{"x":124,"y":196},"width":60},"n2":{"position":{"x":316,"y":105},"width":60},"n3":{"position":{"x":446,"y":302},"width":60},"n4":{"position":{"x":446,"y":196},"width":60},"n5":{"position":{"x":124,"y":302},"width":60}},"edges":{}}]
},
"shake 1":
{"graph": {"name":"shake 2.5","template":"<input type='text' id='textbox' value='' placeholder='type here' />"},
"nodes":[
 {"id":"n4","name":"timeout {{timeout}} ms","node_type":"data","data":{"timeout":2000}},
 {"id":"n3","name":"effect","node_type":"data","data":{"effect":"shake", "distance":5}},
 {"id":"n2","name":"string","node_type":"data","data":{"string":"new text"}},
 {"id":"n1","name":"text box","node_type":"io","io":{"selector":"#textbox"}},
 {"id":"n0","name":"timer","node_type":"process","process":["wait(timeout);"]}
],
"edges":[
 ["n1","n0","sub","keyup",null,0],
 ["n0","n2","flo","when done",null,1],
 ["n2","n3","flo","next",null,2],
 ["n2","n1","set","string",null,3],
 ["n3","n1","pub","effect",null,4],
 ["n0","n4","get","timeout",null,5]
],
"views":[{"name":"primary","nodes":{"n0":{"position":{"x":146,"y":192},"width":60},"n1":{"position":{"x":322,"y":127},"width":60},"n2":{"position":{"x":245,"y":290},"width":60},"n3":{"position":{"x":450,"y":251},"width":60},"n4":{"position":{"x":90,"y":88},"width":60}},"edges":{}}]
},
"shake 2":
{"graph":{"name":"shake 2","template":"<input type='text' id='textbox' value='' placeholder='type here' />"}, "nodes":[
  {"id":"n0","name":"timer","node_type":"process","process":["wait(timeout);"]},
  {"id":"n1","name":"text box","node_type":"io","io":{"selector":"#textbox"}},
  {"id":"n2","name":"new text","node_type":"data","data":{"string":""}},
  {"id":"n3","name":"shake","node_type":"data","data":{"effect":"shake","distance":5}},
  {"id":"n4","name":"2000 ms","node_type":"data","data":{"timeout":2000}}
 ],
 "edges":[
  ["n1","n0","sub","keyup",null,0],
  ["n0","n2","flo","when done",null,1],
  ["n2","n3","flo","next",null,2],
  ["n2","n1","set","string",null,3],
  ["n3","n1","pub","effect",null,4],
  ["n0","n4","get","timeout",null,5],
  ["n2","n1","get","effect state","",6]
 ],
 "views":[{"name":"primary","nodes":{"n0":{"position":{"x":146,"y":192},"width":60},"n1":{"position":{"x":322,"y":127},"width":60},"n2":{"position":{"x":245,"y":290},"width":60},"n3":{"position":{"x":450,"y":251},"width":60},"n4":{"position":{"x":90,"y":88},"width":60}},"edges":{}}]
},
"Loop 1": {"graph":{"name":"Loop 1","template":"<button id='start_button'>Start</button><div class='counter'></div>"}, "nodes":[
  {"name":"start","id":"n0","io":{"selector":"#start_button"},"node_type":"io"},
  {"name":"c+=1","process":["this.c = c + 1;"],"id":"n1","node_type":"process"},
  {"name":"fin","id":"n5","node_type":"data","data":{"c":0}},
  {"id":"n3","node_type":"io","name":"c","io":{"selector":".counter"},"data":{"c":0}},
  {"id":"n4","node_type":"data","data":{"c":0},"name":"c"}
 ],
 "edges":[
  ["n1","n5","flo","","",0],
  ["n1","n3","set","","",1],
  ["n0","n4","sub","click","",2],
  ["n4","n1","flo","","",3],
  ["n1","n3","get","","",4],
  ["n4","n3","set","","",5],
  ["n1","n1","flo","","c <=5",6]
 ],
 "views":[{"name":"primary","nodes":{"n0":{"position":{"x":125,"y":64},"width":70},"n1":{"position":{"x":124,"y":233},"width":70},"n5":{"position":{"x":125,"y":320},"width":70},"n3":{"position":{"x":339,"y":233},"width":70},"n4":{"position":{"x":124,"y":149}}},"edges":{}}]
},
"Loop 2": {"graph":{"name":"Loop 2","template":"<button id='start_button'>Start</button><div class='counter'></div>"}, "nodes":[
  {"id":"n6","node_type":"process","process":["wait(750);"],"name":"pause"},
  {"name":"start","id":"n0","io":{"selector":"#start_button"},"node_type":"io"},
  {"name":"c+=1","process":["this.c = c + 1;"],"id":"n1","node_type":"process"},
  {"name":"fin","id":"n5","node_type":"data","data":{"c":0}},
  {"id":"n3","node_type":"io","name":"c","io":{"selector":".counter"},"data":{"c":0}},
  {"id":"n4","node_type":"data","data":{"c":0},"name":"c"}
 ],
 "edges":[
  ["n1","n5","flo","","",0],
  ["n1","n3","set","","",1],
  ["n0","n4","sub","click","",2],
  ["n4","n1","flo","","",3],
  ["n1","n3","get","","",4],
  ["n4","n3","set","","",5],
  ["n1","n6","flo","c <= 5","c <= 5",6],
  ["n6","n1","flo","","",7]
 ],
 "views":[{"name":"basic","nodes":{"n6":{"position":{"x":325,"y":248},"width":60},"n0":{"position":{"x":124,"y":80},"width":60},"n1":{"position":{"x":123,"y":248},"width":60},"n5":{"position":{"x":124,"y":336},"width":60},"n3":{"position":{"x":325,"y":165},"width":60},"n4":{"position":{"x":123,"y":165},"width":60}},"edges":{}},{"name":"alternate","nodes":{"n4":{"position":{"x":303,"y":91},"width":60},"n3":{"position":{"x":303,"y":183},"width":60},"n5":{"position":{"x":127,"y":333},"width":60},"n1":{"position":{"x":126,"y":183},"width":60},"n0":{"position":{"x":124,"y":80},"width":60},"n6":{"position":{"x":262,"y":309},"width":60}},"edges":{}}]
},
"counter 1":
{"graph":{"name":"counter 1","template":"<button id='start_button'>Start</button><div class='counter'></div>"}, "nodes":[
  {"name":"start","id":"n0","io":{"selector":"#start_button"},"node_type":"io"},
  {"name":"+1","process":["this.c = c + 1;"],"id":"n1","node_type":"process"},
  {"name":"","id":"n5","node_type":"data","data":{"c":0}},
  {"id":"n3","node_type":"io","name":"c","io":{"selector":".counter"},"data":{"c":0}}
 ],
 "edges":[
  ["n0","n1","sub","click","",0],
  ["n1","n5","flo","c > 5","c > 5",1],
  ["n1","n3","set","","c <= 5",2],
  ["n1","n3","get","","",3],
  ["n5","n3","set","","",4]
 ],
 "views":[{"name":"primary","nodes":{"n3":{"position":{"x":380,"y":140},"width":60},"n5":{"position":{"x":380,"y":250},"width":60},"n1":{"position":{"x":200,"y":250},"width":60},"n0":{"position":{"x":200,"y":140},"width":60}},"edges":{}},{"name":"my view","nodes":{"n0":{"position":{"x":447,"y":97},"width":60},"n1":{"position":{"x":235,"y":153},"width":60},"n5":{"position":{"x":145,"y":267},"width":60},"n3":{"position":{"x":326,"y":269},"width":60}},"edges":{}}]
},
"counter 2":
{"graph":{"name":"counter 2","template":"<button id='start_button'>Start</button><div class='counter'></div><div><input id='limit_input' /></div>"}, "nodes":[
  {"id":"n2","name":"limit","node_type":"io","data":{"limit":3},"io":{"selector":"#limit_input"}},
  {"id":"n3","node_type":"io","name":"c","io":{"selector":".counter"},"data":{"c":0}},
  {"name":"c","id":"n5","node_type":"data","data":{"c":0}},
  {"name":"","process":["this.c = c + 1;"],"id":"n1","node_type":"process"},
  {"name":"start","id":"n0","io":{"selector":"#start_button"},"node_type":"io"}
 ],
 "edges":[
  ["n0","n1","sub","click","",0],
  ["n1","n5","flo","","c > limit",1],
  ["n1","n3","set","","c <= limit",2],
  ["n1","n3","get","","",3],
  ["n5","n3","set","","",4],
  ["n1","n2","get","","",5]
 ],
 "views":[{"name":"primary","nodes":{"n0":{"position":{"x":200,"y":140},"width":60},"n1":{"position":{"x":200,"y":250},"width":60},"n5":{"position":{"x":380,"y":250},"width":60},"n3":{"position":{"x":380,"y":140},"width":60},"n2":{"position":{"x":103,"y":190},"width":60}},"edges":{}},{"name":"my view","nodes":{"n2":{"position":{"x":445,"y":154},"width":60},"n3":{"position":{"x":326,"y":269},"width":60},"n5":{"position":{"x":145,"y":267},"width":60},"n1":{"position":{"x":235,"y":153},"width":60},"n0":{"position":{"x":447,"y":97},"width":60}},"edges":{}}]
},
"counter 3":
{"graph":{"name":"counter 3","template":"<button id='start_button'>Start</button><div class='counter'></div><div><input id='limit_input' /></div>"}, "nodes":[
  {"id":"n4","name":"init","node_type":"process"},
  {"name":"start","id":"n0","io":{"selector":"#start_button"},"node_type":"io"},
  {"name":"","process":["this.c = c + 1;"],"id":"n1","node_type":"process"},
  {"name":"c","id":"n5","node_type":"data","data":{"c":1}},
  {"id":"n3","node_type":"io","name":"c","io":{"selector":".counter"},"data":{"c":1}},
  {"id":"n2","name":"limit","node_type":"io","data":{"limit":3},"io":{"selector":"#limit_input","valve":3}},
  {"id":"n6","name":"Graph","node_type":"io"}
 ],
 "edges":[
  ["n1","n5","flo","","c > limit",0],
  ["n1","n3","set","","c <= limit",1],
  ["n1","n3","get","","",2],
  ["n5","n3","set","","",3],
  ["n1","n2","get","","",4],
  ["n4","n2","get","limit","c",5],
  ["n4","n3","set","","",6],
  ["n0","n1","sub","click","",7],
  ["n6","n4","sub","graph_init","",8]
 ],
 "views":[{"name":"primary","nodes":{"n6":{"position":{"x":105,"y":59},"width":60},"n2":{"position":{"x":103,"y":190},"width":60},"n3":{"position":{"x":365,"y":150},"width":60},"n5":{"position":{"x":380,"y":250},"width":60},"n1":{"position":{"x":200,"y":250},"width":60},"n0":{"position":{"x":463,"y":300},"width":60},"n4":{"position":{"x":202,"y":122},"width":60}},"edges":{}},{"name":"my view","nodes":{"n4":{"position":{"x":374,"y":299},"width":60},"n0":{"position":{"x":495,"y":63},"width":60},"n1":{"position":{"x":235,"y":153},"width":60},"n5":{"position":{"x":164,"y":58},"width":60},"n3":{"position":{"x":89,"y":155},"width":60},"n2":{"position":{"x":495,"y":145},"width":60},"n6":{"position":{"x":96,"y":299},"width":60}},"edges":{}}]
},
"Double Loop 1":
{"graph":{"name":"Double Loop 1","template":"<button id='start_button'>Start</button><div>i = <span class='var_i'></span></div><div>j = <span class='var_j'></span></div>"}, "nodes":[
  {"id":"n7","name":"j","node_type":"data","data":{"j":0}},
  {"id":"n6","name":"Start","node_type":"io","io":{"selector":"#start_button","event":""}},
  {"id":"n3","name":"j","node_type":"io","io":{"selector":".var_j","event":""}},
  {"id":"n0","name":"i","node_type":"data","data":{"i":0}},
  {"id":"n1","name":"outer loop","node_type":"process","process":["this.i = i + 1;"]},
  {"id":"n2","name":"i","node_type":"io","io":{"selector":".var_i","event":""}},
  {"id":"n4","name":"inner loop","node_type":"process","process":["this.j = j + 1;"]},
  {"id":"n5","name":"fin","node_type":"process"}
 ],
 "edges":[
  ["n0","n2","set","","",0],
  ["n1","n2","get","","",1],
  ["n4","n3","get","","",2],
  ["n0","n1","flo","","",3],
  ["n4","n3","set","","",4],
  ["n1","n2","set","","",5],
  ["n1","n5","flo","","",6],
  ["n4","n4","flo","","j < 3",7],
  ["n4","n1","flo","","",8],
  ["n6","n0","sub","click","",9],
  ["n1","n7","flo","","i < 3",10],
  ["n7","n4","flo","","",11],
  ["n7","n3","set","","",12]
 ],
 "views":[{"name":"basic","nodes":{"n7":{"position":{"x":375,"y":193},"width":60},"n6":{"position":{"x":99,"y":38},"width":60},"n3":{"position":{"x":514,"y":227},"width":60},"n0":{"position":{"x":195,"y":95},"width":60},"n1":{"position":{"x":245,"y":165},"width":60},"n2":{"position":{"x":381,"y":86},"width":70},"n4":{"position":{"x":345,"y":302},"width":70},"n5":{"position":{"x":148,"y":283},"width":70}},"edges":{}}]
},
"Double Loop 2":
{"graph":{"name":"Double Loop 2","template":"<button id='start_button'>Start</button><div>i = <span class='var_i'></span></div><div>j = <span class='var_j'></span></div><div>grid: <div class='table'></div></div>"}, "nodes":[
  {"id":"n7","name":"j","node_type":"data","data":{"j":0}},
  {"id":"n6","name":"Start","node_type":"io","io":{"selector":"#start_button","event":""}},
  {"id":"n3","name":"j","node_type":"io","io":{"selector":".var_j","event":""},"inspect":true},
  {"id":"n0","name":"i","node_type":"data","data":{"i":0}},
  {"id":"n1","name":"outer loop","node_type":"process","process":["this.i = i + 1;"]},
  {"id":"n2","name":"i","node_type":"io","io":{"selector":".var_i","event":""}},
  {"id":"n4","name":"inner loop","node_type":"process","process":["this.j = j + 1;"]},
  {"id":"n5","name":"fin","node_type":"process"},
  {"id":"n8","name":"","node_type":"data","data":{"i":0,"j":"0"}},
  {"id":"n9","name":"table","node_type":"io","process":[],"io":{"selector":".table"}}
 ],
 "edges":[
  ["n0","n2","set","","",0],
  ["n1","n2","get","","",1],
  ["n4","n3","get","","",2],
  ["n0","n1","flo","","",3],
  ["n4","n3","set","","",4],
  ["n1","n2","set","","",5],
  ["n1","n5","flo","","",6],
  ["n4","n4","flo","","j < 3",7],
  ["n4","n1","flo","","",8],
  ["n6","n0","sub","click","",9],
  ["n1","n7","flo","","i < 3",10],
  ["n7","n4","flo","","",11],
  ["n7","n3","set","","",12],
  ["n2","n8","set","","",13],
  ["n3","n8","set","","",14],
  ["n8","n9","set","","",15]
 ],
 "views":[{"name":"basic","nodes":{"n7":{"position":{"x":365,"y":221},"width":70},"n6":{"position":{"x":72,"y":43},"width":70},"n3":{"position":{"x":487,"y":196},"width":70},"n0":{"position":{"x":195,"y":95},"width":70},"n1":{"position":{"x":245,"y":165},"width":70},"n2":{"position":{"x":381,"y":86},"width":70},"n4":{"position":{"x":342,"y":322},"width":70},"n5":{"position":{"x":148,"y":283},"width":70},"n8":{"position":{"x":503,"y":127},"width":70},"n9":{"position":{"x":532,"y":55},"width":70}},"edges":{}}]
},
"Double Loop 3":
{"graph":{"name":"Double Loop 3","template":"<button id='start_button'>Start</button><div>i = <span class='var_i'></span></div><div>j = <span class='var_j'></span></div>"}, "nodes":[
  {"id":"n9","name":"inner work","node_type":"process"},
  {"id":"n8","name":"outer work","node_type":"process"},
  {"id":"n7","name":"j","node_type":"data","data":{"j":1}},
  {"id":"n6","name":"Start","node_type":"io","io":{"selector":"#start_button","event":""}},
  {"id":"n3","name":"j","node_type":"io","io":{"selector":".var_j","event":""}},
  {"id":"n0","name":"i","node_type":"data","data":{"i":1}},
  {"id":"n1","name":"","node_type":"process","process":["this.i++;"],"data":{"j":1}},
  {"id":"n2","name":"i","node_type":"io","io":{"selector":".var_i","event":""}},
  {"id":"n4","name":"","node_type":"process","process":["this.j++;"]},
  {"id":"n5","name":"fin","node_type":"process"}
 ],
 "edges":[
  ["n0","n2","set","","",0],
  ["n1","n2","get","","",1],
  ["n4","n3","get","","",2],
  ["n4","n3","set","","j <= 3",3],
  ["n1","n2","set","","i <= 3",4],
  ["n1","n5","flo","","",5],
  ["n6","n0","sub","click","",6],
  ["n7","n3","set","","",7],
  ["n0","n8","flo","","",8],
  ["n4","n9","flo","","j <= 3",9],
  ["n7","n9","flo","","",10],
  ["n9","n4","flo","","",11],
  ["n8","n7","flo","","i <= 3",12],
  ["n1","n8","flo","","i <= 3",13],
  ["n8","n2","get","i","",14],
  ["n9","n3","get","j","",15],
  ["n4","n1","flo","","",16]
 ],
 "views":[{"name":"grouped","nodes":{"n9":{"position":{"x":60,"y":330},"width":70},"n8":{"position":{"x":225,"y":170},"width":70},"n7":{"position":{"x":60,"y":255},"width":70},"n6":{"position":{"x":71,"y":37},"width":70},"n3":{"position":{"x":245,"y":255},"width":70},"n0":{"position":{"x":225,"y":95},"width":70},"n1":{"position":{"x":410,"y":170},"width":70},"n2":{"position":{"x":410,"y":95},"width":70},"n4":{"position":{"x":248,"y":330},"width":70},"n5":{"position":{"x":534,"y":222},"width":70}},"edges":{}}]
},
"Double Loop 3.7":
{"graph":{"name":"Double Loop 3.7","template":"<button id='start_button'>Start</button><div>i = <span class='var_i'></span> | max_i:<input id='max_i' type='integer'/></div><div>j = <span class='var_j'></span> | max_j:<input id='max_j' type='integer'/></div>"}, "nodes":[
  {"id":"n13","name":"max_j","node_type":"io","io":{"selector":"#max_j","event":"","valve":2},"data":{"max_j":4}},
  {"id":"n12","name":"max_i","node_type":"io","io":{"selector":"#max_i","event":"","valve":2},"data":{"max_i":4}},
  {"id":"n11","name":"disable","node_type":"process","data":{"disabled":true}},
  {"id":"n10","name":"enable","node_type":"process","data":{"disabled":false}},
  {"id":"n9","name":"inner work","node_type":"process"},
  {"id":"n8","name":"outer work","node_type":"process"},
  {"id":"n7","name":"j","node_type":"data","data":{"j":1}},
  {"id":"n6","name":"Start","node_type":"io","io":{"selector":"#start_button","event":""}},
  {"id":"n3","name":"j","node_type":"io","io":{"selector":".var_j","event":""}},
  {"id":"n0","name":"i","node_type":"data","data":{"i":1}},
  {"id":"n1","name":"","node_type":"process","process":["this.i++;"],"data":{"j":1}},
  {"id":"n2","name":"i","node_type":"io","io":{"selector":".var_i","event":""}},
  {"id":"n4","name":"","node_type":"process","process":["this.j++;"]},
  {"id":"n5","name":"fin","node_type":"process","data":{}}
 ],
 "edges":[
  ["n0","n2","set","","",0],
  ["n1","n2","get","","",1],
  ["n4","n3","get","","",2],
  ["n4","n3","set","","j <= max_j",3],
  ["n1","n2","set","","i <= max_i",4],
  ["n1","n5","flo","","i > max_i",5],
  ["n6","n0","sub","click","",6],
  ["n7","n3","set","","",7],
  ["n0","n8","flo","","",8],
  ["n4","n9","flo","","j <= max_j",9],
  ["n7","n9","flo","","",10],
  ["n9","n4","flo","","",11],
  ["n8","n7","flo","","i <= max_i",12],
  ["n1","n8","flo","","i <= max_i",13],
  ["n8","n2","get","","",14],
  ["n9","n3","get","","",15],
  ["n4","n1","flo","","",16],
  ["n6","n11","sub","click","",17],
  ["n11","n6","set",".attr","",18],
  ["n5","n10","flo","","",19],
  ["n10","n6","set",".attr","",20],
  ["n1","n12","get","","",21],
  ["n8","n12","get","","",22],
  ["n4","n13","get","","",23],
  ["n9","n13","get","","",24]
 ],
 "views":[{"name":"different","nodes":{"n13":{"position":{"x":280,"y":391},"width":70},"n12":{"position":{"x":457,"y":250},"width":70},"n11":{"position":{"x":78,"y":129},"width":70},"n10":{"position":{"x":303,"y":33},"width":70},"n9":{"position":{"x":60,"y":330},"width":70},"n8":{"position":{"x":225,"y":170},"width":70},"n7":{"position":{"x":60,"y":255},"width":70},"n6":{"position":{"x":71,"y":33},"width":70},"n3":{"position":{"x":245,"y":255},"width":70},"n0":{"position":{"x":225,"y":95},"width":70},"n1":{"position":{"x":419,"y":170},"width":70},"n2":{"position":{"x":410,"y":95},"width":70},"n4":{"position":{"x":259,"y":332},"width":70},"n5":{"position":{"x":538,"y":33},"width":70}},"edges":{}}]
},
"Double Loop 4":
{"graph":{"name":"Double Loop 4","template":"<button id='start_button'>Start</button><div>i = <span class='var_i'></span> | max_i:<input id='max_i' type='integer'/></div><div>j = <span class='var_j'></span> | max_j:<input id='max_j' type='integer'/></div>"}, "nodes":[
  {"id":"n5","name":"fin","node_type":"process","data":{}},
  {"id":"n14","name":"outer","node_type":"process"},
  {"id":"n15","name":"inner","node_type":"process"},
  {"id":"n6","name":"Start","node_type":"io","io":{"selector":"#start_button","event":""}},
  {"id":"n10","name":"enable","node_type":"process","data":{"disabled":false}},
  {"id":"n11","name":"disable","node_type":"process","data":{"disabled":true}},
  {"id":"n12","name":"max_i","node_type":"io","io":{"selector":"#max_i","event":"","valve":2},"data":{"max_i":4}},
  {"id":"n13","name":"max_j","node_type":"io","io":{"selector":"#max_j","event":"","valve":2},"data":{"max_j":4}},
  {"id":"n4","parent":"n15","name":"","node_type":"process","process":["this.j++;"]},
  {"id":"n2","parent":"n14","name":"i","node_type":"io","io":{"selector":".var_i","event":""}},
  {"id":"n1","parent":"n14","name":"","node_type":"process","process":["this.i++;"],"data":{"j":1}},
  {"id":"n0","parent":"n14","name":"i","node_type":"data","data":{"i":1}},
  {"id":"n3","parent":"n15","name":"j","node_type":"io","io":{"selector":".var_j","event":""}},
  {"id":"n7","parent":"n15","name":"j","node_type":"data","data":{"j":1}},
  {"id":"n8","parent":"n14","name":"outer work","node_type":"process"},
  {"id":"n9","parent":"n15","name":"inner work","node_type":"process"}
 ],
 "edges":[
  ["n0","n2","set","","",0],
  ["n1","n2","get","","",1],
  ["n4","n3","get","","",2],
  ["n4","n3","set","","j <= max_j",3],
  ["n1","n2","set","","i <= max_i",4],
  ["n1","n5","flo","","",5],
  ["n6","n0","sub","click","",6],
  ["n7","n3","set","","",7],
  ["n0","n8","flo","","",8],
  ["n4","n9","flo","","j <= max_j",9],
  ["n7","n9","flo","","",10],
  ["n9","n4","flo","","",11],
  ["n8","n7","flo","","i <= max_i",12],
  ["n1","n8","flo","","i <= max_i",13],
  ["n8","n2","get","","",14],
  ["n9","n3","get","","",15],
  ["n4","n1","flo","","",16],
  ["n6","n11","sub","click","",17],
  ["n11","n6","set",".attr","",18],
  ["n5","n10","flo","","",19],
  ["n10","n6","set",".attr","",20],
  ["n1","n12","get","","",21],
  ["n8","n12","get","","",22],
  ["n4","n13","get","","",23],
  ["n9","n13","get","","",24]
 ],
 "views":[{"name":"different","nodes":{"n5":{"position":{"x":538,"y":33},"width":70},"n14":{"position":{"x":322,"y":135}},"n15":{"position":{"x":160,"y":293}},"n6":{"position":{"x":71,"y":33},"width":70},"n10":{"position":{"x":303,"y":33},"width":70},"n11":{"position":{"x":78,"y":129},"width":70},"n12":{"position":{"x":501,"y":255},"width":70},"n13":{"position":{"x":365,"y":389},"width":70},"n4":{"position":{"x":259,"y":332},"width":70},"n2":{"position":{"x":410,"y":97},"width":70},"n1":{"position":{"x":419,"y":172},"width":70},"n0":{"position":{"x":225,"y":97},"width":70},"n3":{"position":{"x":246,"y":253},"width":70},"n7":{"position":{"x":60,"y":255},"width":70},"n8":{"position":{"x":225,"y":172},"width":70},"n9":{"position":{"x":60,"y":330},"width":70}},"edges":{}}]
},
"Guessing Game 2":
{"graph":{"name":"Guessing Game 2","template":
"<div id='prompt'>Guess</div><input id='guess'/><button id='enter_button'>Enter</button>"},
"nodes":[
  {"id":"n9","name":"got it","node_type":"data","data":{"prompt":"Wow you guessed it!"}},
  {"id":"n8","name":"guess","node_type":"io","io":{"selector":"#guess"}},
  {"id":"n7","name":"diff","node_type":"process","process":["this.diff = guess - secret;"]},
  {"id":"n6","name":"secret","node_type":"process"},
  {"name":"prompt","id":"n5","node_type":"data","data":{"prompt":"Guess a number (1 - 100)"}},
  {"name":"prompt","node_type":"io","io":{"selector":"#prompt"},"id":"n3"},
  {"name":"think","process":["this.secret = Math.floor(Math.random(1)*100);"],"id":"n1","node_type":"process"},
  {"name":"enter","id":"n0","io":{"selector":"#enter_button"},"node_type":"io"},
  {"id":"n10","name":"graph","node_type":"io"}
 ],
 "edges":[
  ["n1","n5","flo","next","greeting === 'Hello World'",0],
  ["n1","n6","set","","",1],
  ["n5","n3","set","","",2],
  ["n0","n7","sub","click","",3],
  ["n7","n8","get","","",4],
  ["n7","n6","get","","",5],
  ["n7","n9","flo","","diff === 0",6],
  ["n9","n3","set","","",7],
  ["n7","n5","flo","","diff > 0",8],
  ["n10","n1","sub","graph_init","",9]
 ],
 "views":[{"name":"primary","nodes":{"n9":{"position":{"x":296,"y":203}},"n8":{"position":{"x":436,"y":243},"width":60},"n7":{"position":{"x":173,"y":281},"width":80},"n6":{"position":{"x":70,"y":204},"width":60},"n5":{"position":{"x":358,"y":58},"width":60},"n3":{"position":{"x":437,"y":203},"width":60},"n1":{"position":{"x":179,"y":107},"width":60},"n0":{"position":{"x":436,"y":285},"width":60},"n10":{"position":{"x":53,"y":31},"width":60}},"edges":{}}]
}
};
