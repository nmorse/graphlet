var storage_ctl_template = {
    "tag":"div", "id":"ui_mode_1", "class":"btn-group ui_mode", "data-toggle":"buttons-radio", "children":[
        {"tag":"button", "id":"load", "type":"button", "class":"btn btn-primary", "html":"Load"},
        {"tag":"button", "id":"store", "type":"button", "class":"btn btn-primary", "html":"Store"}
    ]
};
var load_graph_template = [
    {"tag":"form", "class":"form-horizontal", "children":[
        {"tag":"div", "class":"control-group", "children":[
            {"tag":"label", "class":"control-label", "for":"node_input_name_n1", "html":"Graph Source:", "children":[
                {"tag":"div", "class":"controls", "children":[
                    {"tag":"select", "id":"graph_input_name_n1"} 
                ]}
            ]}
        ]}
    ]},
    {"tag":"textarea"},
    {"tag":"button", "id":"load_from_text", "type":"button", "class":"btn btn-primary", "html":"Load from Text"}
];
var store_graph_template = [
    {"tag":"form", "class":"form-horizontal", "children":[
        {"tag":"div", "class":"control-group", "children":[
            {"tag":"label", "class":"control-label", "for":"node_input_name_n2", "html":"Graph Name:", "children":[
                {"tag":"div", "class":"controls", "children":[
                    {"tag":"input", "id":"graph_input_name_n2", "type":"text", "data-provide":"typeahead", "data-items":16, "placeholder":"Enter a Name"},
                    {"tag":"button", "id":"save_to_storage", "type":"button", "class":"btn btn-primary", "html":"Save"},
                    {"tag":"button", "id":"delete_from_storage", "type":"button", "class":"btn btn-primary", "html":"Delete"} 
                ]}
            ]}
        ]}
    ]},
    {"tag":"pre"}
];


//                    <="" ="16" data-source="[]"  />

$(function() {

    // Insert the UI
    $("#storage_ctl").json2html({}, storage_ctl_template);
    $("#graph_in").json2html({}, load_graph_template);
    $("#graph_out").json2html({}, store_graph_template);
    // hook up ctl events
    $(".ui_mode").on('click', function (e) {
        var $btn = $(e.target);
        var id = "", fq = "";
        if (!$btn.hasClass('btn')) { $btn = $btn.closest('.btn');}
        id = $btn.attr("id");
        if (id === "load") {
            $('#graph_input_name_n1').options(request_local_storage_names("hb_graphs"));
            $('#graph_input_name_n1').val(g_aux.name);
            $('#edit_mode_ui').hide();
            $('#graph_in').show();
            $('#graph_out').hide();
        }
        if (id === "store") {
            $('#graph_input_name_n2').data("source", request_local_storage_names("hb_graphs"));
            $('#graph_input_name_n2').val(g_aux.name);
            $('#edit_mode_ui').hide();
            $('#graph_in').hide();
            $('#graph_out').show();
        }
    });
    $('#store').on("click", function() {
        $('#graph_out>pre').text( export_graph_json(g) );
    });
    $('#load_from_text').on("click", function() {
        var s = $('#graph_in>textarea').val();
        var cy_g;
        if (s !== "") {
            cy_g = load_hbg(JSON.parse(s));
            load_cy_graph(cy_g);
        }
    });




    // load
    $(document).on("load_hbg", function (event, path_name, online_service) {
        var outcome = ["storage not availible", "loaded", "not found", "load operation submitted"];
        var local_hbg = get_from_local_storage("hb_graphs", path_name);

        if (local_hbg) {
            load_cy_graph(load_hbg(local_hbg));
            $(document).trigger("hbg_load_status", [{"outcome": outcome[1], "target": "local", "final":true, "path_name":path_name}]);
            $('#graph_storage').html("local");
            $('#graph_title').html(path_name);
        }
        else if (local_hbg === false) {
            $(document).trigger("hbg_load_status", [{"outcome": outcome[0], "target": "local", "final":true, "path_name":path_name}]);
        }
        else {
            $(document).trigger("hbg_load_status", [{"outcome": outcome[2], "target": "local", "final":true, "path_name":path_name}]);            
        }
        
        if (navigator.online) {
            if (online_service) {
                //get from service
                $(document).trigger("hbg_load_status", [{"outcome": outcome[3], "target": "online", "final":false, "path_name":path_name}]);
            }
            else {
                $(document).trigger("hbg_load_status", [{"outcome": outcome[0], "target": "online", "final":true, "path_name":path_name}]);
            }
        }
        
    });
    
    $(document).on("hbg_load_status", function(event, arg) {
        //alert(arg.outcome+" "+arg.target+" is_final:"+arg.final);
    });
    
    $('#graph_input_name_n1').on("change", function(event) {
        var path_name = $('#graph_input_name_n1').val();
        var online_service = null;
        $(document).trigger("load_hbg", [path_name, online_service]);
    });
    
    // save
    $(document).on("save_hbg", function (event, g, overwrite, online_service) {
        var outcome = ["storage not availible", "saved to existing", "did not overwrite existing", "created new", "storage operation submitted"];
        var proposed_name = g.graph.name;
        var local_hb_graphs;
        //var zoom_level;
        //g.fit();
        //zoom_level = g.zoom() - 0.1;
        //zoom_level = Math.round(zoom_level*100.0)/100.0
        //g.zoom({"level":zoom_level, "renderedPosition":{"x":300, "y":200}});
        //if (!g.graph.view) {g.graph.view = {};}
        //g.graph.view.zoom_level = zoom_level;
        if (typeof Storage !== "undefined") {
            //use local storage
            if (!localStorage.hb_graphs) {
                localStorage.hb_graphs = "{}";
            }
            local_hb_graphs = JSON.parse(localStorage.hb_graphs);
            if(local_hb_graphs[proposed_name]) {
                if (overwrite) {
                    local_hb_graphs[proposed_name] = JSON.parse(export_graph_json(g));
                    localStorage.hb_graphs = JSON.stringify(local_hb_graphs);
                    $(document).trigger("hbg_save_status", [{"outcome": outcome[1], "target": "local", "final":true}]);
                    $('#graph_storage').html("local");
                    $('#graph_title').html(proposed_name);
                }
                else {
                    $(document).trigger("hbg_save_status", [{"outcome": outcome[2], "target": "local", "final":true}]);
                }
            }
            else {
                local_hb_graphs[proposed_name] = JSON.parse(export_graph_json(g));
                localStorage.hb_graphs = JSON.stringify(local_hb_graphs);
                $(document).trigger("hbg_save_status", [{"outcome": outcome[3], "target": "local", "final":true}]);
                $('#graph_storage').html("local");
                $('#graph_title').html(proposed_name);
            }
        }
        else {
            $(document).trigger("hbg_save_status", [{"outcome": outcome[0], "target": "local", "final":true}]);
        }
        
        if (navigator.online) {
            if (online_service) {
                //post to service
                $(document).trigger("hbg_save_status", [{"outcome": outcome[4], "target": "online", "final":false}]);
            }
            else {
                $(document).trigger("hbg_save_status", [{"outcome": outcome[0], "target": "online", "final":true}]);
            }
        }
    });
    
    $(document).on("hbg_save_status", function(event, arg) {
        alert(arg.outcome+" "+arg.target+" is_final:"+arg.final);
    });
    
    $('#save_to_storage').on("click", function(event) {
        var overwrite = true;
        var online_service = null;
        if (!g.graph) {g.graph = {};}
        g.graph.name = $('#graph_input_name_n2').val();
        $(document).trigger("save_hbg", [g, overwrite, online_service]);
    });
    
    $(document).on("delete_hbg", function (event, path_name, online_service) {
        var outcome = ["storage not availible", "deleted", "graph not found", "error during delete request", "delete operation submitted"];
        var local_hb_graphs;
        if (typeof Storage !== "undefined") {
            //use local storage
            if (!localStorage.hb_graphs) {
                localStorage.hb_graphs = "{}";
            }
            local_hb_graphs = JSON.parse(localStorage.hb_graphs);
            if(local_hb_graphs[path_name]) {
                delete local_hb_graphs[path_name];
                localStorage.hb_graphs = JSON.stringify(local_hb_graphs);
                $(document).trigger("hbg_delete_status", [{"outcome": outcome[1], "target": "local", "final":true}]);
            }
            else {
                $(document).trigger("hbg_delete_status", [{"outcome": outcome[2], "target": "local", "final":true}]);
            }
        }
        else {
            $(document).trigger("hbg_delete_status", [{"outcome": outcome[0], "target": "local", "final":true}]);
        }
        
        if (navigator.online) {
            if (online_service) {
                //post to service
                $(document).trigger("hbg_delete_status", [{"outcome": outcome[4], "target": "online", "final":false}]);
            }
            else {
                $(document).trigger("hbg_delete_status", [{"outcome": outcome[0], "target": "online", "final":true}]);
            }
        }
    });
    
    $(document).on("hbg_delete_status", function(event, arg) {
        alert(arg.outcome+" "+arg.target+" is_final:"+arg.final);
    });
    
    $('#delete_from_storage').on("click", function(event) {
        var path_name = $('#graph_input_name_n2').val();
        var online_service = null;
        
        $(document).trigger("delete_hbg", [path_name, online_service]);
    });
    
    $('#graph_input_name_n2').data("source", request_local_storage_names("hb_graphs")); 

});

// Local Storage functions.
function request_local_storage_names(group) {
    var names = [];
    if (typeof Storage !== "undefined") {
        return $.map(JSON.parse(localStorage[group]), function(v,k){return k;});
    }
    return names;
}

function get_from_local_storage(group, path_name) {
    var local_hb_graphs;
    if (typeof Storage !== "undefined") {
        //use local storage
        if (!localStorage.hb_graphs) {
            localStorage.hb_graphs = "{}";
        }
        local_hb_graphs = JSON.parse(localStorage[group]);
        return local_hb_graphs[path_name];
    }
    else {
        return false;
    }
}
