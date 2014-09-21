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
			var res = [];
			if (sel.element === "node") {
				if (sel.id) {}
				$.each(graphlet.nodes, function(i, o) {
					if (sel.id && sel.id === o.id) {
						res.push(o);
					}
					if (sel.type && sel.type === o.node_type) {
						res.push(o);
					}
				});
			}
			else {
				$.each(graphlet.edges, function(i, o) {
					if (o[2] === sel.type && o[0] === sel.from) {
						res.push(o);
					}
				});
			}
			return res;
		}
	};
    
})();
