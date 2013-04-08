$(function() {
    $().on("save_hbg", function (event, g, overwrite, online_service) {
        var outcome = ["storage not availible", "saved to existing", "did not overwrite existing", "created new", "storage operation submitted"];
        var proposed_name = g.graph.name
        if (typeof Storage !== "undefined") {
            //use local storage
            if(localStorage.hb_graphs[proposed_name]) {
                if (overwrite) {
                    localStorage.hb_graphs[proposed_name] = g;
                    $.trigger("hbg_save_status", [{"outcome": outcome[1], "dest": "local", "final":true}]);
                }
                else {
                    $.trigger("hbg_save_status", [{"outcome": outcome[2], "dest": "local", "final":true}]);
                }
            }
            else {
                localStorage.hb_graphs[proposed_name] = g;
                $.trigger("hbg_save_status", [{"outcome": outcome[3], "dest": "local", "final":true}]);
            }
        }
        else {
            $.trigger("hbg_save_status", [{"outcome": outcome[0], "dest": "local", "final":true}]);
        }
        
        if (navigator.online) {
            if (online_service) {
                //post to service
                $.trigger("hbg_save_status", [{"outcome": outcome[4], "dest": "online", "final":false}]);
            }
            else {
                $.trigger("hbg_save_status", [{"outcome": outcome[0], "dest": "online", "final":true}]);
            }
        }
        else {
            $.trigger("hbg_save_status", [{"outcome": outcome[0], "dest": "online", "final":true}]);
        }
    });

    $().on("hbg_save_status", function(event, arg) {
        alert(arg.outcome+" "+arg.dest+" is_final:"+final);
    });
});
