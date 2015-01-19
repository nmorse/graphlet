// sample output that the graphlet_js_compiler will generate.

(function($) {
  var g = {"graph":{"name":"counter 1","template":"<button id='start_button'>Start</button><div class='counter'></div>"},
  "nodes":[
  {"id":"n3","name":"c","io":{"selector":".counter"},"data":{"c":0}},
  {"name":"","id":"n5","data":{"c":0}},
  {"name":"+1","process":[function(in){this.c = in.c + 1;return this;}],"id":"n1"},
  {"name":"start","id":"n0","io":{"selector":"#start_button"}}
 ],
 "edges":[
  {"to":"n1","type":"msg","name":"click","guard":"","id":0}, // put these in on_init listner hookup
  {"from":"n1","to":"n5","type":"flo","name":"","guard":function(in) {return (in.c > 5);},"id":1},
  {"from":"n1","to":"n3","type":"set","name":"","guard":function(in) {return (in.c <= 5);},"id":2},
  {"from":"n1","to":"n3","type":"get","name":"","guard":"","id":3},
  {"from":"n5","to":"n3","type":"set","name":"","guard":"","id":4}
 ]};
  var node_queue = [];
  var debug_mode = "";
  var nodes = {
    "start":{"process":function(input) {return input.a + input.b;},
      "get_edges":[
          // function returns data from, nameed,  aliased as.
          function () {return get( "n2", "count", "c");},
          function () {return get( "n2", "limit");}
      ],
      "set_edges":[],
      "flo_edges":[
        function (data_ele) {
          if (allow(guard_exp, data_ele)) {
            return "end"; // to_node_id
          }
          return ""; // no transition
        }
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

  var nodify = function (node) {
    node.get_all = function() {

    };
    node.process = function() {

    };
    return node;
  };

  // interface
  init = function () {
    // augment nodes objects by adding functionality


    // init by setting up io listeners

    // init io elements from the environment

    // if a 'start' node exists, then run it
  };
  set_debug_mode = function (new_attr) {
    debug_mode = $.extend({}, debug_mode, new_attr);
  };



})($);

