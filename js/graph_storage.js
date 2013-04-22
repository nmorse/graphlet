$(function() {
    // load
    $(document).on("load_hbg", function (event, path_name, online_service) {
        var outcome = ["storage not availible", "loaded", "not found", "load operation submitted"];
        var local_hb_graphs;
        if (typeof Storage !== "undefined") {
            //use local storage
            if (!localStorage.hb_graphs) {
                localStorage.hb_graphs = "{}";
            }
            local_hb_graphs = JSON.parse(localStorage.hb_graphs);
            if(local_hb_graphs[path_name]) {
                //g.zoom(local_hb_graphs[path_name].graph.view.zoom_level);
                load_cy_graph(load_hbg(local_hb_graphs[path_name]));
                //g.fit();
                //g.zoom({"level":0.9, "renderedPosition":{"x":300, "y":200}});
                $(document).trigger("hbg_load_status", [{"outcome": outcome[1], "target": "local", "final":true, "path_name":path_name}]);
            }
            else {
                $(document).trigger("hbg_load_status", [{"outcome": outcome[2], "target": "local", "final":true, "path_name":path_name}]);
            }
        }
        else {
            $(document).trigger("hbg_load_status", [{"outcome": outcome[0], "target": "local", "final":true, "path_name":path_name}]);
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
    
    $('#load_from_storage').on("click", function(event) {
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
                }
                else {
                    $(document).trigger("hbg_save_status", [{"outcome": outcome[2], "target": "local", "final":true}]);
                }
            }
            else {
                local_hb_graphs[proposed_name] = JSON.parse(export_graph_json(g));
                localStorage.hb_graphs = JSON.stringify(local_hb_graphs);
                $(document).trigger("hbg_save_status", [{"outcome": outcome[3], "target": "local", "final":true}]);
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
    
    $('#graph_input_name_n2').data("source", request_hbg_names()); 

});

function request_hbg_names () {
    var names = [];
    if (typeof Storage !== "undefined") {
        //use local storage
        if (localStorage.hb_graphs) {
        }
        local_hb_graphs = JSON.parse(localStorage.hb_graphs);
        return $.map(local_hb_graphs, function(v,k){return k;});
    }
    return names;
}
