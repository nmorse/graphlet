// graphlet run
// 

(function($, gq) {
    var g;
    // get all values from get edges and return as an object
    var get_all = function(id) {
        var got_obj = {};
        var g = this.g;
        var get_edges = gq.using(g).find({"element":"edge", "type":"get", "from":id}).edges();
        $.each(get_edges, function(i, o) {
			var to_node = o[1];
            var end_node = gq.using(g).find({"element":"node", "id":to_node}).nodes()[0];
            var alias = o[3];
            var name = alias || end_node.name;
            got_obj[name] = end_node.data[name];
        });
        return got_obj;
    };
    var set_all = function(id, result) {
        var set_edges = gq.using(this.g).find({"element":"edge", "type":"set", "from":id}).edges();
        $.each(set_edges, function(i, o) {
            var end_node = graph_selector(this.g, {"element":"node", "id":id, "ordinal":true});
            var name = o.alias | end_node.name | "data";
            this.g.nodes[end_node.ordinal].data[name] = result[name]; 
        });
    }
    var run_node = function(target_node) {
		var get_data = get_all(target_node.id);
		alert(JSON.stringify(target_node.process[0]));
		alert(JSON.stringify(get_data));
		var result = run_node_process(get_data, target_node.process[0]);
		alert(JSON.stringify(get_data));
		alert(JSON.stringify(result));
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

	

    run = function(g) {
        var flo_edges = gq.using(g).find({"element":"edge", "type":"flo"}).edges();
        var io_events = gq.using(g).find({"element":"edge", "type":"evt"}).edges();
        this.g = g;
        $.each(flo_edges, function(i, o) {
			$("body").on("edge_" + o[5], function () {
				var to_node_id = o[1];
				var target_node = gq.using(g).find({"element":"node", "id":to_node_id}).nodes()[0];
				run_node(target_node);
			});
		});
        $.each(io_events, function(i, o) {
			var from_node_id = o[0];
			var target_node = gq.using(g).find({"element":"node", "id":from_node_id}).nodes()[0];
			var io = target_node.io;
			$(function(){$(io.selector).on(io.event, function() {
				var to_node_id = o[1];
				var target_node = gq.using(g).find({"element":"node", "id":to_node_id}).nodes()[0];
				run_node(target_node);
			});});
			
		});
    };
        
})($, gq);

