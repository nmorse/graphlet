var g;
var node_form_template = {"tag":"div","id":"node_select_${id}","children":[
    {"tag":"div","class":"control-group","children":[
        {"tag":"label","class":"control-label","for":"node_input_name","html":"Node Name:"},
        {"tag":"div","class":"controls","children":[
            {"tag":"input","id":"node_input_name_${id}","data-id":"${id}","type":"text","class":"input-small node_input_name","placeholder":"Node Name","html":"", "value":"${name}"}
          ]},
        {"tag":"label","class":"control-label","for":"node_input_node_type","html":"Node Type"},
        {"tag":"div","class":"controls","children":[
          {"tag":"select","id":"node_input_node_type_${id}","data-id":"${id}","class":"input-small node_input_node_type","children":[
            {"tag":"option","html":"io"},
            {"tag":"option","html":"process"},
            {"tag":"option","html":"data"}
          ]}
        ]}
      ]}
  ]};
var edge_form_template = {"tag":"div","id":"edge_select_${id}","children":[
    {"tag":"div","class":"control-group","children":[
        {"tag":"label","class":"control-label","for":"edge_input_name_${id}","html":"Name:"},
        {"tag":"div","class":"controls","children":[
            {"tag":"input","id":"edge_input_name_${id}","type":"text","class":"input-small","placeholder":"Name","html":"", "value":"${name}"}
          ]},
        {"tag":"label","class":"control-label","for":"edge_input_edge_type","html":"Edge Type"},
        {"tag":"div","class":"controls","children":[
          {"tag":"select","id":"edge_input_edge_type_${id}","class":"input-small","children":[
            {"tag":"option","html":"get"},
            {"tag":"option","html":"set"},
            {"tag":"option","html":"evt"},
            {"tag":"option","html":"flo"}
          ]}
        ]},
                {"tag":"label","class":"control-label","for":"edge_input_guard_${id}","html":"Edge Guard:"},
        {"tag":"div","class":"controls","children":[
            {"tag":"input","id":"edge_input_guard_${id}","type":"text","class":"input-small","placeholder":"Edge Guard","html":"", "value":"${guard}"}
          ]}

      ]}
  ]};

$(function(){
	var raw_nodes = graph.nodes;
	var raw_edges = graph.edges;
	var demoNodes = [];
	var demoEdges = [];
	var i, o, name, id;
    var add_edge_mode = false;
    var add_edge_arr = [];
    var source, target;
    var id_mode = "provided";
    
	for (i = 0; i < raw_nodes.length; i++) {
        o = {data:raw_nodes[i]};
        if (o.data.id === undefined) {
            o.id = "n"+i;
            id_mode = "generated";
        }
        if (o.data.node_type === undefined && o.data.type !== undefined) {
            o.data.node_type = o.data.type;
        }
        demoNodes.push(o);
    }
    for (i = 0; i < raw_edges.length; i++) {
        name = raw_edges[i][3] || "";
        id = "e" + (i * 2);
        source = raw_edges[i][0];
        target = raw_edges[i][1];
        if (id_mode === "generated") {
            source = "n"+raw_edges[i][0];
            target = "n"+raw_edges[i][1];
        }
        
        o = {"data":{"id":id, "name": name, "source": source, "target": target, "edge_type": raw_edges[i][2], "weight": 20}};
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
                "content": "data(name)",
                "font-size": 16,
                "shape": "ellipse",
                "border-width": 3,
                "background-color": "#DDD",
                "border-color": "#888",
                "text-valign":"center",
                "width": 60
            })
        .selector("node[node_type='io']")
            .css({
                "background-color": "#DDF",
                "border-color": "#88B",
                "shape": "roundrectangle",
                "width": 80
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
                "color": "#000",
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
        .selector("edge[edge_type='flo'], edge[edge_type='evt']")
            .css({
                "line-color": "#22B",
                "source-arrow-color": "#22B",
                "target-arrow-color": "#22B",
                "source-arrow-shape": "tee",
                "target-arrow-shape": "triangle"
            })
        .selector(":selected")
            .css({
                "background-color": "#FF0",
                "line-color": "#FF0",
                "width": "mapData(weight, 0, 100, 3, 6)"
            })
    , ready: function(){
      	var nodeCount, nodes;
        var i, pos, data;
        g = $("#graph_vis").cytoscape("get");
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
        this.on('click', 'node', function(evt) {
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
        this.on('select', sync_selected);
        //this.on("mouseup", sync_selected);
      }
    });
    
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
    
    
    $("#node_input_form").on("update_form", function(event, nodes_selected) {
        //alert(JSON.stringify(nodes_selected, null, " "));
        $("#node_input_header>span").text(""+nodes_selected.length);
        $("#node_input_form").empty();
        $("#node_input_form").json2html(nodes_selected, node_form_template);
        $.each(nodes_selected, function(i, o) {
            $('#node_input_node_type_'+o.id).val(o.node_type);
        });
        $(".node_input_form").on("change", function(event) {
            var node_id = $(this).data("id");
            var ele = g.elements("node[id='"+node_id+"']")[0];
            //alert(node_id + " " + JSON.stringify(ele.data()));
            ele.data().name = $(this).val();
        });
    });
    $("#edge_input_form").on("update_form", function(event, edges_selected) {
        //alert(JSON.stringify(edges_selected, null, " "));
        $("#edge_input_header>span").text(""+edges_selected.length);
        $("#edge_input_form").empty();
        $("#edge_input_form").json2html(edges_selected, edge_form_template);
        $.each(edges_selected, function(i, o) {
            $('#edge_input_edge_type_'+o.id).val(o.edge_type);
        });
    });
});

function sync_selected(evt) {
    var nodes_selected = [];
    var edges_selected = [];
    var eles = g.elements("node:selected");
    $.each(eles, function(i, o){
        nodes_selected.push(o.data());
    });
    //alert(JSON.stringify(nodes_selected, null, " "));
    //alert(JSON.stringify(prune2level(evt, 2), null, " "));
    $("#node_input_form").trigger("update_form", [nodes_selected]);
    eles = g.elements("edge:selected");
    $.each(eles, function(i, o){
        edges_selected.push(o.data());
    });
    $("#edge_input_form").trigger("update_form", [edges_selected]);
}

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
        o = [source, target, data.edge_type, data.name, data.guard];
        exp_graph_json += "  " + JSON.stringify(o);
    }
    exp_graph_json += '\n ]\n}';
    return exp_graph_json;
}

function prune2level(obj, level) {
    var top_obj = {};
    var t;
    for (key in obj) {
        t = typeof obj[key];
        if (t !== "undefined" && t !== "object" && t !== "function") {
            top_obj[key] = obj[key];
        }
        if (level > 1 && t === "object" && obj[key] !== null) {
            top_obj[key] = prune2level(obj[key], level -1);
        }
    }
    return top_obj;
}
