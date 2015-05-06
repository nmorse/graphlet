var graph_examples = {
"Hello World": {"graph":{"name":"Hello World","template":"<button id='start_button'>Say Hello</button><div class='greeting'></div>"}, "nodes":[
  {"name":"selector","id":"n0","io":{"selector":"#start_button"}},
  {"name":"concat","process":["this.greeting = salutation + ' ' + name;"],"id":"n1"},
  {"name":"","data":{"salutation":"Hello"},"id":"n2"},
  {"name":"end","id":"n5","data":{}},
  {"name":"name","data":{"name":"World"},"id":"n4"},
  {"name":"selector","io":{"selector":".greeting"},"id":"n3"}
 ],
 "edges":[
  ["n0","n1","sub","click","",0],
  ["n1","n2","get","salutation","",1],
  ["n1","n5","flo","next","",2],
  ["n1","n4","get","name","",3],
  ["n1","n3","set","greeting","",4]
 ],
 "views":[{"name":"first","nodes":{"n0":{"position":{"x":124,"y":80},"width":110},"n1":{"position":{"x":124,"y":196},"width":80},"n2":{"position":{"x":316,"y":105},"width":128},"n5":{"position":{"x":124,"y":304},"width":80},"n4":{"position":{"x":423,"y":196},"width":100},"n3":{"position":{"x":362,"y":302},"width":80}},"edges":{}},{"name":"second view","nodes":{"n3":{"position":{"x":456,"y":310},"width":80},"n4":{"position":{"x":415,"y":196},"width":80},"n5":{"position":{"x":153,"y":316},"width":60},"n2":{"position":{"x":326,"y":105},"width":140},"n1":{"position":{"x":134,"y":196},"width":60},"n0":{"position":{"x":114,"y":80},"width":110}},"edges":{}},{"name":"sideways","nodes":{"n0":{"position":{"x":489,"y":308},"width":110},"n1":{"position":{"x":296,"y":254},"width":70},"n2":{"position":{"x":118,"y":207},"width":140},"n5":{"position":{"x":296,"y":329},"width":70},"n4":{"position":{"x":278,"y":92},"width":70},"n3":{"position":{"x":481,"y":151},"width":70}},"edges":{}}]
},
"Hello World version 2": {"graph":{"name":"Hello World version 2","template":"<button id='start_button'>Say Hello</button><div class='greeting'></div>"}, "nodes":[
  {"name":"start","id":"n0","io":{"selector":"#start_button"}},
  {"name":"send","process":["this.greeting = salutation + ' ' + name;"],"id":"n1"},
  {"name":"salutation","data":{"salutation":"Hello"},"id":"n2"},
  {"name":"greeting","io":{"selector":".greeting"},"id":"n3"},
  {"name":"name","data":{"name":"World"},"id":"n4"},
  {"name":"end","id":"n5","data":{"color":"rgb(255, 0, 0)"}}
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
 {"id":"n4","name":"timeout {{timeout}} ms","data":{"timeout":2000}},
 {"id":"n3","name":"effect","data":{"effect":"shake", "distance":5}},
 {"id":"n2","name":"string","data":{"string":"new text"}},
 {"id":"n1","name":"text box","io":{"selector":"#textbox"}},
 {"id":"n0","name":"timer","process":["wait(timeout);"]}
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
  {"id":"n0","name":"timer","process":["wait(timeout);"]},
  {"id":"n1","name":"text box","io":{"selector":"#textbox"}},
  {"id":"n2","name":"new text","data":{"string":""}},
  {"id":"n3","name":"shake","data":{"effect":"shake","distance":5}},
  {"id":"n4","name":"2000 ms","data":{"timeout":2000}}
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
"shake 3":{"graph":{"name":"shake 3","template":"<input type='text' id='textbox' value='' placeholder='type here' />"}, "nodes":[
  {"id":"n0","name":"timer","process":["wait(timeout);"]},
  {"id":"n1","name":"textbox","io":{"selector":"#textbox","valve":3},"data":{"effect_state":"done"}},
  {"id":"n2","name":"new text","data":{"string":""}},
  {"id":"n3","name":"shake","data":{"effect":"shake","distance":5}},
  {"id":"n4","name":"2000 ms","data":{"timeout":2000}},
  {"id":"n5","name":"effect_state","io":{"selector":"#effect_state","valve":3,"as_type":""},"data":{"effect_state":"temp"}}
 ],
 "edges":[
  ["n1","n0","sub","keyup",null,0],
  ["n0","n2","flo","when done",null,1],
  ["n2","n3","flo","next","effect_state === 'done'",2],
  ["n2","n1","set","string",null,3],
  ["n3","n1","pub","effect",null,4],
  ["n0","n4","get","timeout",null,5],
  ["n2","n1","get","effect_state","",6],
  ["n2","n5","set","effect_state","",7]
 ],
 "views":[{"name":"primary","nodes":{"n0":{"position":{"x":146,"y":192},"width":60},"n1":{"position":{"x":322,"y":127},"width":60},"n2":{"position":{"x":245,"y":290},"width":60},"n3":{"position":{"x":450,"y":251},"width":60},"n4":{"position":{"x":90,"y":88},"width":60},"n5":{"position":{"x":425,"y":326},"width":90}},"edges":{}}]
},
"Loop 1": {"graph":{"name":"Loop 1","template":"<button id='start_button'>Start</button><div class='counter'></div>"}, "nodes":[
  {"name":"start","id":"n0","io":{"selector":"#start_button"}},
  {"name":"c+=1","process":["this.c = c + 1;"],"id":"n1"},
  {"name":"fin","id":"n5","data":{"c":0}},
  {"id":"n3","name":"c","io":{"selector":".counter"},"data":{"c":0}},
  {"id":"n4","data":{"c":0},"name":"c"}
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
  {"id":"n6","process":["wait(750);"],"name":"pause"},
  {"name":"start","id":"n0","io":{"selector":"#start_button"}},
  {"name":"c+=1","process":["this.c = c + 1;"],"id":"n1"},
  {"name":"fin","id":"n5","data":{"c":0}},
  {"id":"n3","name":"c","io":{"selector":".counter"},"data":{"c":0}},
  {"id":"n4","data":{"c":0},"name":"c"}
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
  {"name":"start","id":"n0","io":{"selector":"#start_button"}},
  {"name":"+1","process":["this.c = c + 1;"],"id":"n1"},
  {"name":"","id":"n5","data":{"c":0}},
  {"id":"n3","name":"c","io":{"selector":".counter"},"data":{"c":0}}
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
  {"id":"n2","name":"limit","data":{"limit":3},"io":{"selector":"#limit_input"}},
  {"id":"n3","name":"c","io":{"selector":".counter"},"data":{"c":0}},
  {"name":"c","id":"n5","data":{"c":0}},
  {"name":"","process":["this.c = c + 1;"],"id":"n1"},
  {"name":"start","id":"n0","io":{"selector":"#start_button"}}
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
  {"id":"n4","name":"init"},
  {"name":"start","id":"n0","io":{"selector":"#start_button"}},
  {"name":"","process":["this.c = c + 1;"],"id":"n1"},
  {"name":"c","id":"n5","data":{"c":1}},
  {"id":"n3","name":"c","io":{"selector":".counter"},"data":{"c":1}},
  {"id":"n2","name":"limit","data":{"limit":3},"io":{"selector":"#limit_input","valve":3}},
  {"id":"n6","name":"Graph"}
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
  {"id":"n7","name":"j","data":{"j":0}},
  {"id":"n6","name":"Start","io":{"selector":"#start_button","event":""}},
  {"id":"n3","name":"j","io":{"selector":".var_j","event":""}},
  {"id":"n0","name":"i","data":{"i":0}},
  {"id":"n1","name":"outer loop","process":["this.i = i + 1;"]},
  {"id":"n2","name":"i","io":{"selector":".var_i","event":""}},
  {"id":"n4","name":"inner loop","process":["this.j = j + 1;"]},
  {"id":"n5","name":"fin"}
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
  {"id":"n7","name":"j","data":{"j":0}},
  {"id":"n6","name":"Start","io":{"selector":"#start_button","event":""}},
  {"id":"n3","name":"j","io":{"selector":".var_j","event":""},"inspect":true},
  {"id":"n0","name":"i","data":{"i":0}},
  {"id":"n1","name":"outer loop","process":["this.i = i + 1;"]},
  {"id":"n2","name":"i","io":{"selector":".var_i","event":""}},
  {"id":"n4","name":"inner loop","process":["this.j = j + 1;"]},
  {"id":"n5","name":"fin"},
  {"id":"n8","name":"","data":{"i":0,"j":"0"}},
  {"id":"n9","name":"table","process":[],"io":{"selector":".table"}}
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
  {"id":"n9","name":"inner work"},
  {"id":"n8","name":"outer work"},
  {"id":"n7","name":"j","data":{"j":1}},
  {"id":"n6","name":"Start","io":{"selector":"#start_button","event":""}},
  {"id":"n3","name":"j","io":{"selector":".var_j","event":""}},
  {"id":"n0","name":"i","data":{"i":1}},
  {"id":"n1","name":"","process":["this.i++;"],"data":{"j":1}},
  {"id":"n2","name":"i","io":{"selector":".var_i","event":""}},
  {"id":"n4","name":"","process":["this.j++;"]},
  {"id":"n5","name":"fin"}
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
  {"id":"n13","name":"max_j","io":{"selector":"#max_j","event":"","valve":2},"data":{"max_j":4}},
  {"id":"n12","name":"max_i","io":{"selector":"#max_i","event":"","valve":2},"data":{"max_i":4}},
  {"id":"n11","name":"disable","data":{"disabled":true}},
  {"id":"n10","name":"enable","data":{"disabled":false}},
  {"id":"n9","name":"inner work"},
  {"id":"n8","name":"outer work"},
  {"id":"n7","name":"j","data":{"j":1}},
  {"id":"n6","name":"Start","io":{"selector":"#start_button","event":""}},
  {"id":"n3","name":"j","io":{"selector":".var_j","event":""}},
  {"id":"n0","name":"i","data":{"i":1}},
  {"id":"n1","name":"","process":["this.i++;"],"data":{"j":1}},
  {"id":"n2","name":"i","io":{"selector":".var_i","event":""}},
  {"id":"n4","name":"","process":["this.j++;"]},
  {"id":"n5","name":"fin","data":{}}
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
  {"id":"n5","name":"fin","data":{}},
  {"id":"n14","name":"outer"},
  {"id":"n15","name":"inner"},
  {"id":"n6","name":"Start","io":{"selector":"#start_button","event":""}},
  {"id":"n10","name":"enable","data":{"disabled":false}},
  {"id":"n11","name":"disable","data":{"disabled":true}},
  {"id":"n12","name":"max_i","io":{"selector":"#max_i","event":"","valve":2},"data":{"max_i":4}},
  {"id":"n13","name":"max_j","io":{"selector":"#max_j","event":"","valve":2},"data":{"max_j":4}},
  {"id":"n4","parent":"n15","name":"","process":["this.j++;"]},
  {"id":"n2","parent":"n14","name":"i","io":{"selector":".var_i","event":""}},
  {"id":"n1","parent":"n14","name":"","process":["this.i++;"],"data":{"j":1}},
  {"id":"n0","parent":"n14","name":"i","data":{"i":1}},
  {"id":"n3","parent":"n15","name":"j","io":{"selector":".var_j","event":""}},
  {"id":"n7","parent":"n15","name":"j","data":{"j":1}},
  {"id":"n8","parent":"n14","name":"outer work"},
  {"id":"n9","parent":"n15","name":"inner work"}
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
"Guessing Game":
{"graph":{"name":"Guessing Game","template":"<div id='prompt'></div><input id='guess'/><button id='enter_button'>Enter</button>"}, "nodes":[
  {"id":"n16","name":"end","process":["this.prompt =  prompt + \", no more guesses left. The secret number of \" + secret;"]},
  {"id":"n15","name":"guess again","process":["this.prompt =  prompt + \", guess again\";"]},
  {"id":"n14","name":"game over?","process":["this.game_over =  (count>=7);"]},
  {"id":"n13","name":"prompt","data":{"prompt":"Sorry, all guesses are used up, the number was "},"process":["this.prompt = prompt + secret"]},
  {"id":"n12","name":"count","io":{"selector":"#count","valve":3},"data":{"count":0}},
  {"id":"n11","name":"","process":["this.count = +count + 1;"]},
  {"id":"n4","name":"prompt","data":{"prompt":"Too High"}},
  {"id":"n2","name":"prompt","data":{"prompt":"Too Low"}},
  {"id":"n10","name":"env","io":{"selector":"","valve":0,"as_type":""}},
  {"name":"enter","id":"n0","io":{"selector":"#enter_button"}},
  {"name":"think","process":["this.secret = Math.floor(Math.random(1)*100) + 1;"],"id":"n1"},
  {"name":"prompt","io":{"selector":"#prompt"},"id":"n3"},
  {"name":"prompt","id":"n5","data":{"prompt":"Guess a number (1 - 100)"}},
  {"id":"n6","name":"secret"},
  {"id":"n7","name":"diff","process":["this.diff = guess - secret;"]},
  {"id":"n8","name":"guess","io":{"selector":"#guess","valve":3}},
  {"id":"n9","name":"prompt","data":{"prompt":"Great! You guessed it, in {{count}} guess(es) "},"process":["this.prompt = prompt.replace(\"{{count}}\", count);"]}
 ],
 "edges":[
  ["n1","n5","flo","next","",0],
  ["n1","n6","set","","",1],
  ["n5","n3","set","","",2],
  ["n7","n8","get","","",3],
  ["n7","n6","get","","",4],
  ["n7","n9","flo","","",5],
  ["n9","n3","set","","",6],
  ["n10","n1","sub","graph_init","",7],
  ["n2","n3","set","","",8],
  ["n7","n2","flo","","diff < 0",9],
  ["n4","n3","set","","",10],
  ["n7","n4","flo","","diff > 0",11],
  ["n0","n11","sub","click","",12],
  ["n11","n12","get","","",13],
  ["n11","n12","set","","",14],
  ["n11","n7","flo","","count < 8",15],
  ["n11","n13","flo","","",16],
  ["n13","n3","set","","",17],
  ["n13","n6","get","","",18],
  ["n9","n12","get","","",19],
  ["n4","n14","flo","","",20],
  ["n2","n14","flo","","",21],
  ["n14","n12","get","","",22],
  ["n14","n15","flo","","!game_over",23],
  ["n14","n16","flo","","game_over",24],
  ["n16","n3","set","","",25],
  ["n15","n3","set","","",26],
  ["n15","n3","get","","",27],
  ["n16","n3","get","","",28],
  ["n16","n6","get","","",29]
 ],
 "views":[{"name":"primary","nodes":{"n16":{"position":{"x":716,"y":264}},"n15":{"position":{"x":642,"y":28}},"n14":{"position":{"x":715,"y":161}},"n13":{"position":{"x":362,"y":303},"width":60},"n12":{"position":{"x":533,"y":440},"width":60},"n11":{"position":{"x":343,"y":431},"width":60},"n4":{"position":{"x":170,"y":136},"width":100},"n2":{"position":{"x":249,"y":184},"width":100},"n10":{"position":{"x":5,"y":19},"width":60},"n0":{"position":{"x":530,"y":378},"width":60},"n1":{"position":{"x":69,"y":96},"width":60},"n3":{"position":{"x":533,"y":208},"width":60},"n5":{"position":{"x":428,"y":96},"width":200},"n6":{"position":{"x":69,"y":286},"width":60},"n7":{"position":{"x":198,"y":363},"width":80},"n8":{"position":{"x":533,"y":323},"width":60},"n9":{"position":{"x":326,"y":241},"width":180}},"edges":{}}]
},
"calc 1":
{"graph":{"name":"calc 1","template":"<div class='row'>  <div class='col-sm-3'><button id='num_7'>7</button></div>  <div class='col-sm-3'><button id='num_8'>8</button></div>  <div class='col-sm-3'><button id='num_9'>9</button></div>  <div class='col-sm-3'><button id='divide'>/</button></div></div><div class='row'>  <div class='col-sm-3'><button id='num_4'>4</button></div>  <div class='col-sm-3'><button id='num_5'>5</button></div>  <div class='col-sm-3'><button id='num_6'>6</button></div>  <div class='col-sm-3'><button id='mult'>*</button></div></div><div class='row'>  <div class='col-sm-3'><button id='num_1'>1</button></div>  <div class='col-sm-3'><button id='num_2'>2</button></div>  <div class='col-sm-3'><button id='num_3'>3</button></div>  <div class='col-sm-3'><button id='subtract'>-</button></div></div><div class='row'>  <div class='col-sm-3'><button id='ce'>CE</button></div>  <div class='col-sm-3'><button id='num_0'>0</button></div>  <div class='col-sm-3'><button id='equals'>=</button></div>  <div class='col-sm-3'><button id='add'>+</button></div></div><div class='row'><div class='col-sm-12'><span class='readout'></span></div></div>"}, "nodes":[
  {"id":"n16","name":"number"},
  {"id":"n0","name":"0","data":{"digit":0},"io":{"selector":"#num_0"}},
  {"id":"n1","name":"1","data":{"digit":1},"io":{"selector":"#num_1"}},
  {"id":"n2","name":"2","data":{"digit":2},"io":{"selector":"#num_2"}},
  {"id":"n3","name":"3","data":{"digit":3},"io":{"selector":"#num_3"}},
  {"id":"n4","name":"4","data":{"digit":4},"io":{"selector":"#num_4"}},
  {"id":"n5","name":"5","data":{"digit":5},"io":{"selector":"#num_5"}},
  {"id":"n6","name":"6","data":{"digit":6},"io":{"selector":"#num_6"}},
  {"id":"n7","name":"7","data":{"digit":7},"io":{"selector":"#num_7"}},
  {"id":"n8","name":"8","data":{"digit":8},"io":{"selector":"#num_8"}},
  {"id":"n9","name":"9","data":{"digit":9},"io":{"selector":"#num_9"}},
  {"id":"n10","name":"/","io":{"selector":"#divide"}},
  {"id":"n11","name":".","io":{"selector":"#mult"}},
  {"id":"n12","name":"-","io":{"selector":"#subtract"}},
  {"id":"n13","name":"+","io":{"selector":"#add"}},
  {"id":"n14","name":"CE","io":{"selector":"#ce"}},
  {"id":"n15","name":"=","io":{"selector":"#equals"}},
  {"id":"n17","name":"readout","io":{"selector":".readout"}},
  {"name":"str","id":"n18","data":{"str":""}}
 ],
 "edges":[
  ["n7","n7","sub","click","",3],
  ["n7","n16","set","","",4],
  ["n7","n16","flo","","",5],
  ["n16","n17","flo","","",7],
  ["n16","n18","set","str","digit",10]
 ],
 "views":[{"name":"primary","nodes":{"n16":{"position":{"x":86,"y":179},"width":60},"n0":{"position":{"x":251,"y":251},"width":60},"n1":{"position":{"x":250,"y":206},"width":60},"n2":{"position":{"x":319,"y":206},"width":60},"n3":{"position":{"x":393,"y":207},"width":60},"n4":{"position":{"x":251,"y":163},"width":60},"n5":{"position":{"x":322,"y":165},"width":60},"n6":{"position":{"x":393,"y":167},"width":60},"n7":{"position":{"x":252,"y":125},"width":60},"n8":{"position":{"x":321,"y":128},"width":60},"n9":{"position":{"x":398,"y":127},"width":60},"n10":{"position":{"x":477,"y":127}},"n11":{"position":{"x":475,"y":166}},"n12":{"position":{"x":474,"y":207}},"n13":{"position":{"x":473,"y":256}},"n14":{"position":{"x":321,"y":250}},"n15":{"position":{"x":406,"y":255}},"n17":{"position":{"x":362,"y":299},"width":260},"n18":{"position":{"x":81,"y":262}}},"edges":{}}]
},
"calc 2":{"graph":{"name":"calc 2","template":"<div class='row'>  <div class='col-sm-3'><button id='num_7'>7</button></div>  <div class='col-sm-3'><button id='num_8'>8</button></div>  <div class='col-sm-3'><button id='num_9'>9</button></div>  <div class='col-sm-3'><button id='divide'>/</button></div></div><div class='row'>  <div class='col-sm-3'><button id='num_4'>4</button></div>  <div class='col-sm-3'><button id='num_5'>5</button></div>  <div class='col-sm-3'><button id='num_6'>6</button></div>  <div class='col-sm-3'><button id='mult'>*</button></div></div><div class='row'>  <div class='col-sm-3'><button id='num_1'>1</button></div>  <div class='col-sm-3'><button id='num_2'>2</button></div>  <div class='col-sm-3'><button id='num_3'>3</button></div>  <div class='col-sm-3'><button id='subtract'>-</button></div></div><div class='row'>  <div class='col-sm-3'><button id='ce'>CE</button></div>  <div class='col-sm-3'><button id='num_0'>0</button></div>  <div class='col-sm-3'><button id='equals'>=</button></div>  <div class='col-sm-3'><button id='add'>+</button></div></div><div class='row'><div class='col-sm-12'><span class='readout'></span></div></div>"}, "nodes":[
  {"name":"str","id":"n18","data":{"str":""}},
  {"id":"n17","name":"readout","io":{"selector":".readout"},"data":{}},
  {"id":"n15","name":"=","io":{"selector":"#equals"}},
  {"id":"n14","name":"CE","io":{"selector":"#ce"}},
  {"id":"n13","name":"+","io":{"selector":"#add"}},
  {"id":"n12","name":"-","io":{"selector":"#subtract"}},
  {"id":"n11","name":".","io":{"selector":"#mult"}},
  {"id":"n10","name":"/","io":{"selector":"#divide"}},
  {"id":"n9","name":"9","data":{"digit":9},"io":{"selector":"#num_9"}},
  {"id":"n8","name":"8","data":{"digit":8},"io":{"selector":"#num_8"}},
  {"id":"n7","name":"digit","data":{"digit":7},"io":{"selector":"#num_7"}},
  {"id":"n6","name":"6","data":{"digit":6},"io":{"selector":"#num_6"}},
  {"id":"n5","name":"5","data":{"digit":5},"io":{"selector":"#num_5"}},
  {"id":"n4","name":"4","data":{"digit":4},"io":{"selector":"#num_4"}},
  {"id":"n3","name":"3","data":{"digit":3},"io":{"selector":"#num_3"}},
  {"id":"n2","name":"2","data":{"digit":2},"io":{"selector":"#num_2"}},
  {"id":"n1","name":"1","data":{"digit":1},"io":{"selector":"#num_1"}},
  {"id":"n0","name":"0","data":{"digit":0},"io":{"selector":"#num_0"}},
  {"id":"n16","name":"number","process":["this.readout = digit; "]}
 ],
 "edges":[
  ["n16","n18","set","str","digit",0],
  ["n16","n17","set","","",1],
  ["n7","n16","sub","click","",2],
  ["n16","n7","get","","",3]
 ],
 "views":[{"name":"primary","nodes":{"n16":{"position":{"x":86,"y":179},"width":60},"n0":{"position":{"x":251,"y":251},"width":60},"n1":{"position":{"x":250,"y":206},"width":60},"n2":{"position":{"x":319,"y":206},"width":60},"n3":{"position":{"x":393,"y":207},"width":60},"n4":{"position":{"x":251,"y":163},"width":60},"n5":{"position":{"x":322,"y":165},"width":60},"n6":{"position":{"x":393,"y":167},"width":60},"n7":{"position":{"x":252,"y":125},"width":60},"n8":{"position":{"x":321,"y":128},"width":60},"n9":{"position":{"x":398,"y":127},"width":60},"n10":{"position":{"x":477,"y":127}},"n11":{"position":{"x":475,"y":166}},"n12":{"position":{"x":474,"y":207}},"n13":{"position":{"x":473,"y":256}},"n14":{"position":{"x":321,"y":250}},"n15":{"position":{"x":406,"y":255}},"n17":{"position":{"x":362,"y":299},"width":260},"n18":{"position":{"x":81,"y":262}}},"edges":{}},{"name":"process view","nodes":{"n18":{"position":{"x":65,"y":67}},"n17":{"position":{"x":170,"y":316},"width":260},"n15":{"position":{"x":406,"y":255}},"n14":{"position":{"x":321,"y":250}},"n13":{"position":{"x":475,"y":252}},"n12":{"position":{"x":475,"y":207}},"n11":{"position":{"x":475,"y":165}},"n10":{"position":{"x":475,"y":125}},"n9":{"position":{"x":392,"y":125},"width":60},"n8":{"position":{"x":322,"y":125},"width":60},"n7":{"position":{"x":252,"y":125},"width":60},"n6":{"position":{"x":393,"y":165},"width":60},"n5":{"position":{"x":322,"y":165},"width":60},"n4":{"position":{"x":251,"y":165},"width":60},"n3":{"position":{"x":393,"y":207},"width":60},"n2":{"position":{"x":322,"y":206},"width":60},"n1":{"position":{"x":250,"y":206},"width":60},"n0":{"position":{"x":251,"y":251},"width":60},"n16":{"position":{"x":102,"y":146},"width":60}},"edges":{}}]
},
"calc 3":{"graph":{"name":"calc 3","template":"<div class='row'>  <div class='col-sm-3'><button id='num_7'>7</button></div>  <div class='col-sm-3'><button id='num_8'>8</button></div>  <div class='col-sm-3'><button id='num_9'>9</button></div>  <div class='col-sm-3'><button id='divide'>/</button></div></div><div class='row'>  <div class='col-sm-3'><button id='num_4'>4</button></div>  <div class='col-sm-3'><button id='num_5'>5</button></div>  <div class='col-sm-3'><button id='num_6'>6</button></div>  <div class='col-sm-3'><button id='mult'>*</button></div></div><div class='row'>  <div class='col-sm-3'><button id='num_1'>1</button></div>  <div class='col-sm-3'><button id='num_2'>2</button></div>  <div class='col-sm-3'><button id='num_3'>3</button></div>  <div class='col-sm-3'><button id='subtract'>-</button></div></div><div class='row'>  <div class='col-sm-3'><button id='ce'>CE</button></div>  <div class='col-sm-3'><button id='num_0'>0</button></div>  <div class='col-sm-3'><button id='equals'>=</button></div>  <div class='col-sm-3'><button id='add'>+</button></div></div><div class='row'><div class='col-sm-12'><span class='readout'></span></div></div>"}, "nodes":[
  {"id":"n24","name":"minus","process":["this.digit = op;"]},
  {"id":"n21","name":"zero","process":["this.readout += digit; "],"data":{"digit":0}},
  {"id":"n20","name":"back","process":["this.readout = readout.slice(0, -1);"]},
  {"name":"mode","id":"n18","data":{"mode":"new number"},"io":{"selector":"#mode","valve":3}},
  {"id":"n17","name":"readout","io":{"selector":".readout","valve":3},"data":{"readout":""}},
  {"id":"n15","name":"=","io":{"selector":"#equals"},"process":["this.readout = eval(readout);"]},
  {"id":"n14","name":"CE","io":{"selector":"#ce"}},
  {"id":"n16","name":"number","process":["this.readout += digit; "],"data":{"mode":"number","digit":""}},
  {"id":"n19","name":""},
  {"id":"n0","name":"0","data":{"digit":0},"io":{"selector":"#num_0"}},
  {"id":"n22","name":""},
  {"id":"n23","name":"op","data":{"op":"","mode":"new number"},"process":["this.readout += op; "]},
  {"id":"n12","name":"-","io":{"selector":"#subtract"},"data":{"op":"-"}},
  {"id":"n25","name":"op?","data":{"op":""}},
  {"id":"n7","name":"7","data":{"digit":7},"io":{"selector":"#num_7"},"parent":"n19"},
  {"id":"n4","name":"4","data":{"digit":"4"},"io":{"selector":"#num_4"},"parent":"n19"},
  {"id":"n1","name":"1","data":{"digit":1},"io":{"selector":"#num_1"},"parent":"n19"},
  {"id":"n8","name":"8","data":{"digit":8},"io":{"selector":"#num_8"},"parent":"n19"},
  {"id":"n5","name":"5","data":{"digit":5},"io":{"selector":"#num_5"},"parent":"n19"},
  {"id":"n2","name":"2","data":{"digit":2},"io":{"selector":"#num_2"},"parent":"n19"},
  {"id":"n9","name":"9","data":{"digit":9},"io":{"selector":"#num_9"},"parent":"n19"},
  {"id":"n6","name":"6","data":{"digit":6},"io":{"selector":"#num_6"},"parent":"n19"},
  {"id":"n3","name":"3","data":{"digit":3},"io":{"selector":"#num_3"},"parent":"n19"},
  {"id":"n10","name":"/","io":{"selector":"#divide"},"parent":"n22","data":{"op":"/"}},
  {"id":"n11","name":"*","io":{"selector":"#mult"},"parent":"n22","data":{"op":"*"}},
  {"id":"n13","name":"+","io":{"selector":"#add"},"parent":"n22","data":{"op":"+"}}
 ],
 "edges":[
  ["n16","n18","set","","",0],
  ["n16","n17","set","","",1],
  ["n16","n17","get","","",2],
  ["n19","n16","sub","click","",3],
  ["n14","n20","sub","click","",4],
  ["n20","n17","get","","",5],
  ["n20","n17","set","","",6],
  ["n0","n0","sub","click","",7],
  ["n0","n18","get","","",8],
  ["n0","n21","flo","","mode == \"number\"",9],
  ["n21","n17","set","","",10],
  ["n21","n17","get","","",11],
  ["n23","n18","set","","",12],
  ["n23","n17","get","","",13],
  ["n23","n17","set","","",14],
  ["n12","n24","sub","click","",15],
  ["n24","n18","get","","",16],
  ["n24","n23","set","op","mode == \"number\"",17],
  ["n24","n16","set","digit","mode == \"new number\"",18],
  ["n24","n23","flo","op","mode == \"number\"",19],
  ["n24","n16","flo","digit","mode == \"new number\"",20],
  ["n15","n15","sub","click","",21],
  ["n15","n17","get","","",22],
  ["n15","n17","set","","",23],
  ["n22","n25","sub","click","",24],
  ["n25","n18","get","","",25],
  ["n25","n23","flo","","mode == \"number\"",26],
  ["n25","n23","set","op","",27]
 ],
 "views":[{"name":"primary","nodes":{"n24":{"position":{"x":440,"y":-34},"width":60},"n21":{"position":{"x":91,"y":316},"width":50},"n20":{"position":{"x":527,"y":319},"width":60},"n18":{"position":{"x":105,"y":45},"width":100},"n17":{"position":{"x":326,"y":318},"width":260},"n15":{"position":{"x":521,"y":392}},"n14":{"position":{"x":526,"y":230}},"n16":{"position":{"x":101,"y":158},"width":70},"n19":{"position":{"x":326,"y":158}},"n0":{"position":{"x":325,"y":271},"width":60},"n22":{"position":{"x":474,"y":180}},"n23":{"position":{"x":644,"y":100}},"n12":{"position":{"x":474,"y":199}},"n25":{"position":{"x":614,"y":-19}},"n7":{"position":{"x":254,"y":118},"width":60},"n4":{"position":{"x":255,"y":157},"width":60},"n1":{"position":{"x":254,"y":198},"width":60},"n8":{"position":{"x":325,"y":117},"width":60},"n5":{"position":{"x":325,"y":158},"width":60},"n2":{"position":{"x":327,"y":197},"width":60},"n9":{"position":{"x":398,"y":120},"width":60},"n6":{"position":{"x":398,"y":161},"width":60},"n3":{"position":{"x":398,"y":198},"width":60},"n10":{"position":{"x":475,"y":119}},"n11":{"position":{"x":474,"y":157}},"n13":{"position":{"x":473,"y":240}}},"edges":{}},{"name":"process view","nodes":{"n21":{"position":{"x":64,"y":259}},"n20":{"position":{"x":360,"y":318}},"n18":{"position":{"x":101,"y":67}},"n17":{"position":{"x":170,"y":316},"width":260},"n15":{"position":{"x":406,"y":255}},"n14":{"position":{"x":333,"y":253}},"n13":{"position":{"x":475,"y":252}},"n12":{"position":{"x":475,"y":207}},"n11":{"position":{"x":475,"y":165}},"n10":{"position":{"x":475,"y":125}},"n16":{"position":{"x":102,"y":154},"width":60},"n19":{"position":{"x":323,"y":152}},"n0":{"position":{"x":232,"y":263},"width":60},"n7":{"position":{"x":253,"y":111},"width":60},"n4":{"position":{"x":252,"y":151},"width":60},"n1":{"position":{"x":251,"y":192},"width":60},"n8":{"position":{"x":323,"y":111},"width":60},"n5":{"position":{"x":323,"y":151},"width":60},"n2":{"position":{"x":323,"y":192},"width":60},"n9":{"position":{"x":393,"y":111},"width":60},"n6":{"position":{"x":394,"y":151},"width":60},"n3":{"position":{"x":394,"y":193},"width":60}},"edges":{}}]
},
"number FSA":{"graph":{"name":"number FSA"}, "nodes":[
  {"id":"n7","name":"0-9"},
  {"id":"n6","name":"0-9"},
  {"id":"n5","name":"1-9"},
  {"id":"n4","name":"End"},
  {"id":"n3","name":"Start"},
  {"id":"n2","name":"."},
  {"id":"n1","name":"0"},
  {"id":"n0","name":"-"}
 ],
 "edges":[
  ["n3","n0","flo","","",0],
  ["n3","n5","flo","","",1],
  ["n3","n1","flo","","",2],
  ["n0","n1","flo","","",3],
  ["n0","n5","flo","","",4],
  ["n1","n4","flo","","",5],
  ["n1","n2","flo","","",6],
  ["n5","n7","flo","","",7],
  ["n5","n2","flo","","",8],
  ["n5","n4","flo","","",9],
  ["n7","n7","flo","","",10],
  ["n7","n4","flo","","",11],
  ["n7","n2","flo","","",12],
  ["n2","n6","flo","","",13],
  ["n6","n6","flo","","",14],
  ["n6","n4","flo","","",15]
 ],
 "views":[{"name":"primary","nodes":{"n7":{"position":{"x":410,"y":-87}},"n6":{"position":{"x":493,"y":20}},"n5":{"position":{"x":303,"y":-35}},"n4":{"position":{"x":555,"y":-66}},"n3":{"position":{"x":101,"y":16}},"n2":{"position":{"x":388,"y":39}},"n1":{"position":{"x":268,"y":27}},"n0":{"position":{"x":169,"y":85}}},"edges":{}}]
},
"number FSA 2":
{"graph":{"name":"number FSA 2","template":"<div id='state'></div><input id='inputbox'/><button id='enter_button'>Enter</button>"}, "nodes":[
  {"id":"n12","name":"Graph"},
  {"id":"n11","name":"state","io":{"selector":"#state"}},
  {"id":"n10","name":"io","io":{"selector":"#inputbox","valve":2}},
  {"id":"n8","name":"number FSA","fsa":{"states":[],"description":"accepts a string that represents a number"}},
  {"id":"n9","name":"Start"},
  {"id":"n3","name":"Start","parent":"n8","fsa_state":{"start":true}},
  {"id":"n0","name":"-","parent":"n8"},
  {"id":"n5","name":"1-9","parent":"n8","fsa_state":{"accepting":true}},
  {"id":"n4","name":"0","fsa_state":{"accepting":true},"parent":"n8"},
  {"id":"n1","name":"-0","parent":"n8"},
  {"id":"n7","name":"0-9","fsa_state":{"accepting":true},"parent":"n8"},
  {"id":"n2","name":".","parent":"n8"},
  {"id":"n6","name":"0-9","parent":"n8","fsa_state":{"accepting":true}}
 ],
 "edges":[
  ["n3","n0","flo","","/-/",0],
  ["n3","n5","flo","","/[1-9]/",1],
  ["n0","n5","flo","","/[1-9]/",2],
  ["n3","n4","flo","","/0/",3],
  ["n0","n1","flo","","/0/",4],
  ["n7","n7","flo","","/[0-9]/",5],
  ["n5","n7","flo","","/[0-9]/",6],
  ["n5","n2","flo","","/\\./",7],
  ["n4","n2","flo","","/\\./",8],
  ["n1","n2","flo","","/\\./",9],
  ["n7","n2","flo","","/\\./",10],
  ["n6","n6","flo","","/[0-9]/",11],
  ["n2","n6","flo","","/[0-9]/",12],
  ["n9","n8","set","init","",13],
  ["n10","n8","set","char","",14],
  ["n10","n10","sub","change","",15],
  ["n10","n11","flo","","",16],
  ["n11","n8","get","state","",17],
  ["n12","n9","sub","graph_init","",18]
 ],
 "views":[{"name":"primary","nodes":{"n12":{"position":{"x":51,"y":294}},"n11":{"position":{"x":399,"y":324}},"n10":{"position":{"x":245,"y":327}},"n8":{"position":{"x":290,"y":139}},"n9":{"position":{"x":121,"y":316}},"n3":{"position":{"x":106,"y":125}},"n0":{"position":{"x":173,"y":176}},"n5":{"position":{"x":227,"y":60}},"n4":{"position":{"x":120,"y":218}},"n1":{"position":{"x":252,"y":176}},"n7":{"position":{"x":396,"y":90}},"n2":{"position":{"x":364,"y":200}},"n6":{"position":{"x":474,"y":148}}},"edges":{}}]
},
"two state machines":{"graph":{"name":"two state machines","template":"<div id='state'></div><select id='event_launcher'><option>edit</option><option>restore</option> </select>"}, "nodes":[
  {"id":"n8","name":"existing course","fsa":{"states":[],"description":"provides track changes UI interaction for a course table entry "}},
  {"id":"n2","name":"new_course"},
  {"id":"n3","name":"unchanged","parent":"n8","fsa_state":{"start":true}},
  {"id":"n0","name":"editing","parent":"n8"},
  {"id":"n5","name":"changed","parent":"n8","fsa_state":{"accepting":true}},
  {"id":"n4","name":"crossout","fsa_state":{"accepting":true},"parent":"n8"},
  {"id":"n1","name":"accept","parent":"n8"},
  {"id":"n6","name":"editing","parent":"n2","fsa_state":{"start":true}},
  {"id":"n7","name":"added_new","parent":"n2","fsa_state":{"accepting":true}},
  {"id":"n9","name":"delete","parent":"n2","fsa_state":{"accepting":true}}
 ],
 "edges":[
  ["n3","n0","flo","edit","",0],
  ["n3","n4","flo","mark_for_removal","",1],
  ["n4","n3","flo","restore_original","",2],
  ["n0","n3","flo","revert","",3],
  ["n0","n1","flo","accept","",4],
  ["n1","n5","flo","","changed",5],
  ["n1","n3","flo","","original",6],
  ["n5","n3","flo","restore_original","",7],
  ["n5","n0","flo","edit","",8],
  ["n6","n7","flo","accept","",9],
  ["n7","n6","flo","edit","",10],
  ["n7","n9","flo","remove","",11],
  ["n6","n9","flo","remove","",12]
 ],
 "views":[{"name":"primary","nodes":{"n2":{"position":{"x":281,"y":344}},"n8":{"position":{"x":330,"y":140}},"n9":{"position":{"x":246,"y":401},"width":90},"n7":{"position":{"x":452,"y":318},"width":90},"n6":{"position":{"x":110,"y":287},"width":90},"n1":{"position":{"x":109,"y":55},"width":60},"n4":{"position":{"x":549,"y":223},"width":90},"n5":{"position":{"x":515,"y":109},"width":90},"n0":{"position":{"x":210,"y":138},"width":90},"n3":{"position":{"x":110,"y":222},"width":90}},"edges":{}},{"name":"secondo","nodes":{"n8":{"position":{"x":314,"y":140}},"n2":{"position":{"x":314,"y":363}},"n3":{"position":{"x":110,"y":222},"width":90},"n0":{"position":{"x":210,"y":138},"width":90},"n5":{"position":{"x":515,"y":109},"width":90},"n4":{"position":{"x":518,"y":223},"width":90},"n1":{"position":{"x":109,"y":55},"width":60},"n6":{"position":{"x":110,"y":308},"width":90},"n7":{"position":{"x":517,"y":304},"width":90},"n9":{"position":{"x":246,"y":422},"width":90}},"edges":{}}]
},
"a three state statemachine":{"graph":{"name":"a three state statemachine"}, "nodes":[
  {"id":"n2","name":"c"},
  {"name":"a","id":"n0"},
  {"name":"b","id":"n1"}
 ],
 "edges":[
  ["n0","n1","flo","goto_b","function ($scope) {return \"b\";}",0],
  ["n1","n0","flo","goto_a","",1],
  ["n0","n2","flo","back","",2],
  ["n2","n1","flo","again","",3]
 ],
 "views":[{"name":"primary","nodes":{"n2":{"position":{"x":312,"y":273}},"n0":{"position":{"x":387,"y":204}},"n1":{"position":{"x":249,"y":191}}},"edges":{}}]
},
"three states with a choice":{"graph":{"name":"three states with a choice"}, "nodes":[
  {"id":"n2","name":"at friends house","fsa_state":{"accepting":false}},
  {"name":"at work","id":"n0","fsa_state":{"accepting":true}},
  {"name":"at home","id":"n1","fsa_state":{"accepting":true}},
  {"name":"make a choice","id":"n3","fsa_state":{"accepting":false},"process":["this.choice = (food_in_fridge || !has_a_friend)? \"go home\", \"visit friend\";"]}
 ],
 "edges":[
  ["n1","n0","flo","go to work","",1],
  ["n2","n1","flo","go home","",3],
  ["n3","n2","flo","visit friend","",4],
  ["n3","n1","flo","go home","",5],
  ["n0","n3","flo","leave work","",6]
 ],
 "views":[{"name":"primary","nodes":{"n2":{"position":{"x":196,"y":284},"width":140},"n0":{"position":{"x":476,"y":140},"width":80},"n1":{"position":{"x":193,"y":138},"width":90},"n3":{"position":{"x":479,"y":280},"width":140}},"edges":{}}]
}
};
