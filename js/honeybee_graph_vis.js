var g;
$(function(){
	var raw_nodes = graph.nodes;
	var raw_edges = graph.edges;
	var demoNodes = [];
	var demoEdges = [];
	var i, o, l, id;
    var add_edge_mode = false;
    var add_edge_arr = [];
    
	for (i = 0; i < raw_nodes.length; i++) {
        o = {data:raw_nodes[i]};
        demoNodes.push(o);
    }
    for (i = 0; i < raw_edges.length; i++) {
        l = raw_edges[i][3] || "test";
        id = "e" + (i * 2);
        o = {"data":{"id":id, "content": l, "source": raw_edges[i][0], "target": raw_edges[i][1], "edge_type": raw_edges[i][2], "weight": 20}};
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
                "font-size": 14,
                "shape": "ellipse",
                "border-width": 3,
                "background-color": "#DDD",
                "border-color": "#555",
                "text-valign":"center"
            })
        .selector("node[node_type='input']")
            .css({
                "background-color": "#DFD",
                "border-color": "#8B8",
                "shape": "roundrectangle",
                "width": 80
            })
        .selector("node[node_type='output']")
            .css({
                "background-color": "#FDD",
                "border-color": "#B88",
                "shape": "roundrectangle",
                "width": 80
            })
        .selector("edge")
            .css({
                "content": "data(content)",
                "font-size": 20,
                "text-outline-color": "#FFF",
                "text-outline-width": 0.4,
                "opacity": 0.65,
                "text-opacity": 1.0,
                "text-outline-opacity": 0.5,
                "color": "#000",
                "font-weight": "normal",
                "width": "mapData(weight, 0, 100, 1, 4)",
                "source-arrow-shape": "circle",
                "target-arrow-shape": "triangle",
                "line-color": "#444",
            })
        .selector("edge[edge_type='get']")
            .css({
                "line-color": "#2B2",
                "source-arrow-color": "#2B2",
                "target-arrow-color": "#2B2",
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
        .selector("edge[edge_type='flo']")
            .css({
                "line-color": "#22B",
                "source-arrow-color": "#22B",
                "target-arrow-color": "#22B",
                "source-arrow-shape": "tee",
                "target-arrow-shape": "triangle"
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
        this.on('click', 'node', function(evt){
          if (add_edge_mode) {
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
        ns[0].position({x: pos.x, y: pos.y});
    });
    $('#add_edge').on("click", function() {
        // toggle edge mode
        add_edge_mode = !add_edge_mode;
        if (add_edge_mode) {
            add_edge_arr[0] = null;
            add_edge_arr[1] = null;
        }
    });
    $('#delete_node').on("click", function() {
        var eles = g.elements("node:selected");
        g.remove(eles);
    });
    $('#delete_edge').on("click", function() {
        var eles = g.elements("edge:selected");
        g.remove(eles);
    });
    $('#save').on("click", function() {
        $('#graph_out>pre').text( export_graph_json(g) );
    });
    $("#ui_mode").on('click', function (e) {
        var $btn = $(e.target);
        var id = "", fq = "";
        if (!$btn.hasClass('btn')) { $btn = $btn.closest('.btn');}
        id = $btn.attr("id");
        if (id === "save") {
            $('#edit_mode_ui').hide();
            $('#graph_out').show();
        }
        if (id === "edit") {
            $('#edit_mode_ui').show();
            $('#graph_out').hide();
        }
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
        o = [source, target, data.edge_type, data.content];
        exp_graph_json += "  " + JSON.stringify(o);
    }
    exp_graph_json += '\n ]\n}';
    return exp_graph_json;
}
