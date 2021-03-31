const {roadGraph} = require('./nodeB.js')

let graph = Object.create(null);

function addEdge(from, to) {
	if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }

var house = [
	"Alice's House",
	"Bob's House",
	"Daria's House",
	"Ernie's House",
	"Grete's House"
];

var public = [
	'Cabin',
	'Post Office',
	'Town Hall',
	'Farm',
	'Shop',
	'Marketplace'
];

function townSplit(graph) {
	houses = {};
	publics = {};
	for (let place in graph) {
		if (public.includes(place)) {
			publics[place] = graph[place];
		} else {
			houses[place] = graph [place];
		}
	}

	console.log(houses);
	console.log(publics);

}

module.exports = {graph, addEdge, townSplit};