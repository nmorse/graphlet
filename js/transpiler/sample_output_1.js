// sample output that the graphlet_js_compiler will generate.

(function($) {

  var g = {"graph":{"name":"counter 1","template":"<button id='start_button'>Start</button><div class='counter'></div>"},
    "nodes":{
      "n3":{"name":"c","io":{"selector":".counter"},"data":{"c":0}},
      "n5":{"name":"","data":{"c":0},
        "edges":{
          "set":[{"to":"n3"}]
        }
      },
      "n1":{"name":"+1", "process":[function(input){this.c = input.c + 1;return this;}],
        "edges":{
          "get":[{"to":"n3"}],
          "set":[{"to":"n3","guard":function(input) {return (input.c <= 5);}}],
          "flo":[{"to":"n5","guard":function(input) {return (input.c > 5);}}]
        }
      },
      "n0":{"name":"start","io":{"selector":"#start_button"}
      }
   },
   "edges":[
    {"from":"n0","to":"n1","type":"msg","name":"click","guard":"","id":0}, // put msg edges in on_init listner hookup
    {"from":"n1","to":"n5","type":"flo","name":"","guard":function(input) {return (input.c > 5);},"id":1}, // all other in the from node
    {"from":"n1","to":"n3","type":"set","name":"","guard":function(input) {return (input.c <= 5);},"id":2},
    {"from":"n1","to":"n3","type":"get","name":"","guard":"","id":3},
    {"from":"n5","to":"n3","type":"set","name":"","guard":"","id":4}
   ]
  };
  var environment_selector = "";
  var debug_mode = "";

  var run = function(node_id) {
    var node, input, result;
    while(node_id) {
      node = g.nodes[node_id];
      input = get_all(node);
      node.data = $.extend({}, input, node.data);
      result = process(node);
      node.data = $.extend({}, result, node.data);
      set_all(node);
      node_id = transition(node);
    }
  };

  var get_all = function(node) {
    var got_obj = {};
    $.each(node.edges.get, function(i, edge) {
      var end_node = g.nodes[e.to];
      var name = edge.name || end_node.name;
      // get edges use the "guard" as an "alias"
      var alias = edge.guard || name;
      var selector;
      if (step_delay) {
        vis_run_state("edge[source='"+edge.from+"'][target='"+edge.to+"'][edge_type='get']", "active_run_get", step_delay/2);
      }
      if (end_node.io) {
        if (end_node.io.selector && end_node.io.valve >= 2) {
          selector = end_node.io.selector;
          if (!end_node.data) {end_node.data = {};}
          end_node.data[name] = $(selector).val() || $(selector).text();
          if (end_node.io.as_type && $.type(end_node.data[name]) != end_node.io.as_type) {
            console.log("convert type "+$.type(end_node.data[name])+" to "+end_node.io.as_type);
            if (end_node.io.as_type === "boolean") {
              end_node.data[name] = (end_node.data[name] === 'true' || end_node.data[name] === '1' || end_node.data[name] === 'on');
            }
          }
        }
        else {
          console.log("Warning: io node was not able to provide data to get edge. ", JSON.stringify(end_node.io));
        }
      }
      if (end_node.data) {
		    got_obj[alias] = end_node.data[name];
        if (step_delay) {
          vis_run_state("node[id='"+end_node.id+"']", "active_run_get", step_delay/2);
        }
	    }

    });
    return got_obj;
  };
  var process = function(node) {
    var result = {};
    $.each(node.processes, function(i, process) {
      result = $.extend({}, process.call(node.data), result);
    });
    return result;
  };
  var set_all = function(node) {
    var set_edges = node.edges.set;
    var pub_edges = node.edges.pub;
    $.each(set_edges, function(i, edge) {
      //var edge = unpack_edge(e);
      var end_node = gq.using(g).find({"element":"node", "id":edge.to}).nodes()[0];
      var start_node = gq.using(g).find({"element":"node", "id":id}).nodes()[0];
      var name = edge.name || end_node.name || start_node.name || "data";
      var guard = {"result":true};

      if (edge.guard) {
        guard = run_edge_guard(result, edge.guard);
      }

      if (step_delay && guard.result) {
        vis_run_state("edge[source='"+edge.from+"'][target='"+edge.to+"'][edge_type='set']", "active_run_set", step_delay/2);
      }
      if (guard.result) {
        if (name.charAt(0) === ".") {
  				if (end_node.io && end_node.io.selector) {

  					switch (name)  {
  						case ".css":
  							$(end_node.io.selector).css(start_node.data);
  							break;
  						case ".attr":
  							$(end_node.io.selector).attr(start_node.data);
  							break;
  						case ".hide":
  							$(end_node.io.selector).hide(start_node.data.speed);
  							break;
  						case ".show":
  							$(end_node.io.selector).show(start_node.data.speed);
  							break;
  						default:
  							alert("jQuery function " +name + " is not supported at this time.");
  					}

  				}
  			}
  			else {
  				if (!end_node.data) { end_node.data = {};}
  				end_node.data[name] = result[name];
  				if (end_node.io && end_node.io.selector) {
  					$(end_node.io.selector).text(end_node.data[name]);
  					$(end_node.io.selector).val(end_node.data[name]);
  				}
  				set_all(edge.to, result);
  				if (step_delay) {
  				  vis_run_state("node[id='"+end_node.id+"']", "active_run_set", step_delay/2);
          }
        }
      }
    });
    $.each(pub_edges, function(i, edge) {
      //var edge = unpack_edge(e);
      var end_node = gq.using(g).find({"element":"node", "id":edge.to}).nodes()[0];
      var start_node = gq.using(g).find({"element":"node", "id":id}).nodes()[0];
      var effect_options;
      if (start_node.data && start_node.data.effect && end_node.io && end_node.io.selector) {
        effect_options = $.extend({"complete":function() {
          console.log("effect complete"); //this.data['effect state'] = "done"
        }}, start_node.data);
        $(end_node.io.selector).effect(effect_options);
      }
      else {
        console.log("trigger of " + edge.type);
        $('body').trigger(edge.type);
      }

    });
  };
  var transition = function(node) {
    var gone = false; // no transition has been found, this boolean is used to stop multiple edges from firing.
    var g = this.glt;
    var trans_edges = node.edges.flo;
    var next_node_id = '';
    // first go through only the restrictive guarded flo edges.
    $.each(trans_edges, function(i, edge) {
      //var edge = unpack_edge(e);
      var guard = {"result":false};
      if (edge.guard && !gone) {
        guard = run_edge_guard(get_result, edge.guard);

        if (guard.result) {
          console.log("trigger transition "+edge.from+" -> "+edge.to);
          if (step_delay) {
            vis_run_state("edge[source='"+edge.from+"'][target='"+edge.to+"'][edge_type='flo']", "active_run_flo", step_delay);
          }
          //setTimeout(function() {$("body").trigger("edge_" + edge.index);}, step_delay);
          next_node_id = edge.to;
          gone = true;
          return false; // escape the each iterator
        }
      }
    });
    if (gone) {
      return next_node_id;
    }
    // secondly go to any non-restrictive flo edges (with no guard)
    $.each(trans_edges, function(i, edge) {
      //var edge = unpack_edge(e);
      var guard = {"result":true};
      if (!edge.guard & !gone) {
        if (guard.result) {
          console.log("trigger transition "+edge.form+" -> "+edge.to);
          if (step_delay) {
            vis_run_state("edge[source='"+edge.form+"'][target='"+edge.to+"'][edge_type='flo']", "active_run_flo", step_delay);
          }
          //setTimeout(function() {$("body").trigger("edge_" + edge.index);}, step_delay);
          next_node_id = edge.to;
          return false; // escape the each iterator
        }
      }
    });
    return next_node_id;

  };
  var init_environment = function() {

  };
  var listen = function(edge) {
    var selector = edge.from_node.io.selector;
    var message_channel = edge.name;
    $(selector).off(message_channel);
    $(selector).on(message_channel, function() {
      run(edge.to);
    });
  };


  // interface
  init = function (env_selector) {
    // init io elements from the environment
    environment_selector = env_selector;
    init_environment();

    // init by setting up io listeners on edges of type 'msg'
    listen({"from_node":{"id":"n0", "io":{"selector":"#start_button"}},"to":"n1","type":"msg","name":"click"});

    // send an graph_init message
    $(environment_selector).trigger('graph_init');

  };

  set_debug_mode = function (new_attr) {
    debug_mode = $.extend({}, debug_mode, new_attr);
  };



})(jQuery);

