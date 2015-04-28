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
      given_graph = g;
      $.each(g.nodes, function(i, o) {
        var transition_edges = gq.using(g).find({"element":"edge", "from":o.id}).edges();
        states[o.name] = {};
        states[o.name].trans = make_transitions(transition_edges);
      });
      return {"states":states};
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

/*
{
"states":{
  "unchanged":{
    "trans":{
      "edit": function ($scope) {
        $scope.$parent.tc_previous_content = angular.extend({}, $scope.$parent.content);
        return 'editing';
      },
      "mark_for_removal": "crossout"
    }
  },
  "editing":{
    "trans":{
      "accept": function ($scope) {
        if (angular.equals($scope.$parent.tc_previous_content, $scope.$parent.content)) {
          delete $scope.$parent.tc_previous_content;
          return 'unchanged';
        }
        else {
          return 'changed';
        }
      },
      "revert": function ($scope) {
        $scope.$parent.content = angular.extend({}, $scope.$parent.tc_previous_content);
        $scope.content = $scope.$parent.content;
        delete $scope.$parent.tc_previous_content;
        return 'unchanged';
      }
    }
  },
  "changed":{
    "trans":{
      "edit": "editing",
      "restore_original": function ($scope) {
        $scope.$parent.content = angular.extend({}, $scope.$parent.tc_previous_content);
        $scope.content = $scope.$parent.content;
        delete $scope.$parent.tc_previous_content;
        return 'unchanged';
      }
    }
  },
  "crossout": {
    "trans": {
      "restore_original": "unchanged"
    }
  }
}
*/