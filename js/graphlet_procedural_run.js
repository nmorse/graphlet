// graphlet run
// 

(function($, gq) {
    var glt;
    // get all values from get edges and return as an object
    var get_all = function(id) {
        var got_obj = {};
        var g = this.glt;
        var get_edges = gq.using(g).find({"element":"edge", "type":"get", "from":id}).edges();
        $.each(get_edges, function(i, o) {
			var to_node_id = o[1];
            var end_node = gq.using(g).find({"element":"node", "id":to_node_id}).nodes()[0];
            var alias = o[3];
            var name = alias || end_node.name;
            got_obj[name] = end_node.data[name];
        });
        return got_obj;
    };
    var set_all = function(id, result) {
		var g = this.glt;
        var set_edges = gq.using(g).find({"element":"edge", "type":"set", "from":id}).edges();
        var pub_edges = gq.using(g).find({"element":"edge", "type":"pub", "from":id}).edges();
        $.each(set_edges, function(i, o) {
            var end_node = gq.using(g).find({"element":"node", "id":o[1]}).nodes()[0];
            var start_node;
            var alias = o[3];
            var name = alias || end_node.name || "data";
            if (name.charAt(0) === ".") {
				if (end_node.io && end_node.io.selector) {
					start_node = gq.using(g).find({"element":"node", "id":id}).nodes()[0];
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
			}
        });
        $.each(set_edges, function(i, e) {
            var end_node = gq.using(g).find({"element":"node", "id":e[1]}).nodes()[0];
            var start_node = gq.using(g).find({"element":"node", "id":id}).nodes()[0];
            $(end_node.io.selector).effect("shake");
            
		});
    };
    var transition_to = function(id, get_result) {
		var g = this.glt;
        var trans_edges = gq.using(g).find({"element":"edge", "type":"flo", "from":id}).edges();
        $.each(trans_edges, function(i, e) {
			var guard_expression = e[4];
			var guard = {"result":true};
			if (guard_expression) {
				guard = run_edge_guard(get_result, guard_expression);
			}
			if (guard.result) {
				console.log("trigger transition "+e[0]+" -> "+e[1]);
				setTimeout(function() {$("body").trigger("edge_" + e[5]);}, 10);
			}
        });
    };
    var wait = function(id, milliseconds) {
		console.log("defer transition to "+id+" by "+milliseconds);
		setTimeout(function() {transition_to(id, {});}, milliseconds);
	};
    var run_node = function(target_node) {
		var get_data = get_all(target_node.id);
		
		get_data.defered_transition = false;
		if (target_node.node_type === "process") {
			get_data.wait = wait;
			get_data.target_node_id = target_node.id;
			
			$.each(target_node.process, function(i, process) {
				get_data = run_node_process(get_data, process);
			});
		}
		else {
			get_data = $.extend(get_data, target_node.data);
		}

		set_all(target_node.id, get_data);

		if (!get_data.defered_transition) {
			transition_to(target_node.id, get_data);
		}
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
		var result = {};
		var sandbox = createSandbox(result, code, locals); // create a sandbox

		sandbox(); // call the user code in the sandbox
		return result;
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
        var flo_edges = gq.using(g).find({"element":"edge", "type":"flo"}).edges();
        var subscribe_edges = gq.using(g).find({"element":"edge", "type":"sub"}).edges();
        this.glt = g;
        if (g.graph && g.graph.template) {
			$(function() {
				$("#graphlet").html(g.graph.template);
			});
		}
        $.each(flo_edges, function(i, o) {
			$("body").on("edge_" + o[5], function () {
				var to_node_id = o[1];
				var target_node = gq.using(g).find({"element":"node", "id":to_node_id}).nodes()[0];
				run_node(target_node);
			});
		});
        $.each(subscribe_edges, function(i, edge) {
			var from_node_id = edge[0];
			var event_name = edge[3];
			var source_node = gq.using(g).find({"element":"node", "id":from_node_id}).nodes()[0];
			var io = source_node.io;
			$(function(){$(io.selector).on(event_name, function() {
				var to_node_id = edge[1];
				var target_node = gq.using(g).find({"element":"node", "id":to_node_id}).nodes()[0];
				run_node(target_node);
			});});
			
		});
    };
        
})($, gq);

