$(function() {
    $(document).on("save_hbg", function (event, g, overwrite, online_service) {
        alert("click");
        var outcome = ["storage not availible", "saved to existing", "did not overwrite existing", "created new", "storage operation submitted"];
        var proposed_name = g.graph.name;
        var local_hb_graphs;
        if (typeof Storage !== "undefined") {
            //use local storage
            alert("use local storage");
            if (!localStorage.hb_graphs) {
                localStorage.hb_graphs = "{}";
            }
            local_hb_graphs = JSON.parse(localStorage.hb_graphs);
            if(local_hb_graphs[proposed_name]) {
                if (overwrite) {
                    local_hb_graphs[proposed_name] = JSON.parse(export_graph_json(g));
                    localStorage.hb_graphs = JSON.stringify(local_hb_graphs);
                    $(document).trigger("hbg_save_status", [{"outcome": outcome[1], "dest": "local", "final":true}]);
                }
                else {
                    $(document).trigger("hbg_save_status", [{"outcome": outcome[2], "dest": "local", "final":true}]);
                }
            }
            else {
                local_hb_graphs[proposed_name] = JSON.parse(export_graph_json(g));
                localStorage.hb_graphs = JSON.stringify(local_hb_graphs);
                $(document).trigger("hbg_save_status", [{"outcome": outcome[3], "dest": "local", "final":true}]);
            }
        }
        else {
            $(document).trigger("hbg_save_status", [{"outcome": outcome[0], "dest": "local", "final":true}]);
        }
        
        if (navigator.online) {
            if (online_service) {
                //post to service
                $(document).trigger("hbg_save_status", [{"outcome": outcome[4], "dest": "online", "final":false}]);
            }
            else {
                $(document).trigger("hbg_save_status", [{"outcome": outcome[0], "dest": "online", "final":true}]);
            }
        }
        else {
            $(document).trigger("hbg_save_status", [{"outcome": outcome[0], "dest": "online", "final":true}]);
        }
    });
    
    $(document).on("hbg_save_status", function(event, arg) {
        alert(arg.outcome+" "+arg.dest+" is_final:"+arg.final);
    });
    
    $('#to_storage').on("click", function(event) {
        var overwrite = false;
        var online_service = null;
        g.graph = {};
        g.graph.name = "test";
        $(document).trigger("save_hbg", [g, overwrite, online_service]);
    });
});
