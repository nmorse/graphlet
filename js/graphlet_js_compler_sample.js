// sample output that the graphlet_js_compiler will generate.

(function($) {

  var node_queue = [];
  var debug_mode = "";
  var nodes = {
    "n1":{"process":function(input) {return input.a + input.b;}

    }

  };
  var edges = [];
  var run = function(node_id) {
    var node, input, result, trans_list = [];
    node_queue.enqueue([node_id]);
    while(node_queue) {
      node_id = node_queue.dequeue();
      node = nodes[node_id];
      input =node.get_all();
      result = node.process(input);
      node.set_all(result);
      trans_list = node.transition(result);
      enqueue(trans_list);
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

