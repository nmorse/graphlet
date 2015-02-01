// graphlet query
//

(function() {
	var graphlet = {};
  gq = {
		"using": function(g) {

			graphlet = g;
			return this;

		},

		"find": function(sel) {
			var res = {};
			if (!graphlet) {
			  console.log('qg.find has an undefined graphlet.');
			  return res;
			}
			if (sel.element === "node") {
				res.nodes = [];
				$.each(graphlet.nodes, function(i, o) {
					if (sel.id && sel.id === o.id) {
						res.nodes.push(o);
						return false;
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
		},
		// export_hba is for a strange dialect only for arduino
		// or other microprocessor resource starved environments.
		"export_hba": function() {
		  var hba_str = "1_hbumtf_v0\n";
		  if (graphlet.nodes) {
		    hba_str += "nodes:\n";
		    $.each(graphlet.nodes, function(i, n) {
		      var name = "", io_pin = "", data_value = "", process_str = "";
		      if (n.name) {name = n.name.substr(0,9);}
		      if (n.io && n.name) {io_pin = n.io[n.name];}
		      if (n.data && n.name) {data_value = n.data[n.name];}
		      if (n.process) {process_str = n.process[0].substr(0, 15);}

					hba_str += "\t"+ i + "|" + name + "|" + io_pin +
					  "|" + data_value + "|" + process_str + "|\n" ;
				});
		  }
		  if (graphlet.edges) {
		    hba_str += "edges:\n";
		    $.each(graphlet.edges, function(i, e) {
		      var from = 0, to = 0, e_type = "", name = "", guard = "";
		      from = this.node_index(e[0]);
		      to = this.node_index(e[1]);
		      e_type = e[2].substr(0, 3);
		      name = e[3].substr(0, 9);
		      guard = e[4].substr(0, 15);
					hba_str += "\t"+ i + "|" + from + "|" + to +
					  "|" + e_type + "|" + name + "|" + guard + "|\n" ;
				});
		  }
		  hba_str += "0_hbumtf\n";
		  return hba_str;
		},
		"node_index": function(id) {
		  var node_index = -1;
			$.each(graphlet.nodes, function(i, n) {
				if (id === n.id) {
					node_index = i;
				}
			});
			return node_index;
		}

	};

})();
