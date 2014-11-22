var graph_examples = {
"Hello World": {"graph":{"name":"Hello World x","template":"<button id='start_button'>Say Hello</button><div class='greeting'></div>"}, "nodes":[
  {"name":"end","id":"n5","node_type":"data","data":{"color":"rgb(255, 0, 0)"}},
  {"name":"name","data":{"name":"World"},"node_type":"data","id":"n4"},
  {"name":"selector","node_type":"io","io":{"selector":".greeting"},"id":"n3"},
  {"name":"","data":{"salutation":"Hello"},"id":"n2","node_type":"data"},
  {"name":"concat","process":["this.greeting = salutation + ' ' + name;"],"id":"n1","node_type":"process"},
  {"name":"selector","id":"n0","io":{"selector":"#start_button"},"node_type":"io"}
 ],
 "edges":[
  ["n0","n1","sub","click","",0],
  ["n1","n2","get","salutation","",1],
  ["n1","n4","get","name","",2],
  ["n1","n3","set","greeting","",3],
  ["n1","n5","flo","next","",4]
 ],
 "views":[{"name":"first","nodes":{"n5":{"position":{"x":124,"y":302}},"n4":{"position":{"x":446,"y":196}},"n3":{"position":{"x":446,"y":302}},"n2":{"position":{"x":316,"y":105}},"n1":{"position":{"x":124,"y":196}},"n0":{"position":{"x":124,"y":80}}},"edges":{}},{"name":"second view","nodes":{"n5":{"position":{"x":144,"y":302}},"n4":{"position":{"x":426,"y":196}},"n3":{"position":{"x":436,"y":302}},"n2":{"position":{"x":326,"y":105}},"n1":{"position":{"x":134,"y":196}},"n0":{"position":{"x":114,"y":80}}},"edges":{}},{"name":"sideways","nodes":{"n0":{"position":{"x":498,"y":130}},"n1":{"position":{"x":296,"y":254}},"n2":{"position":{"x":183,"y":94}},"n3":{"position":{"x":498,"y":185}},"n4":{"position":{"x":295,"y":126}},"n5":{"position":{"x":296,"y":329}}},"edges":{}}]
},
"Hello World version 2": {"graph": {"name":"Hello World version 1","template":"<button id='start_button'>Say Hello</button><div class='greeting'></div>"}, "nodes":[
  {"name":"start","id":"n0","io":{"selector":"#start_button"},"view":{"position":{"x":124,"y":80}},"node_type":"io"},
  {"name":"send","process":["this.greeting = salutation + ' ' + name;"],"id":"n1","view":{"position":{"x":124,"y":196}},"node_type":"process"},
  {"name":"salutation","data":{"salutation":"Hello"},"id":"n2","view":{"position":{"x":316,"y":105}},"node_type":"data"},
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
"views":[{"name":"primary","nodes":{"n0":{"position":{"x":146,"y":192}},"n1":{"position":{"x":322,"y":127}},"n2":{"position":{"x":245,"y":290}},"n3":{"position":{"x":450,"y":251}},"n4":{"position":{"x":90,"y":88}}},"edges":{}}]
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
 "views":[{"name":"primary","nodes":{"n0":{"position":{"x":146,"y":192}},"n1":{"position":{"x":322,"y":127}},"n2":{"position":{"x":245,"y":290}},"n3":{"position":{"x":450,"y":251}},"n4":{"position":{"x":90,"y":88}}},"edges":{}}]
},
"Loop 1": {"graph":{"name":"loop 1","template":"<button id='start_button'>Start</button><div class='counter'></div>"}, "nodes":[
  {"name":"start","id":"n0","io":{"selector":"#start_button"},"node_type":"io","view":{"position":{"x":124,"y":80}}},
  {"name":"c+=1","process":["this.c = c + 1;"],"id":"n1","node_type":"process","view":{"position":{"x":123,"y":248}}},
  {"name":"fin","id":"n5","node_type":"data","data":{"c":0},"view":{"position":{"x":124,"y":336}}},
  {"id":"n3","node_type":"io","name":"c","io":{"selector":".counter"},"data":{"c":0},"view":{"position":{"x":327,"y":253}}},
  {"id":"n4","node_type":"data","data":{"c":0},"name":"c","view":{"position":{"x":123,"y":165}}}
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
  {"id":"n6","node_type":"process","process":["wait(750);"],"name":"pause"},
  {"name":"start","id":"n0","io":{"selector":"#start_button"},"node_type":"io"},
  {"name":"c+=1","process":["this.c = c + 1;"],"id":"n1","node_type":"process"},
  {"name":"fin","id":"n5","node_type":"data","data":{"c":0}},
  {"id":"n3","node_type":"io","name":"c","io":{"selector":".counter"},"data":{"c":0}},
  {"id":"n4","node_type":"data","data":{"c":0},"name":"c"}
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
 ],
 "views":[{"name":"basic","nodes":{"n6":{"position":{"x":330,"y":248}},"n0":{"position":{"x":124,"y":80}},"n1":{"position":{"x":123,"y":248}},"n5":{"position":{"x":124,"y":336}},"n3":{"position":{"x":333,"y":94}},"n4":{"position":{"x":123,"y":165}}},"edges":{}},{"name":"alternate","nodes":{"n4":{"position":{"x":303,"y":91}},"n3":{"position":{"x":303,"y":183}},"n5":{"position":{"x":127,"y":333}},"n1":{"position":{"x":126,"y":183}},"n0":{"position":{"x":124,"y":80}},"n6":{"position":{"x":262,"y":309}}},"edges":{}}]
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
 "views":[{"name":"primary","nodes":{"n0":{"position":{"x":120,"y":80}},"n1":{"position":{"x":120,"y":196}},"n5":{"position":{"x":298,"y":192}},"n3":{"position":{"x":298,"y":83}}},"edges":{}}]
},
"Double Loop":
{"graph":{"name":"Double Loop","template":"<button id='start_button'>Start</button><div>i = <span class='var_i'></span></div><div>j = <span class='var_j'></span></div>"}, "nodes":[
  {"id":"n5","name":"fin","node_type":"process"},
  {"id":"n4","name":"inner loop","node_type":"process","process":["this.j = j + 1; alert('j is ' + j);"]},
  {"id":"n2","name":"i","node_type":"io","io":{"selector":".var_i","event":""}},
  {"id":"n1","name":"outer loop","node_type":"process","data":{"j":0},"process":["this.i = i + 1; alert('i is ' + i);"]},
  {"id":"n0","name":"i","node_type":"data","data":{"i":1},"io":{"selector":"#start_button","event":""}},
  {"id":"n3","name":"j","node_type":"io","data":{"j":0},"io":{"selector":".var_j","event":""}},
  {"id":"n6","name":"Start","node_type":"io","io":{"selector":"#start_button","event":""}}
 ],
 "edges":[
  ["n0","n2","set","","",0],
  ["n1","n2","get","","",1],
  ["n1","n3","set","","",2],
  ["n4","n3","get","","",3],
  ["n0","n1","flo","","",4],
  ["n4","n3","set","","",5],
  ["n1","n4","flo","i < 3","i < 3",6],
  ["n1","n2","set","","",7],
  ["n1","n5","flo","","i >= 3",8],
  ["n4","n4","flo","j < 3","j < 3",9],
  ["n4","n1","flo","","",10],
  ["n6","n0","sub","click","",11]
 ],
 "views":[{"name":"basic","nodes":{"n5":{"position":{"x":60,"y":290}},"n4":{"position":{"x":239,"y":299}},"n2":{"position":{"x":309,"y":83}},"n1":{"position":{"x":137,"y":178}},"n0":{"position":{"x":94,"y":83}},"n3":{"position":{"x":374,"y":179}},"n6":{"position":{"x":42,"y":12}}},"edges":{}}]
},
"Double Loop 2":
{"graph":{"name":"Double Loop 2","template":"<button id='start_button'>Start</button><div>i = <span class='var_i'></span></div><div>j = <span class='var_j'></span></div>"}, "nodes":[
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
  ["n1","n5","flo","","i >= 3",6],
  ["n4","n4","flo","","j < 3",7],
  ["n4","n1","flo","","j >= 3",8],
  ["n6","n0","sub","click","",9],
  ["n1","n7","flo","","i < 3",10],
  ["n7","n4","flo","","",11],
  ["n7","n3","set","","",12]
 ],
 "views":[{"name":"basic","nodes":{"n7":{"position":{"x":365,"y":221}},"n6":{"position":{"x":99,"y":38}},"n3":{"position":{"x":487,"y":196}},"n0":{"position":{"x":195,"y":95}},"n1":{"position":{"x":245,"y":165}},"n2":{"position":{"x":381,"y":86}},"n4":{"position":{"x":410,"y":321}},"n5":{"position":{"x":148,"y":283}}},"edges":{}}]
},
"Double Loop 3":
{"graph":{"name":"Double Loop 3","template":"<button id='start_button'>Start</button><div>i = <span class='var_i'></span></div><div>j = <span class='var_j'></span></div><div>grid: <div class='table'></div></div>"}, "nodes":[
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
  ["n1","n5","flo","","i >= 3",6],
  ["n4","n4","flo","","j < 3",7],
  ["n4","n1","flo","","j >= 3",8],
  ["n6","n0","sub","click","",9],
  ["n1","n7","flo","","i < 3",10],
  ["n7","n4","flo","","",11],
  ["n7","n3","set","","",12],
  ["n2","n8","set","","",13],
  ["n3","n8","set","","",14],
  ["n8","n9","set","","",15]
 ],
 "views":[{"name":"basic","nodes":{"n7":{"position":{"x":365,"y":221}},"n6":{"position":{"x":72,"y":43}},"n3":{"position":{"x":487,"y":196}},"n0":{"position":{"x":195,"y":95}},"n1":{"position":{"x":245,"y":165}},"n2":{"position":{"x":381,"y":86}},"n4":{"position":{"x":342,"y":322}},"n5":{"position":{"x":148,"y":283}},"n8":{"position":{"x":503,"y":127}},"n9":{"position":{"x":532,"y":55}}},"edges":{}}]
}
};
