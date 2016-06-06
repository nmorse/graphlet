// graphlet to state machine
(function($, gq) {
  var given_graph;
  var make_transitions = function(edges) {
    var trans = {};
    $.each(edges, function(i, o) {
      if (o[4] && o[4].indexOf('function ($scope) {') === 0) {
        trans[o[3]] = o[4]; //eval(o[4]);
      }
      else {
        trans[o[3]] = get_to_node(o);
      }
    });
    return trans;
  };  
  var get_to_node = function(edge) {
    return gq.using(given_graph).find({"element":"node", "id":edge[1]}).nodes()[0].name;
  };
  graphlet2statemachine = {
    "process": function (g) {
      var states ={};
      var trans = {};
      var current_state_name;
      given_graph = g;
      $.each(g.nodes, function(i, o) {
        states[o.name] = o.properties || {};
        if (o.start) {
          current_state_name = o.name;
        }
      });
      $.each(g.nodes, function(i, o) {
        var transition_edges = gq.using(g).find({"element":"edge", "from":o.id}).edges();
        trans[o.name] = make_transitions(transition_edges);
      });
      return {"states":states, "trans":trans, "current_state_name":current_state_name};
    },
    "reverse": function (sm) {
      var out_graph = {nodes:[], edges:[]};
      $.each(sm, function(name, state) {
        out_graph.nodes.push({"name":name});
        $.each(state.trans, function(key, transition) {
          out_graph.edges.push({"from":name, "to":transition, "name":key });
        });
      });
      return out_graph;
    }
  };

})($, gq);


/* example output for use in: 
 *    https://github.com/CloudEngineWorks/angular-simple-statemachine

{
 "states": {
     "start": {},
     "clearing_mind": { "clearing_mind_icon": true },
     "blank_slate": {},
     "thinking": { "thinking": true, "thinking_icon": true },
     "thinking_error": { "bad_idea": true, "need_a_new_idea":true },
     "clearing_mind_error": { "clearing_mind": true, "display_error": true, "enterState": "function () { $timeout(function () { get_clear_mind(); }, 1000); return true; }" }
 },
 "trans": {
     "start": { "init": "clearing_mind" },
     "clearing_mind": { "success": "blank_slate", "fail": "clearing_mind_error" },
     "blank_slate": { "idea": "thinking" },
     "thinking": { "success": "blank_slate", "fail": "thinking_error" },
     "thinking_error": { "idea": "thinking" },
     "clearing_mind_error": { "init": "clearing_mind" }
 },
 "current_state_name": "start",
 "current_state": {}
}
*/