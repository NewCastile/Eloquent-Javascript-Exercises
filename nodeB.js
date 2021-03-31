const {buildGraph} = require('./nodeA.js')

const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];

var roadGraph = buildGraph(roads);

function paths(place, destiny) {
	if (!(destiny in roadGraph[place])) {
		return `Can't go from ${place} to ${destiny}`;
	}
	return `You can go from ${place} to ${destiny}`;
}

console.log(roadGraph);
module.exports = {roadGraph};