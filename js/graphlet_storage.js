
$(function() {
  var renaming_now = false,
      naming_now = false;
  // mix in a view into the graph (only for nodes at this time)
	var mix_in_view = function(graph, view_index) {
		var view_obj;
    if (!graph.views) {
      graph.views = {"name": "primary"};
      view_index = -1;
    }
		if (view_index < 0) {
			return graph;
		}
		view_obj = graph.views[view_index];
		$.each(graph.nodes, function(i, n) {
			var node_id = n.id;
			n.view = {"position":{"x":50, "y":50}};
			if (view_obj.nodes[node_id]) {
			  n.view.position = view_obj.nodes[node_id].position;
			  if (view_obj.nodes[node_id].width) {
			    n.width = view_obj.nodes[node_id].width;
			  }
			}
		});
		//delete graph.views;
		return graph;
	};
  
  $("#nav_load").on('click', function (e) {
      $('#graph_input_name_n0').options(request_local_storage_names("examples"), "blank_first");
      $('#graph_input_name_n1').options(request_local_storage_names("hb_graphs"), "blank_first");
      $('#graph_input_name_n1').val(g_aux.name);
      $('#edit_mode_ui').hide();
      $('#run_mode_ui').hide();
      $('#graph_in').show();
      $('#graph_out').hide();

			$("#nav_load").parent().addClass("active");
			$("#nav_store").parent().removeClass("active");
			$("#nav_edit").parent().removeClass("active");
			$("#nav_run").parent().removeClass("active");
  });
  $("#nav_store").on('click', function (e) {
      $('#graph_input_name_n2').data("source", request_local_storage_names("hb_graphs"));
      $('#graph_input_name_n2').val(g_aux.name);
      $('#edit_mode_ui').hide();
      $('#run_mode_ui').hide();
      $('#graph_in').hide();
      $('#graph_out').show();

			$("#nav_load").parent().removeClass("active");
			$("#nav_store").parent().addClass("active");
			$("#nav_edit").parent().removeClass("active");
			$("#nav_run").parent().removeClass("active");
  });

  
  // hook up ctl events
  //$(".ui_mode").off('click');
  $(".ui_mode").on('click', function (e) {
    var $btn = $(e.target);
    var id = "", fq = "";
    if (!$btn.hasClass('btn')) { $btn = $btn.closest('.btn');}
    id = $btn.attr("id");
    if (id === "load") {
      $('#graph_input_name_n0').options(request_local_storage_names("examples"), "blank_first");
      $('#graph_input_name_n1').options(request_local_storage_names("hb_graphs"), "blank_first");
      $('#graph_input_name_n1').val(g_aux.name);
      $('#edit_mode_ui').hide();
      $('#run_mode_ui').hide();
      $('#graph_in').show();
      $('#graph_out').hide();
    }
    if (id === "store") {
      $('#graph_input_name_n2').data("source", request_local_storage_names("hb_graphs"));
      $('#graph_input_name_n2').val(g_aux.name);
      $('#edit_mode_ui').hide();
      $('#run_mode_ui').hide();
      $('#graph_in').hide();
      $('#graph_out').show();
    }
  });
    //$('#store').off("click");
    $('#nav_store').on("click", function() {
      var g = get_current_cyto_graph();
      var json = export_graph_json(g);
      $('#graph_out>pre.graphlet_src').text( export_graph_json(g) );
      $('#graph_out>pre.export').text(JSON.stringify(graphlet2statemachine.process(JSON.parse(json))));
    });
    //$('#load_from_text').off("click");
    $('#load_from_text').on("click", function() {
      var s = $('#graph_in>textarea').val();
      var cy_g;
      if (s !== "") {
        cy_g = load_hbg(JSON.parse(s));
        load_cy_graph(cy_g);
      }
    });

    // load
    $(document).off("load_hbg");
    $(document).on("load_hbg", function (event, graph_view, storage_services) {
      var outcome = ["storage not availible", "loaded", "not found", "load operation submitted"];

      $.each(storage_services, function (i, o) {
          var select_hbg;
          if (o === 'local') {
              select_hbg = get_from_local_storage("hb_graphs", graph_view.graph);
              if (graph_view.view_index >= 0) {
                select_hbg = mix_in_view(select_hbg, graph_view.view_index);
              }
          }
          if (o === 'examples') {
              select_hbg = graph_examples[graph_view.graph];
              if (graph_view.view_index >= 0) {
                select_hbg = mix_in_view(select_hbg, graph_view.view_index);
              }
          }
          if (select_hbg) {
              load_cy_graph(load_hbg(select_hbg, graph_view));
              $(document).trigger("hbg_load_status", [{"outcome": outcome[1], "target": "local", "final":true, "path_name":graph_view.graph}]);
              $('#graph_storage').html(o);
              $('#graph_title').html(graph_view.graph);
              g_aux.name = graph_view.graph;
              $('#graph_view>select').options($.map(select_hbg.views||[{"name":"primary"}], function(v,k) {return v.name;}));
              $('#graph_view>select').off('change');
              $('#graph_view>select').on('change', function(event) {
                  var view_index = $('#graph_view>select option').filter(":selected").first().val();
                  $(document).trigger("set_view", [view_index]);
              });
              $('#rename_view').off('click');
              $('#rename_view').on('click', function(event) {
                var view_name;
                renaming_now = !renaming_now;
                if (renaming_now) {
                  view_name = $('#graph_view>select option').filter(":selected").first().text();
                  $('#graph_view>select').hide();
                  $('#graph_view>input').show().focus().val(view_name);
                }
                else { // all done renaming
                  view_name = $('#graph_view>input').val();
                  //$('#graph_view>select[value="'+view_name+'"]').attr('selected', true);
                  $('#graph_view>input').hide();
                  $('#graph_view>select').show();
                  $(document).trigger("rename_current_view", [view_name]);
                }
              });
              $('#new_view').off('click');
              $('#new_view').on('click', function(event) {
                var view_name;
                naming_now = !naming_now;
                if (naming_now) {
                  view_name = $('#graph_view>select option').filter(":selected").first().text();
                  $('#graph_view>select').hide();
                  $('#graph_view>input').show().focus().val(view_name);
                }
                else { // all done renaming
                  view_name = $('#graph_view>input').val();
                  //$('#graph_view>select[value="'+view_name+'"]').attr('selected', true);
                  $('#graph_view>input').hide();
                  $('#graph_view>select').show();
                  $(document).trigger("copy_current_view", [view_name]);
                }
              });
              $('#delete_view').off('click');
              $('#delete_view').on('click', function(event) {
                $(document).trigger("delete_current_view", []);
              });
              return false;
          }
          else if (select_hbg === false) {
              $(document).trigger("hbg_load_status", [{"outcome": outcome[0], "target": "local", "final":true, "path_name":graph_view.graph}]);
          }
          else {
              $(document).trigger("hbg_load_status", [{"outcome": outcome[2], "target": "local", "final":true, "path_name":graph_view.graph}]);
          }

          if (navigator.online) {
              if (o === "online") {
                  //get from service
                  $(document).trigger("hbg_load_status", [{"outcome": outcome[3], "target": "online", "final":false, "path_name":graph_view.graph}]);
              }
              else {
                  $(document).trigger("hbg_load_status", [{"outcome": outcome[0], "target": "online", "final":true, "path_name":graph_view.graph}]);
              }
          }


      });
    });
    // change view
    $(document).off("set_view");
    $(document).on("set_view", function (event, view_index) {
      var json_str = export_graph_json(get_current_cyto_graph());
      var select_hbg = JSON.parse(json_str);
      var graph_view = {"view_index":view_index};
      select_hbg = mix_in_view(select_hbg, view_index);
      load_cy_graph(load_hbg(select_hbg, graph_view));
    });
    $(document).off("rename_current_view");
    $(document).on("rename_current_view", function (event, new_view_name) {
      var json_str = export_graph_json(get_current_cyto_graph());
      var select_hbg = JSON.parse(json_str);
      var current_view_index = get_current_view_index();
      var graph_view = {"view_name":new_view_name, "view_index":current_view_index};
      var current_view_name = get_current_view_name();
      select_hbg.views[current_view_index].name = new_view_name;
      select_hbg = mix_in_view(select_hbg, current_view_index);
      load_cy_graph(load_hbg(select_hbg, graph_view));
      // update the view list
      $('#graph_view>select').options($.map(select_hbg.views||[{"name":"primary"}], function(v,k) {return v.name;}));
      $('#graph_view>select option').filter("[value='"+current_view_index+"']").attr('selected', true);

    });
    $(document).off("copy_current_view");
    $(document).on("copy_current_view", function (event, new_view_name) {
      var json_str = export_graph_json(get_current_cyto_graph());
      var select_hbg = JSON.parse(json_str);
      var current_view_index = get_current_view_index();
      var current_view_name = get_current_view_name();
      var new_view_index = select_hbg.views.length;
      var graph_view = {"view_name":new_view_name, "view_index":new_view_index};
      select_hbg.views.push($.extend(true, {}, select_hbg.views[current_view_index]));
      select_hbg.views[new_view_index].name = new_view_name;
      select_hbg = mix_in_view(select_hbg, new_view_index);
      load_cy_graph(load_hbg(select_hbg, graph_view));
      // update the view list
      $('#graph_view>select').options($.map(select_hbg.views||[{"name":"primary"}], function(v,k) {return v.name;}));
      $('#graph_view>select option').filter("[value='"+new_view_index+"']").attr('selected', true);
    });
    $(document).off("delete_current_view");
    $(document).on("delete_current_view", function (event) {
      var json_str = export_graph_json(get_current_cyto_graph());
      var select_hbg = JSON.parse(json_str);
      var current_view_index = get_current_view_index();
      //var current_view_name; = get_current_view_name();
      var graph_view;
      var new_view_index = 0;
      if (select_hbg.views.length > 1) {
        new_view_index = (current_view_index)? (current_view_index-1): 0;
        select_hbg.views.splice(current_view_index, 1);
        graph_view = {"view_index":new_view_index};
        select_hbg = mix_in_view(select_hbg, new_view_index);
        load_cy_graph(load_hbg(select_hbg, graph_view));
        // update the view list
        $('#graph_view>select').options($.map(select_hbg.views||[{"name":"primary"}], function(v,k) {return v.name;}));
        $('#graph_view>select option').filter("[value='"+new_view_index+"']").attr('selected', true);
      }
    });
    $(document).off("hbg_load_status");
    $(document).on("hbg_load_status", function(event, arg) {
        //alert(arg.outcome+" "+arg.target+" is_final:"+arg.final);
    });

    $('#graph_input_name_n0').off("change");
    $('#graph_input_name_n0').on("change", function(event) {
        var graph_input_name = $('#graph_input_name_n0 option').filter(':selected').first().text();
        var graph_designator = {"graph":graph_input_name, "view_index":0};
        var storage_services = ["examples"];
        $(document).trigger("load_hbg", [graph_designator, storage_services]);
    });
    $('#graph_input_name_n1').off("change");
    $('#graph_input_name_n1').on("change", function(event) {
        var graph_input_name = $('#graph_input_name_n1 option').filter(':selected').first().text();
        var graph_designator = {"graph":graph_input_name, "view_index":0};
        var storage_services = ["local", "online"];
        $(document).trigger("load_hbg", [graph_designator, storage_services]);
    });

    // save
    $(document).off("save_hbg");
    $(document).on("save_hbg", function (event, g, overwrite, online_service) {
        var outcome = ["storage not availible", "saved to existing", "did not overwrite existing", "created new", "storage operation submitted"];
        var proposed_name = g.graph.name;
        var local_hb_graphs;
        if (typeof Storage !== "undefined") {
            //use local storage
            if (!localStorage.hb_graphs) {
                localStorage.hb_graphs = "{}";
            }
            local_hb_graphs = JSON.parse(localStorage.hb_graphs);
            if(local_hb_graphs[proposed_name]) {
                if (overwrite) {
                    local_hb_graphs[proposed_name] = JSON.parse(export_graph_json(get_current_cyto_graph()));
                    localStorage.hb_graphs = JSON.stringify(local_hb_graphs);
                    $(document).trigger("hbg_save_status", [{"outcome": outcome[1], "target": "local", "final":true}]);
                    $('#graph_storage').html("local");
                    $('#graph_title').html(proposed_name);
                    g_aux.name = proposed_name;
                    ///$('#graph_input_name_n1').val(proposed_name);
                    ///$('#graph_input_name_n2').val(proposed_name);
                }
                else {
                    $(document).trigger("hbg_save_status", [{"outcome": outcome[2], "target": "local", "final":true}]);
                }
            }
            else {
                local_hb_graphs[proposed_name] = JSON.parse(export_graph_json(get_current_cyto_graph()));
                localStorage.hb_graphs = JSON.stringify(local_hb_graphs);
                $(document).trigger("hbg_save_status", [{"outcome": outcome[3], "target": "local", "final":true}]);
                $('#graph_storage').html("local");
                $('#graph_title').html(proposed_name);
                g_aux.name = proposed_name;
                ///$('#graph_input_name_n1').val(proposed_name);
                ///$('#graph_input_name_n2').val(proposed_name);
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
    $(document).off("hbg_save_status");
    $(document).on("hbg_save_status", function(event, arg) {
        //alert(arg.outcome+" "+arg.target+" is_final:"+arg.final);
    });
    $('#save_to_storage').off("click");
    $('#save_to_storage').on("click", function(event) {
        var overwrite = true;
        var online_service = null;
        var g = get_current_cyto_graph();
        if (!g.graph) {g.graph = {};}
        g.graph.name = $('#graph_input_name_n2').val();
        $(document).trigger("save_hbg", [g, overwrite, online_service]);
    });
    $(document).off("delete_hbg");
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
    $(document).off("hbg_delete_status");
    $(document).on("hbg_delete_status", function(event, arg) {
        //alert(arg.outcome+" "+arg.target+" is_final:"+arg.final);
    });
    $('#delete_from_storage').off("click");
    $('#delete_from_storage').on("click", function(event) {
        var path_name = $('#graph_input_name_n2').val();
        var online_service = null;

        $(document).trigger("delete_hbg", [path_name, online_service]);
    });

    $('#graph_input_name_n2').data("source", request_local_storage_names("hb_graphs"));

});

// Local Storage functions.
// given the argument (group === 'examples') the preloaded examples are returned.
// otherwise, group is a given name in the localstorage for this browser then any
// local graphs will be returned.
// returns eg. [{"first graph name": ["view 1", "view 2"]}, {"second graph name": ["view name"]}, "older graph with a single hardcoded view"]
function request_local_storage_names(group) {
    var names = [], ls_obj, ls_str,
    graph_names = function(v, k) {
  		return k;
  	};
    if (group === 'examples') {
  		names = $.map(graph_examples, graph_names);
  	}
    else if (typeof Storage !== "undefined") {
        ls_str = localStorage[group];
        if (ls_str) {ls_obj = JSON.parse(ls_str);}
        if (ls_obj) {
            names = $.map(ls_obj, graph_names);
        }
    }
    return names;
}

function get_from_local_storage(group, path_name) {
    var local_hb_graphs;
    if (group === 'examples') {return graph_examples[path_name] || false;}
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
