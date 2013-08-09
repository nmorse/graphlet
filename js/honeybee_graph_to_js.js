// HoneyBee compiler (graph -> javascript)

var test_graph = {"graph":{"name":"max"}, "nodes":[
  {"name":"start","id":"n0","view":{"position":{"x":181,"y":94}},"node_type":"process"},
  {"name":"max","process":"Math.max","id":"n1","view":{"position":{"x":181,"y":201}},"node_type":"process"},
  {"name":"2.3","data":2.3,"id":"n2","view":{"position":{"x":331,"y":127}},"node_type":"data"},
  {"name":"out","type":"io","node_type":"io","id":"n3","view":{"position":{"x":435,"y":256}}},
  {"name":"1.03","type":"io","subtype":"POST","data":1.03,"node_type":"io","id":"n4","view":{"position":{"x":435,"y":183}}},
  {"name":"end","id":"n5","view":{"position":{"x":181,"y":310}},"node_type":"process"}
 ],
 "edges":[
  ["n0","n1","flo","",null],
  ["n1","n2","get","",null],
  ["n1","n4","get","",null],
  ["n1","n3","set","result",null],
  ["n1","n5","flo","",null]
 ]
};

function compile(graph) {
    var listeners = graph("node type=process");
    var get_emiters = graph("edge type=get");
    var set_emiters = graph("edge type=set");
    var flow_emiters = graph("edge type=flow");
    var js_str = '';
    $.each(listener, function(i, o) {
        if (o.process) {
            js_str += '\
on("' + o.id + '", function() {\
    var args = get_all();\
    var result = ' + o.process + '.map(args);\
    var next_node_id = '';\
    set_all(result);\
    next_node_id = flow_to(result, graph("edge type=flow from=' + o.id + '"));\
    if (next_node_id) {\
        emit("honeybee "+next_node_id);\
    }\
    else {\
        emit("honeybee halt")\
    }\
});';
        }
    });
}
