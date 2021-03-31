const {graph, addEdge} = require('./nodeC.js')

function buildGraph(edges) {
  
  for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}


module.exports = {buildGraph};
