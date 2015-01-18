// sample output that the graphlet_js_compiler will generate.

(function($) {

  var node_queue = [];
  var debug_mode = "";
  var nodes = {
    "start":{"process":function(input) {return input.a + input.b;},
      "get_edges":[
          function () {return get("n2", "data_key", "alias");}
        ],
        "set_edges":[], "flo_edges":[
          function (data_ele) {
            if (allow(guard_exp, data_ele)) {
              return "end"; // to_node_id
            }
            return ""; // no transition
        ],
    },
    "n2":{"name":"data_key", "data":{"data_key":"Hello World"},
      "get_edges":[], "set_edges":[], "flo_edges":[],
    },
    "n3":{"process":function(input) {return input.a + input.b;},
      "get_edges":[], "set_edges":[], "flo_edges":[],
    },
    "end":{"name":"data_key", "data":{"data_key":"Hello World"},
      "get_edges":[], "set_edges":[], "flo_edges":[],
    }

  };
  var edges = [];
  var run = function(node_id) {
    var node, input, result, trans_list = [];
    while(node_id) {
      node = nodes[node_id];
      input = node.get_all();
      result = node.process(input);
      node.set_all(result);
      node_id = node.transition(result);
    }
  };

  // interface
  init = function () {
    // init by setting up io listeners

    // init io elements from the environment

    // if a 'start' node exists, then run it
  };
  set_debug_mode = function (new_attr) {
    debug_mode = $.extend({}, debug_mode, new_attr);
  };



})($);

