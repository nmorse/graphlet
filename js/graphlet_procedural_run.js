// graphlet run
//

(function($, gq) {
  var glt;
  var debug_rate = 0;
  // get all values from get edges and return as an object
  var get_all = function(id) {
    var got_obj = {};
    var g = this.glt;
    var get_edges = gq.using(g).find({"element":"edge", "type":"get", "from":id}).edges();
    $.each(get_edges, function(i, o) {
	    var to_node_id = o[1];
      var end_node = gq.using(g).find({"element":"node", "id":to_node_id}).nodes()[0];
      var name = o[3] || end_node.name;
      var alias = o[4] || name;
      var this_edge;
      var this_node;
      var selector;
      if (debug_rate) {
        this_edge = get_current_cyto_graph().$("edge[source='"+o[0]+"'][target='"+o[1]+"'][edge_type='get']");
        this_edge.addClass("active_run_get");
        setTimeout(function() {this_edge.removeClass("active_run_get");}, debug_rate/2);
      }
      if (end_node.node_type === 'io') {
        if (end_node.io && end_node.io.selector && end_node.io.valve >= 2) {
          selector = end_node.io.selector;
          if (!end_node.data) {end_node.data = {};}
          end_node.data[name] = $(selector).val() || $(selector).text();
        }
        else {
          console.log("Warning: io node was not able to provide data to get edge. ", JSON.stringify(end_node.io));
        }
      }
      if (end_node.data) {
		    got_obj[alias] = end_node.data[name];
        if (debug_rate) {
          this_node = get_current_cyto_graph().$("node[id='"+end_node.id+"']");
          this_node.addClass("active_run_get");
          setTimeout(function() {this_node.removeClass("active_run_get");}, debug_rate/2);
        }
	    }
    });
    return got_obj;
  };

  var set_all = function(id, result) {
    var g = this.glt;
    var set_edges = gq.using(g).find({"element":"edge", "type":"set", "from":id}).edges();
    var pub_edges = gq.using(g).find({"element":"edge", "type":"pub", "from":id}).edges();
    $.each(set_edges, function(i, e) {
      var end_node = gq.using(g).find({"element":"node", "id":e[1]}).nodes()[0];
      var start_node = gq.using(g).find({"element":"node", "id":id}).nodes()[0];
      var alias = e[3];
      var name = alias || end_node.name || start_node.name || "data";
      var guard = e[4];
      var this_edge;
      var cy_target_node;
      var guard_expression = e[4];
      var guard = {"result":true};

      if (guard_expression) {
        guard = run_edge_guard(result, guard_expression);
      }

      if (debug_rate && guard.result) {
        this_edge = get_current_cyto_graph().$("edge[source='"+e[0]+"'][target='"+e[1]+"'][edge_type='set']");
        this_edge.addClass("active_run_set");
        setTimeout(function() {this_edge.removeClass("active_run_set");}, debug_rate/2);
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
  				set_all(e[1], result);
  				if (debug_rate) {
            cy_target_node = get_current_cyto_graph().$("node[id='"+end_node.id+"']");
            cy_target_node.addClass("active_run_set");
            setTimeout(function() {cy_target_node.removeClass("active_run_set");}, debug_rate/2);
          }
        }
      }
    });
    $.each(pub_edges, function(i, e) {
      var end_node = gq.using(g).find({"element":"node", "id":e[1]}).nodes()[0];
      var start_node = gq.using(g).find({"element":"node", "id":id}).nodes()[0];
      var effect_options;
      if (start_node.data && start_node.data.effect && end_node.io && end_node.io.selector) {
        effect_options = $.extend({"complete":function() {
          console.log("effect complete"); //this.data['effect state'] = "done"
        }}, start_node.data);
        $(end_node.io.selector).effect(effect_options);
      }
      else {
        console.log("trigger of " + e[2]);
        $('body').trigger(e[2]);
      }

    });
  };

  var transition_to = function(id, get_result) {
    var gone = false;
    var g = this.glt;
    var trans_edges = gq.using(g).find({"element":"edge", "type":"flo", "from":id}).edges();
    // first go through only the restrictive guarded flo edges.
    $.each(trans_edges, function(i, e) {
      var guard_expression = e[4];
      var guard = {"result":false};
      if (guard_expression && !gone) {
        guard = run_edge_guard(get_result, guard_expression);

        if (guard.result) {
          console.log("trigger transition "+e[0]+" -> "+e[1]);
          if (debug_rate) {
            this_edge = get_current_cyto_graph().$("edge[source='"+e[0]+"'][target='"+e[1]+"'][edge_type='flo']");
            this_edge.addClass("active_run_flo");
            setTimeout(function() {this_edge.removeClass("active_run_flo");}, debug_rate);
          }
          setTimeout(function() {$("body").trigger("edge_" + e[5]);}, debug_rate);
          gone = true;
        }
      }
    });
    // secondly go to any non-restrictive flo edges (with no guard)
    $.each(trans_edges, function(i, e) {
      var guard_expression = e[4];
      var guard = {"result":true};
      if (!guard_expression & !gone) {
        if (guard.result) {
          console.log("trigger transition "+e[0]+" -> "+e[1]);
          if (debug_rate) {
            this_edge = get_current_cyto_graph().$("edge[source='"+e[0]+"'][target='"+e[1]+"'][edge_type='flo']");
            this_edge.addClass("active_run_flo");
            setTimeout(function() {this_edge.removeClass("active_run_flo");}, debug_rate);
          }
          setTimeout(function() {$("body").trigger("edge_" + e[5]);}, debug_rate);
        }
      }
    });
  };

  var run_node = function(target_node) {
    var get_data = get_all(target_node.id);
    var this_node;
    var wait = function(milliseconds) {
      console.log("wait() defers transition at node "+target_node.id+" by "+milliseconds);
      get_data.defered_transition = true;
      setTimeout(function() {transition_to(target_node.id, {});}, milliseconds);
    };
    if (debug_rate) {
      this_node = get_current_cyto_graph().$("node[id='"+target_node.id+"']");
      this_node.addClass("active_run_node");
      setTimeout(function() {this_node.removeClass("active_run_node");}, debug_rate);
    }
    get_data.defered_transition = false;
    if (target_node.node_type === "process" && target_node.process) {
      get_data.wait = wait;
      get_data.target_node_id = target_node.id;
      $.each(target_node.process, function(i, process) {
        get_data = run_node_process(get_data, process);
      });
    }
    else {
      get_data = $.extend(get_data, target_node.data);
    }

    setTimeout(function() {
      set_all(target_node.id, get_data);
      if (!get_data.defered_transition) {
        transition_to(target_node.id, get_data);
      }
    }, debug_rate/2);
  };

	// sandbox for functional (saferEval)
	// create our own local versions of window and document with limited functionality
	var run_node_process = function (env, code) {
		// Shadow some sensitive global objects
		var locals = {
			window: {},
			document: {}
		};
		// and mix in the environment
		locals = $.extend(locals, env);

		var createSandbox = function (env, code, locals) {
			var params = []; // the names of local variables
			var args = []; // the local variables

			for (var param in locals) {
				if (locals.hasOwnProperty(param)) {
					args.push(locals[param]);
					params.push(param);
				}
			}

			var context = Array.prototype.concat.call(env, params, code); // create the parameter list for the sandbox
			var sandbox = new (Function.prototype.bind.apply(Function, context)); // create the sandbox function
			context = Array.prototype.concat.call(env, args); // create the argument list for the sandbox

			return Function.prototype.bind.apply(sandbox, context); // bind the local variables to the sandbox
		};

		// result is the 'this' object for the code
		//var result = {};
		var sandbox = createSandbox(env, code, locals); // create a sandbox

		sandbox(); // call the user code in the sandbox
		return env;
	};

	var run_edge_guard = function (env, code) {
		// Shadow some sensitive global objects
		var locals = {
			window: {},
			document: {}
		};
		// and mix in the environment
		locals = $.extend(locals, env);

		var createSandbox = function (env, code, locals) {
			var params = []; // the names of local variables
			var args = []; // the local variables

			for (var param in locals) {
				if (locals.hasOwnProperty(param)) {
					args.push(locals[param]);
					params.push(param);
				}
			}

			var context = Array.prototype.concat.call(env, params, "this.result = (" + code + ");"); // create the parameter list for the sandbox
			var sandbox = new (Function.prototype.bind.apply(Function, context)); // create the sandbox function
			context = Array.prototype.concat.call(env, args); // create the argument list for the sandbox

			return Function.prototype.bind.apply(sandbox, context); // bind the local variables to the sandbox
		};

		// result is the 'this' object for the code
		var result = {};
		var sandbox = createSandbox(result, code, locals); // create a sandbox

		sandbox(); // call the user code in the sandbox
		return result;
	};

  init_graphlet = function(g) {
    var io_nodes = gq.using(g).find({"element":"node", "type":"io"}).nodes();
    var flo_edges = gq.using(g).find({"element":"edge", "type":"flo"}).edges();
    var subscribe_edges = gq.using(g).find({"element":"edge", "type":"sub"}).edges();
    this.glt = g;
    // cancel any previous listeners for a graph_init message.
    $('body').off('graph_init');
    debug_rate = parseInt($("#run_debug_rate").val(), 10) || 0;
    if (g.graph && g.graph.template) {
			$(function() {
				$("#graphlet").html(g.graph.template);
			});
		}
		$.each(io_nodes, function(i, node) {
		  var selector;
		  if (node.io && node.io.selector) {
		    selector = node.io.selector;
		    // initial sync the nodes data with the IO point
		    if (node.data && node.name) {
		      $(selector).val(node.data[node.name]);
		      $(selector).text(node.data[node.name]);
		    }
		  }
		});
    $.each(flo_edges, function(i, o) {
			$("body").off("edge_" + o[5]);
			$("body").on("edge_" + o[5], function () {
				var to_node_id = o[1];
				var target_node = gq.using(g).find({"element":"node", "id":to_node_id}).nodes()[0];
				run_node(target_node);
			});
		});
    // first time to turn off all listeners
    $.each(subscribe_edges, function(i, edge) {
			var from_node_id = edge[0];
			var event_name = edge[3];
			var source_node = gq.using(g).find({"element":"node", "id":from_node_id}).nodes()[0];
			var io = source_node.io;
			if (!io) {io = {};}
			if (!io.selector) {io.selector = 'body';}
			$(io.selector).off(event_name);
		});
		// secontime through this set of edges to turn on listneing (subscribe) to events.
    $.each(subscribe_edges, function(i, edge) {
			var from_node_id = edge[0];
			var event_name = edge[3];
			var source_node = gq.using(g).find({"element":"node", "id":from_node_id}).nodes()[0];
			var io = source_node.io;
			if (!io) {io = {};}
			if (!io.selector) {io.selector = 'body';}
			$(io.selector).on(event_name, function() {
				var to_node_id = edge[1];
				var target_node = gq.using(g).find({"element":"node", "id":to_node_id}).nodes()[0];
				run_node(target_node);
			});
		});
    console.log("trigger of graph_init event");
    $('body').trigger('graph_init');
  };

})($, gq);
