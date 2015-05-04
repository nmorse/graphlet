(function () {
	var g;
	//var nodes_editor = null;
	g_aux = {"name":""};
	var g_template = "";
	var add_edge_mode = false;
	var add_edge_arr = [];

	var get_one_key = function(obj) {
	  if (obj) {
		  return $.map(obj, function( value, key ) {
			  return key;
		  })[0];
	  }
	  return "";
	};

  var stringify_node = function(nodes, i, graph_views, active_view_index) {
		var data = nodes[i].data();
		var o = $.extend({}, data);
		var pos = nodes[i].position();
		var parent;
		pos.x = Math.round(pos.x);
		pos.y = Math.round(pos.y);
		graph_views[active_view_index].nodes[data.id] = {"position":pos};
		delete o.view;
    if (o.width) {
      graph_views[active_view_index].nodes[data.id].width = o.width;
		  delete o.width;
    }
    if (nodes[i].data().parent) {
      parent = nodes[i].data().parent;
      o['parent'] = parent;
    }
		return JSON.stringify(o);
  };

  // convert a cytoscape_js graph to a graphlet (JSON string) format
	export_graph_json = function (g, options) {
		var nodes = g.nodes();
		var edges = g.edges();
		var exp_graph_json;
		var graph_desc = g.graph || g_aux.graph || {};
		var graph_template = g.template || g_template;
		var active_view_index = g_aux.active_view_index || 0;
		var graph_views = g_aux.views || [];
		var o, data, pos, source, target, spacer = "";

		if (!$.isArray(graph_views)) {
			graph_views = [];
		}

		if (!graph_views[active_view_index]) {
			graph_views[active_view_index] = {"name":"primary"};
		}
		if (!options || !options.separate) {
			graph_desc.template = graph_template;
		}
		exp_graph_json = '{"graph":' + JSON.stringify(graph_desc) + ', "nodes":[';
		graph_views[active_view_index].nodes = {};
    // first record all the nodes that do not have a parent.
		for (i = nodes.length-1; i >= 0; i--) {
		  if (!nodes[i].data().parent) {
  			exp_graph_json += spacer + '\n';
  			spacer = ',';
        exp_graph_json += "  " + stringify_node(nodes, i, graph_views, active_view_index);
		  }
		}
		// second record all nodes that have a parent
		for (i = nodes.length-1; i >= 0; i--) {
		  if (nodes[i].data().parent) {
  			exp_graph_json += spacer + '\n';
  			spacer = ',';
        exp_graph_json += "  " + stringify_node(nodes, i, graph_views, active_view_index);
		  }
		}
		spacer = "";
		exp_graph_json += '\n ],\n "edges":[';
		graph_views[active_view_index].edges = {};
		for (i = 0; i < edges.length; i++) {
			exp_graph_json += spacer + '\n';
			spacer = ',';
			data = edges[i].data();
			source = edges[i].source().id();
			target = edges[i].target().id();
			o = [source, target, data.edge_type, data.name, data.guard, parseInt(data.id.substr(1), 10)];
			//if (options && options.separate) {
			//	graph_views[active_view_index].edges[data.id] = {"width":data.width};
			//	// delete data.width;
			//}
			exp_graph_json += "  " + JSON.stringify(o);
		}
		exp_graph_json += '\n ],\n "views":' + JSON.stringify(graph_views);
		exp_graph_json += '\n}';
		if (options && options.separate) {
			source = JSON.stringify(graph_views);
			return {"graph_json":exp_graph_json, "graph_view":source, "graph_template":graph_template};
		}
		else {
			return exp_graph_json;
		}
	};

	// Prune to Level is a debugging aid for opjects that
	// are too deep or cause a circular reference error in JSON.stringify
	function prune2level(obj, level) {
		var top_obj = {};
		var t;
		$.each(obj, function(key, o) {
			t = typeof obj[key];
			if (t !== "undefined" && t !== "object" && t !== "function") {
				top_obj[key] = obj[key];
			}
			if (level > 1 && t === "object" && obj[key] !== null) {
				top_obj[key] = prune2level(obj[key], level -1);
			}
		});
		return top_obj;
	}

	// convert a stored graphlet into a form that is appropreate for cytoscape.js
	load_hbg = function (graph, graph_designator) {
		var raw_nodes = graph.nodes;
		var raw_edges = graph.edges;
		var demoNodes = [];
		var demoEdges = [];
		var i, o, name, id;
		var source, target;
		var id_mode = "provided";
		var g_desig = graph_designator || {graph: graph.graph.name, view_index: 0};
		var active_view_index = g_desig.view_index || 0;

		if (graph && graph.graph) {
			g_aux.graph = graph.graph;
			g_aux.active_view_index = active_view_index;
			g_aux.views = graph.views;
			g_template = graph.graph.template;
		}
		for (i = 0; i < raw_nodes.length; i++) {
			o = {data:raw_nodes[i]};
			if (o.data.id === undefined) {
				o.id = "n"+i;
				id_mode = "generated";
			}
			demoNodes.push(o);
		}
		for (i = 0; i < raw_edges.length; i++) {
			name = raw_edges[i][3] || "";
			id = "e"+i;
			source = raw_edges[i][0];
			target = raw_edges[i][1];
			if (id_mode === "generated") {
				source = "n"+raw_edges[i][0];
				target = "n"+raw_edges[i][1];
			}

			o = {"data":{"id":id, "name": name, "source": source, "target": target, "edge_type": raw_edges[i][2], "guard": raw_edges[i][4], "weight": 20}};
			demoEdges.push(o);
		}
		// return in a format suitable for loading into cytoscape.js
		return {
		  nodes: demoNodes,
		  edges: demoEdges
		};
	};

  // exposed for the storage of the graph
	get_current_cyto_graph = function () {
		return g;
	};
	get_current_view_index = function () {
		return +g_aux.active_view_index;
	};
	get_current_view_name = function () {
		var i = +g_aux.active_view_index;
		return g_aux.views[i].name;
	};

	// called by during run mode (by the interpretor to highlight the active
	//   element in the graph)
	vis_run_state = function (selector, css_class, duration) {
    var this_edge = g.$(selector);
    this_edge.addClass(css_class);
    setTimeout(function() {this_edge.removeClass(css_class);}, duration);
	};

	vis_node_selected = function (node_id) {
    var the_node = g.$("node[id='"+node_id+"']");
	  return the_node.selected();
	};

  // display the graph using cytoscape.js
	load_cy_graph = function (init_graph) {
		if (g) {
			g.remove(g.elements("node"));
		}
		$('#graph_vis').cytoscape({
		elements: init_graph,
		style: cytoscape.stylesheet()
			.selector("node")
				.css({
					"content": "data(name)",
					"font-size": 16,
					"shape": "ellipse",
					"border-width": 3,
					"background-color": "#E9E2D4",
					"border-color": "#B29E7C",
					"text-valign":"center"
				})
			.selector("node[io]")
				.css({
					"background-color": "#DDE2FF",
					"border-color": "#8890BB",
					"shape": "roundrectangle"
				})
		  .selector("node[width]")
				.css({
					"width": "data(width)"
				})
		  .selector("node[fsa_state]")
				.css({
					"background-color": "#FFDDE2",
					"border-color": "#BB8890",
					"border-width": 6
				})
				.selector("node[fsa_state][[indegree = 0]]")
				.css({
					"background-color": "#E2FFDD",
					"border-color": "#90BB88",
				})
			.selector("edge")
				.css({
					"content": "data(name)",
					"font-size": 16,
					"text-outline-color": "#FFF",
					"text-outline-width": 0.4,
					"font-weight": "normal",
					"opacity": 0.65,
					"text-opacity": 1.0,
					"text-outline-opacity": 0.5,
					"color": "#776655",
					"width": "mapData(weight, 0, 100, 1, 4)",
					"source-arrow-shape": "circle",
					"target-arrow-shape": "triangle",
					"line-color": "#4C412F",
				})
			.selector("edge[edge_type='get']")
				.css({
					"line-color": "#1A1",
					"source-arrow-color": "#1A1",
					"target-arrow-color": "#1A1",
					"source-arrow-shape": "diamond",
					"target-arrow-shape": "triangle"
				})
			.selector("edge[edge_type='set']")
				.css({
					"line-color": "#B22",
					"source-arrow-color": "#B22",
					"target-arrow-color": "#B22",
					"source-arrow-shape": "circle",
					"target-arrow-shape": "triangle"
				})
			.selector("edge[edge_type='flo'], edge[edge_type='sub'], edge[edge_type='pub']")
				.css({
					"line-color": "#12C",
					"source-arrow-color": "#12C",
					"target-arrow-color": "#12C",
					"source-arrow-shape": "tee",
					"target-arrow-shape": "triangle"
				})
			.selector(":selected")
					.css({
						"background-color": "#FF0",
						"line-color": "#FF0"
					})
			.selector(".active_run_node")
				.css({
					"background-color": "#F80",
					"line-color": "#F80"
				})
			.selector(".active_run_get")
				.css({
					"background-color": "#2F2",
					"line-color": "#2F2"
				})
			.selector(".active_run_set")
				.css({
					"background-color": "#F12",
					"line-color": "#F12"
				})
			.selector(".active_run_flo")
				.css({
					"source-arrow-color": "#0AF",
					"target-arrow-color": "#0AF",
					"line-color": "#0AF"
				}),
		ready: function(){
			var eleCount, nodes, edges;
			var i, pos, data, label, key;
			g = $("#graph_vis").cytoscape("get");
			nodes = g.nodes();
			eleCount = nodes.length;
			for (i = 0; i < eleCount; i++) {
				data = nodes[i].data();
				if (data && data.view && data.view.position) {
					pos = data.view.position;
					//alert(pos.x + " " + pos.y);
					nodes[i].position({x: pos.x, y: pos.y});
					if (data.data) {
						if (typeof data.name !== 'undefined'
							&& typeof data.data !== 'undefined'
						  && typeof data.data[data.name] !== 'undefined') {
							label = data.data[data.name];
							nodes[i].css({"content": label});
						}
						else if (typeof data.name === 'undefined' || $.trim(data.name) === '') {
							key = get_one_key(data.data);
							if (key) {
							  label = key + ": " +data.data[key];
							  nodes[i].css({"content": label});
							}
						}
					}
					if (data.io) {
						if (typeof data.name !== 'undefined'
							&& typeof data.io !== 'undefined'
							&& typeof data.io[data.name] !== 'undefined') {
							label = data.io[data.name];
							nodes[i].css({"content": label});
						}
						else if (typeof data.name === 'undefined' || $.trim(data.name) === '') {
							key = get_one_key(data.io);
							if (key) {
							  label = key + ": " +data.io[key];
							  nodes[i].css({"content": label});
							}
						}
					}
					if (data.process) {
						if (typeof data.name === 'undefined' || $.trim(data.name) === '') {
							label = data.process[0];
							nodes[i].css({"content": label});
						}
					}
				}
			}
			edges = g.edges();
			eleCount = edges.length;
			for (i = 0; i < eleCount; i++) {
				data = edges[i].data();
				if (data && data.name) {
					//if (data.name.matches(/{{.+}}/g)) {
					//	label = data.data[data.name];
					//	edges[i].css({"content": label});
					//}
				}
				else {
					// when there is no name, but there is a guard...
					if (data.guard) {
						// set the label to the guard exp for full discosure...
						label = data.guard;
						//edges[i].data.name = label;
						edges[i].css({"content": label});
					}
				}
			}
			this.off('click');
			this.on('click', 'node', function(evt) {
			  var new_edge;
			  if (add_edge_mode) {
					if(!add_edge_arr[0]) {
						add_edge_arr[0] = this.data().id;
						//alert("first node" + node.data().id);
					}
					else {
						add_edge_arr[1] = this.data().id;
						//alert("second node" + node.data().id);
						add_edge_mode = false;
						g.$('*').unselect();
						new_edge = g.add({"edges":[ {"data":{"weight":20, "source":add_edge_arr[0], "target":add_edge_arr[1]}}]});
						new_edge[0].select();
						setTimeout(function() {
							g.$('*').unselect();
							new_edge[0].select();
						}, 50);
					}
			  }
			});
			this.off('select');
			this.on('select', sync_selected);
			//this.on("mouseup", sync_selected);
		  }
		});
	};

	$(function() {

		// jQuery should add this to the API
		// adds options to a select tag from a list.
		$.fn.options = function(l, first_blank) {
			var html_options = '';
			if (first_blank) {
				html_options = '<option value=""></option>\n';
			}
			$.each(l, function(i, o) {
				html_options += "<option value='"+i+"'>" + o + "</option>\n";
			});
			$(this).html(html_options);
		};

		$('#copy_node').off("click");
		$('#copy_node').on("click", function() {
			//alert(g.nodes().length);
		  	var eles = g.elements("node:selected");
		  	var copy, wrapper, cp_json, ns, pos;
			
			cp_json = eles.json();
			copy = $.extend(true, {}, cp_json);
			delete copy.data.id;
			wrapper = {"nodes":[{"data":copy.data}]};
			ns = g.add(wrapper);
			pos = eles.data().view.position;
			ns[0].position({x: pos.x+5, y: pos.y+5});
			setTimeout(function() {
				g.$('*').unselect();
				ns[0].select();
			}, 50);
		});
		$('#add_node').off("click");
		$('#add_node').on("click", function() {
			//alert(g.nodes().length);
			var ns = g.add({"nodes":[ {"data":{"view":{"position":{"x":80,"y":60}}}} ]});
			var d = ns[0].data();
			var pos = d.view.position;
			ns[0].position({x: pos.x, y: pos.y});
			setTimeout(function() {
				g.$('*').unselect();
				ns[0].select();
			}, 50);
		});
		$('#add_edge').off("click");
		$('#add_edge').on("click", function() {
			// toggle edge mode
			add_edge_mode = !add_edge_mode;
			if (add_edge_mode) {
				add_edge_arr[0] = null;
				add_edge_arr[1] = null;
			}
		});
		$('#delete_node').off("click");
		$('#delete_node').on("click", function() {
			var eles = g.elements("node:selected");
			g.remove(eles);
		});
		$('#delete_edge').off("click");
		$('#delete_edge').on("click", function() {
			var eles = g.elements("edge:selected");
			g.remove(eles);
		});
		$("#nav_edit").off('click');
		$("#nav_edit").on('click', function (e) {
			$(document).trigger("edit_mode");
			$("#nav_load").parent().removeClass("active");
			$("#nav_store").parent().removeClass("active");
			$("#nav_edit").parent().addClass("active");
			$("#nav_run").parent().removeClass("active");
		});
		$("#nav_run").off('click');
		$("#nav_run").on('click', function (e) {
			$(document).trigger("run_mode");
			$("#nav_load").parent().removeClass("active");
			$("#nav_store").parent().removeClass("active");
			$("#nav_edit").parent().removeClass("active");
			$("#nav_run").parent().addClass("active");
		});
		//$(document).off("edit_mode");
		$(document).on("edit_mode", function (e) {
			$('#edit_mode_ui').show();
			$('#run_mode_ui').hide();
			$('#graph_in').hide();
			$('#graph_out').hide();
		});
		//$(document).off("run_mode");
		$(document).on("run_mode", function (e) {
			var graph_json_str = export_graph_json(g, {"separate":true}).graph_json;
			$('#run_mode_ui').show();
			$('#edit_mode_ui').hide();
			$('#graph_in').hide();
			$('#graph_out').hide();

			$('#run_step_rate').off('change');
			$('#run_step_rate').on('change', function(){
			  set_step_rate();
			});

			$('#run_step_rate_num').off('change');
			$('#run_step_rate_num').on('change', function(){
			  var milliseconds =  parseInt($('#run_step_rate_num').val() * 1000);
			  $('#run_step_rate').val(milliseconds);
			  set_step_rate();
			});

			$('body').off('run_step_rate_change');
			$('body').on('run_step_rate_change', function(){
			  var seconds = Math.round(parseInt($('#run_step_rate').val(), 10)/100)/10;
			  $('#run_step_rate_num').val(seconds);
			});

			// set the run env.
			init_graphlet(JSON.parse(graph_json_str));
		});
		$('#node_editor').off("update_form");
		$('#node_editor').on("update_form", function(event, nodes_selected) {
			$("#node_input_header>span").text(""+nodes_selected.length);
			nodes_editor.setValue(nodes_selected);
			nodes_editor.off('change');
			nodes_editor.on('change',function() {
				update_graph_nodes(nodes_editor.root.value);
			});
		});
		$("#edge_editor").off("update_form");
		$("#edge_editor").on("update_form", function(event, edges_selected) {
			$("#edge_input_header>span").text(""+edges_selected.length);
			edges_editor.setValue(edges_selected);
			edges_editor.off('change');
			edges_editor.on('change',function() {
				update_graph_edges(edges_editor.root.value);
			});
		});
		$("#view_all").off("click");
		$("#view_all").on("click", function() {
			g.fit();
		});
		$("#view_zoom_1").off("click");
		$("#view_zoom_1").on("click", function() {
			g.zoom({
				level: 1.0,
				position: {"x":200, "y":300}
			});
		});
	});
	// send node data to the cy graph (visualization)
	function update_graph_nodes(nodes) {
		$.each(nodes, function (i, node) {
			var node_id = node["id"];
			var eles = g.elements("node" + "[id='" + node_id + "']");
			var ele = eles[0];
			var new_parent_ele, old_parent_id, new_parent_id = node.parent;
			if (ele) {
				ele.data(node);
				if (ele.parent() && ele.parent().data() && ele.parent().data().id) {
				  old_parent_id = ele.parent().data().id || undefined;
				}
				if (new_parent_id !== old_parent_id) {
				  if (!new_parent_id) {
				    console.log('get rid of parent');
				    eles.move({"parent":null});
				  }
				  else {
				    if (new_parent_id !== '') {
				      console.log('set of parent to '+new_parent_id);
				      eles.move({"parent":new_parent_id});
				    }
				  }
				}
				ele.position({x: node.view.position.x, y: node.view.position.y});
			}
			else {
				alert(node_id + " no ele");
			}
		});
	}

	// send edge data to the cy graph (visualization)
	function update_graph_edges(edges) {
		$.each(edges, function (i, edge) {
			var edge_id = edge["id"];
			var ele = g.elements("edge" + "[id='" + edge_id + "']")[0];
			if (ele) {
				ele.data(edge);
			}
			else {
				alert(edge_id + " no ele");
			}
		});
	}

	function update_graph_ele(event) {
		var node_id = $(this).data("id");
		var ele = g.elements(event.data.ele_type + "[id='" + node_id + "']")[0];
		if (ele) {
			ele.data(event.data.data_field, $(this).val());
		}
		else {
			alert(node_id + " no ele");
		}
	}
	// pull data from cy and trigger the form update events
	function sync_selected(evt) {
		var nodes_selected = [];
		var edges_selected = [];
		var eles = g.elements("node:selected");
		$(document).trigger("edit_mode");
		$.each(eles, function(i, ele){
			// update the view information (position etc.)
			var node_data = ele.data();
			var pos = ele.position();
			pos.x = Math.round(pos.x);
			pos.y = Math.round(pos.y);
			if (!node_data.view) {
				node_data.view = {};
			}
			node_data.view.position = pos;
			nodes_selected.push(node_data);
		});
		$('#node_editor').trigger("update_form", [nodes_selected]);

		// next handle edges
		eles = g.elements("edge:selected");
		$.each(eles, function(i, ele){
			var edge_data = ele.data();
			edges_selected.push(edge_data);
		});
		$("#edge_editor").trigger("update_form", [edges_selected]);
	}

})();
