// graphlet query
//

(function() {
	var graphlet = {}
    gq = {
		"using": function(g) {

			graphlet = g;
			return this;

		},

		"find": function(sel) {
			var res = {};
			if (sel.element === "node") {
				res.nodes = [];
				$.each(graphlet.nodes, function(i, o) {
					if (sel.id && sel.id === o.id) {
						res.nodes.push(o);
					}
					if (sel.type && o[sel.type]) {
						res.nodes.push(o);
					}
				});
			}
			else if (sel.element === "edge") {
				res.edges = [];
				$.each(graphlet.edges, function(i, o) {
					if ((!sel.type || sel.type === 'all' || o[2] === sel.type) &&
						(!sel.from || o[0] === sel.from) &&
						(!sel.to || o[1] === sel.to)
					) {
						res.edges.push(o);
					}
				});
			}
			graphlet = res;
			return this;
		},
		"edges": function() {
			return graphlet.edges;
		},
		"nodes": function() {
			return graphlet.nodes;
		},
		"graph": function() {
			return graphlet;
		}
	};

})();
