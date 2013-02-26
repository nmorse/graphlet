$(function(){
	var raw_nodes = graph.nodes;
	var raw_edges = graph.edges;
	var demoNodes = [];
	var demoEdges = [];
	var i, o;
    var g;
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
				"shape": "data(shape)",
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
        this.on('mouseup', 'node', function(evt){
          var node = this;
          var pos = node.renderedPosition();
          //$('#graph_out>pre').text( 'renderedPosition:' + JSON.stringify(node.renderedPosition()));
          $('#graph_out>pre').text( export_graph_json(g));
        });
      }
    });
    g = $("#graph_vis").cytoscape("get");
    

});

function export_graph_json(g) {
    var nodes = g.nodes();
    var edges = g.edges();
    var exp_graph_json = '{"nodes":['
    //'], edges:[]}';
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
        //console.log(o);
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
        //console.log(o);
    }
    exp_graph_json += '\n ]\n}';
    return exp_graph_json;
}
