// graphlet run
//

(function($, gq) {
  var glt;
  var step_rate = 0;


  var unpack_edge = function(e) {
    return {"from":e[0], "to":e[1], "edge_type":e[2], "name":e[3], "guard":e[4], "index":e[5] };
  };

  // get all values from get edges and return as an object
  var get_all = function(id) {
    var got_obj = {};
    var g = this.glt;
    var get_edges = gq.using(g).find({"element":"edge", "type":"get", "from":id}).edges();
    $.each(get_edges, function get_edge (i, e) {
      var edge = unpack_edge(e);
      var end_node = gq.using(g).find({"element":"node", "id":edge.to}).nodes()[0];
      var name = edge.name || end_node.name;
      // get edges use the "guard" as an "alias"
      var alias = edge.guard || name;
      var selector;
      if (step_rate) {
        vis_run_state("edge[source='"+edge.from+"'][target='"+edge.to+"'][edge_type='get']", "active_run_get", step_rate/2);
      }
      if (end_node.io && name === end_node.io.selector.substr(1)) {
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
        if (step_rate) {
          vis_run_state("node[id='"+end_node.id+"']", "active_run_get", step_rate/2);
        }
	    }
    });
    return got_obj;
  };

  var set_1edge = function(e, g, result) {
    var edge = unpack_edge(e);
    var end_node = gq.using(g).find({"element":"node", "id":edge.to}).nodes()[0];
    var start_node = gq.using(g).find({"element":"node", "id":edge.from}).nodes()[0];
    var name = edge.name || end_node.name || start_node.name || "data";
    var guard = {"result":true};

    if (edge.guard) {
      guard = run_edge_guard(result, edge.guard);
    }

    if (step_rate && guard.result) {
      vis_run_state("edge[source='"+edge.from+"'][target='"+edge.to+"'][edge_type='set']", "active_run_set", step_rate/2);
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
				if (edge.name === 'push') {
				  end_node.data[end_node.name].push(result[name]);
				}
				else {
				  end_node.data[name] = result[name];
				}
				if (end_node.io && end_node.io.selector) {
					$(end_node.io.selector).text(end_node.data[name]);
					$(end_node.io.selector).val(end_node.data[name]);
				}
				set_all(edge.to, result);
				if (step_rate) {
				  vis_run_state("node[id='"+end_node.id+"']", "active_run_set", step_rate/2);
        }
      }
    }
  };

  var set_all = function(id, result) {
    var g = this.glt;
    //var from_node = gq.using(g).find({"element":"node", "id":id}).nodes();
    var set_edges = gq.using(g).find({"element":"edge", "type":"set", "from":id}).edges();
    var pub_edges = gq.using(g).find({"element":"edge", "type":"pub", "from":id}).edges();

    $.each(set_edges, function set_edge(i, e) { set_1edge(e, g, result); });
    $.each(pub_edges, function pub_edge(i, e) {
      var edge = unpack_edge(e);
      var end_node = gq.using(g).find({"element":"node", "id":edge.to}).nodes()[0];
      var start_node = gq.using(g).find({"element":"node", "id":id}).nodes()[0];
      var effect_options;
      if (start_node.data && start_node.data.effect && end_node.io && end_node.io.selector) {
        effect_options = $.extend({"complete":function() {
          console.log("effect complete");
          end_node.data['effect_state'] = "done";
        }}, start_node.data);
        end_node.data['effect_state'] = "start";
        $(end_node.io.selector).effect(effect_options);
      }
      else {
        console.log("trigger of " + edge.type);
        $('body').trigger(edge.type);
      }
    });
  };

  var transition_to = function(id, get_result) {
    var gone = false; // no transition has been found, this boolean is used to stop multiple edges from firing.
    var g = this.glt;
    var trans_edges = gq.using(g).find({"element":"edge", "type":"flo", "from":id}).edges();
    // first go through only the restrictive guarded flo edges.
    $.each(trans_edges, function restrictive_flo(i, e) {
      var edge = unpack_edge(e);
      var guard = {"result":false};
      if (edge.guard && !gone) {
        guard = run_edge_guard(get_result, edge.guard);

        if (guard.result) {
          console.log("trigger transition "+edge.from+" -> "+edge.to);
          if (step_rate) {
            vis_run_state("edge[source='"+edge.from+"'][target='"+edge.to+"']", "active_run_flo", step_rate);
          }
          setTimeout(function() {$("body").trigger("edge_" + edge.index);}, step_rate);
          gone = true;
          return false; // escape the each iterator
        }
      }
    });
    if (!gone) {
      // secondly go to any non-restrictive flo edges (with no guard)
      $.each(trans_edges, function free_flo(i, e) {
        var edge = unpack_edge(e);
        var guard = {"result":true};
        if (!edge.guard & !gone) {
          if (guard.result) {
            console.log("trigger transition "+edge.from+" -> "+edge.to);
            if (step_rate) {
              vis_run_state("edge[source='"+edge.from+"'][target='"+edge.to+"']", "active_run_flo", step_rate);
            }
            setTimeout(function() {$("body").trigger("edge_" + edge.index);}, step_rate);
            return false; // escape the each iterator
          }
        }
      });
    }
  };

  var run_node = function(target_node) {
    var orig_step_rate = step_rate;
    var pause_mode = false;
    var get_data = get_all(target_node.id);
    var this_node;
    var wait = function(milliseconds) {
      console.log("wait() defers transition at node "+target_node.id+" by "+milliseconds);
      get_data.defered_transition = true;
      setTimeout(function() {transition_to(target_node.id, {});}, milliseconds);
    };
    if (vis_node_selected(target_node.id)) {
      pause_mode = true;
      step_rate = 5000;
    }
    if (step_rate) {
      vis_run_state("node[id='"+target_node.id+"']", "active_run_node", step_rate);
    }
    get_data.defered_transition = false;
    if (target_node.data) {
      get_data = $.extend(get_data, target_node.data);
    }
    if (target_node.process) {
      get_data.wait = wait;
      get_data.target_node_id = target_node.id;
      $.each(target_node.process, function run_proc(i, process) {
        get_data = run_node_process(get_data, process);
      });
    }

    setTimeout(function() {
      set_all(target_node.id, get_data);
      if (!get_data.defered_transition) {
        transition_to(target_node.id, get_data);
      }
    }, step_rate/2);

    step_rate = orig_step_rate;
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
		locals = $.extend({}, locals, env);

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
			var sandbox = new (Function.prototype.bind.apply(Function, context))(); // create the sandbox function
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
			var sandbox = new (Function.prototype.bind.apply(Function, context))(); // create the sandbox function
			context = Array.prototype.concat.call(env, args); // create the argument list for the sandbox

			return Function.prototype.bind.apply(sandbox, context); // bind the local variables to the sandbox
		};

		// result is the 'this' object for the code
		var result = {};
		var sandbox = createSandbox(result, code, locals); // create a sandbox

		sandbox(); // call the user code in the sandbox
		return result;
	};

  set_step_rate = function() {
    step_rate = parseInt($("#run_step_rate").val(), 10) || 0;
    $('body').trigger('run_step_rate_change', step_rate);
  };

  init_graphlet = function(g) {
    var io_nodes = gq.using(g).find({"element":"node", "type":"io"}).nodes();
    var flo_edges = gq.using(g).find({"element":"edge", "type":"flo"}).edges();
    this.glt = g;
    // cancel any previous listeners for a graph_init message.
    $('body').off('graph_init');
    set_step_rate();
    if (g.graph && g.graph.template) {
			$(function() {
				$("#graphlet").html(g.graph.template);
			});
		}
		$.each(io_nodes, function init_io_node(i, node) {
		  var selector, selector_str;
		  var sel_dom;
		  var event_edges;
		  if (node.parent) {
		    event_edges = gq.using(g).find({"element":"edge", "type":"sub", "from":node.parent}).edges();
		  }
		  else {
		    event_edges = gq.using(g).find({"element":"edge", "type":"sub", "from":node.id}).edges();
		  }

		  if (node.io && node.io.selector) {
		    selector = node.io.selector;
		    // initial sync the nodes data with the IO point
		    sel_dom = $(selector)[0];
		    if (!sel_dom) {
		      if (selector[0] === '#') {
		        selector_str = ' id="'+selector.substr(1)+'"';
		      }
		      if (selector[0] === '.') {
		        selector_str = ' class="'+selector.substr(1)+'"';
		      }
		      $("#graphlet").append('<div ' + selector_str + '>'+selector_str+'</div>');
		    }
		    // initial syncing of DOM and data
		    if (node.data && node.name) {
		      $(selector).val(node.data[node.name]);
		      $(selector).text(node.data[node.name]);
		    }
		    if (!node.data) {node.data = {};}
		  }
	    if (event_edges) {
	      selector = node.io.selector || 'body';
	      $.each(event_edges, function turn_off_events (i, e) {
	        var edge = unpack_edge(e);
	        $(selector).off(edge.name);
	      });
	      $.each(event_edges, function prepare_events (i, e) {
	        var edge = unpack_edge(e);
    			var target_node = gq.using(g).find({"element":"node", "id":edge.to}).nodes()[0];
    			$(selector).on(edge.name, function fire_evt() {
    				// DOM events are mapped to edges. the event source data is transfered to the
    				// target node, then the target node is run by calling run_node().
    				target_node.data = $.extend({}, target_node.data, node.data);
    				run_node(target_node);
    			});
	      });
	    }
		});
    $.each(flo_edges, function prepare_flows(i, e) {
      var edge = unpack_edge(e);
			$("body").off("edge_" + edge.index);
			$("body").on("edge_" + edge.index, function fire_flo() {
				var target_node = gq.using(g).find({"element":"node", "id":edge.to}).nodes()[0];
				run_node(target_node);
			});
		});
    console.log("trigger of graph_init event");
    $('body').trigger('graph_init');
  };

})($, gq);
