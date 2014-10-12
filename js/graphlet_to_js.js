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
function filter(arr, key, val) {
    var ret_arr = [];
    var i = 0, len = arr.length;
    for (i = 0; i < len; i += 1) {
        if (arr[i][key] === val) {
            ret_arr[ret_arr.length] = arr[i];
        }
    }
    return ret_arr;
}
function compile(graph) {
    var listeners = filter(graph.nodes, "node_type", "process");
    var js_str = '';
    $.each(listeners, function(i, o) {
        js_str += '\
on("' + o.id + '", function() {\n\
    var next_node_id = "";\n\
    var args = hbg.get_all("' + o.id + '");\n';
        if (o.process) {
            js_str += '    var result = ' + o.process + '.apply(this, args);\n';
        }
        else {
            js_str += '    var result = args;\n';
        }
        js_str += '\
    hbg.set_all("' + o.id + '", result);\n\
    next_node_id = hbg.flow_to(result, hbg.filter("edge type=flow from=' + o.id + '"));\n\
    if (next_node_id) {\n\
        emit("honeybee "+next_node_id);\n\
    }\n\
    else {\n\
        emit("honeybee halt");\n\
    }\n\
});\n';
    });
    return js_str;
}
