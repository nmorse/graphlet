var g;
$(function(){
	var raw_nodes = graph.nodes;
	var raw_edges = graph.edges;
	var demoNodes = [];
	var demoEdges = [];
	var i, o;
    var add_edge_mode = false;
    var delete_node_mode = false;
    var delete_edge_mode = false;
    var add_edge_arr = [];
    
	for (i = 0; i < raw_nodes.length; i++) {
        o = {data:raw_nodes[i]};
        
        //if (!raw_nodes[i].view) {
        //    o.position = {'x':(i/3)*3, 'y':(i%3)*3};
        //}
        //else {
        //    //alert(raw_nodes[i].view.position.x + " " + raw_nodes[i].view.position.y);
        //    o.data.view = {};
        //    o.data.view.position = raw_nodes[i].view.position;
        //}
        demoNodes.push(o);
    }
    for (i = 0; i < raw_edges.length; i++) {
        o = {data:{id:"e" + (i * 2), source: raw_edges[i][0], target: raw_edges[i][1], edge_type: raw_edges[i][2], weight: 20}};
        demoEdges.push(o);
    }


    $('#graph_vis').cytoscape({
    elements: { 
      nodes: demoNodes,
      edges: demoEdges
    },
    style: cytoscape.stylesheet()
      .selector("node")
			.css({
				"content": "data(id)",
				"shape": "ellipse",
				"border-width": 3,
				"background-color": "#DDD",
				"border-color": "#555"
			})
		.selector("edge")
			.css({
				"width": "mapData(weight, 0, 100, 1, 4)",
				"target-arrow-shape": "triangle",
				"source-arrow-shape": "circle",
				"line-color": "#444",
			})
		.selector(":selected")
			.css({
				"background-color": "#000",
				"line-color": "#000",
                "border-color": "#955",
				"source-arrow-color": "#000",
				"target-arrow-color": "#000"
			})
		.selector(".ui-cytoscape-edgehandles-source")
			.css({
				"border-color": "#5CC2ED",
				"border-width": 3
			})
		.selector(".ui-cytoscape-edgehandles-target, node.ui-cytoscape-edgehandles-preview")
			.css({
				"background-color": "#5CC2ED"
			})
		.selector("edge.ui-cytoscape-edgehandles-preview")
			.css({
				"line-color": "#5CC2ED"
			})
		.selector("node.ui-cytoscape-edgehandles-preview, node.intermediate")
			.css({
				"shape": "rectangle",
				"width": 15,
				"height": 15
			})
    , ready: function(){
      	var nodeCount, nodes;
        var i, pos, data;
        nodes = g.nodes();
        nodeCount = nodes.length;
        for (i = 0; i < nodeCount; i++) {
            data = nodes[i].data();
            if (data && data.view && data.view.position) {
                pos = data.view.position;
                //alert(pos.x + " " + pos.y);
                nodes[i].position({x: pos.x, y: pos.y});
            }
        }
        //alert(nodeCount);
        this.on('position', 'node', function(evt){
          var node = this;
          $('#graph_out>pre').text( 'renderedPosition:' + JSON.stringify(node.renderedPosition()) + ',\nnode.json() --> ' + JSON.stringify(node.json()));
          //node.position(node.renderedPosition());
        });
        this.on('mouseup', 'edge', function(evt){
          $('#graph_out>pre').text( export_graph_json(g));
          if (delete_edge_mode) {
              g.remove(this);
          }
        });
        this.on('mouseup', 'node', function(evt){
          $('#graph_out>pre').text( export_graph_json(g));
          if (delete_node_mode) {
              g.remove(this);
          }
          else if (add_edge_mode) {
            if(!add_edge_arr[0]) {
                add_edge_arr[0] = this.data().id;
                //alert("first node" + node.data().id);
            }
            else {
                add_edge_arr[1] = this.data().id;
                //alert("second node" + node.data().id);
                g.add({"edges":[ {"data":{"source":add_edge_arr[0], "target":add_edge_arr[1]}}]});
                add_edge_mode = false;
            }
          }
        });
      }
    });
    g = $("#graph_vis").cytoscape("get");
    
    $('#add_node').on("click", function() {
        //alert(g.nodes().length);
        var ns = g.add({"nodes":[ {"data":{"view":{"position":{"x":30,"y":30}}}} ]});
        var d = ns[0].data();
        var pos = d.view.position;
        add_edge_mode = false;
        delete_node_mode = false;
        delete_edge_mode = false;
        ns[0].position({x: pos.x, y: pos.y});
    });
    $('#add_edge').on("click", function() {
        // toggle edge mode
        add_edge_mode = !add_edge_mode;
        delete_node_mode = false;
        delete_edge_mode = false;
        if (add_edge_mode) {
            add_edge_arr[0] = null;
            add_edge_arr[1] = null;
        }
    });
    $('#delete_node').on("click", function() {
        // toggle edge mode
        add_edge_mode = false;
        delete_node_mode = !delete_node_mode;
        delete_edge_mode = false;
    });
    $('#delete_edge').on("click", function() {
        // toggle edge mode
        add_edge_mode = false;
        delete_node_mode = false;
        delete_edge_mode = !delete_edge_mode;
    });

});

function export_graph_json(g) {
    var nodes = g.nodes();
    var edges = g.edges();
    var exp_graph_json = '{"nodes":[';
    
    var o, data, pos, source, target, spacer = "";
    for (i = nodes.length-1; i >= 0; i--) {
        exp_graph_json += spacer + '\n';
        spacer = ',';
        data = nodes[i].data();
        o = data;
        pos = nodes[i].renderedPosition();
        o.view = {};
        o.view.position = {'x':pos.x, 'y':pos.y};
        exp_graph_json += "  " + JSON.stringify(o);
    }
    spacer = "";
    exp_graph_json += '\n ],\n "edges":['
    for (i = 0; i < edges.length; i++) {
        exp_graph_json += spacer + '\n';
        spacer = ',';
        data = edges[i].data();
        source = edges[i].source().id();
        target = edges[i].target().id();
        o = [source, target, data.edge_type];
        exp_graph_json += "  " + JSON.stringify(o);
    }
    exp_graph_json += '\n ]\n}';
    return exp_graph_json;
}
