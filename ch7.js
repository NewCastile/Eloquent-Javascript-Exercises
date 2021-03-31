const roads = [
  "Alice's House-Bob's House", "Alice's House-Cabin",
  "Alice's House-Post Office", "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop", "Marketplace-Farm",
  "Marketplace-Post Office", "Marketplace-Shop",
  "Marketplace-Town Hall", "Shop-Town Hall"
];

function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}


var roadGraph = buildGraph(roads);

console.log(roadGraph);

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      console.log(`THIS-OBJECT ${this}`);
      return this;
    } else {
      let parcels = this.parcels.map(p => {
        if (p.place != this.place) return p;
        return {place: destination, address: p.address};
      }).filter(p => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }
}

VillageState.random = function (parcelCount = 3) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({place, address});
  }
  return new VillageState("Post Office", parcels);
};

const randomTest = VillageState.random();
console.log(`${randomTest.place} -- ${randomTest.parcels}`)

function runRobot(state, robot, memory) {
  console.log(`STATE-- ${state.place}, ${state.parcels}`);
  for (let turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

function randomRobot(state) {
  return {direction: randomPick(roadGraph[state.place])};
}

var mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];

function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return {direction: memory[0], memory: memory.slice(1)};
}

function findRoute(graph, from, to) {
  let work = [{at: from, route: []}];
  for (let i = 0; i < work.length; i++) {
    let {at, route} = work[i];
    for (let place of graph[at]) {
      if (place == to) return route.concat(place);
      if (!work.some(w => w.at == place)) {
        work.push({at: place, route: route.concat(place)});
      }
    }
  }
}

function goalOrientedRobot({place, parcels}, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}

let standVillageState = new VillageState(
  'Post Office',
  [{'place': "Daria's House", 'address': "Bob's House"},
  {'place': "Bob's House", 'address': "Alice's House"},
  {'place': "Alice's House", 'address': "Cabin"}]
);

let secondStandVillageState = new VillageState(
  'Post Office',
  [{'place': 'Farm', 'address': "Ernie's House"},
  {'place': "Grete's House", 'address': "Ernie's House"},
  {'place': "Daria's House", 'address': "Bob's House"}]
);

// runRobot(standVillageState, routeRobot, [])
runRobot(VillageState.random(), routeRobot, []);




//MEASURING A ROBOT
function average(array) {
  return array.reduce((a, b) => a + b) / array.length;
}

function compareRobots (...robots) {
  let tasks = [];
  for (let i = 0; i <= 20; i++) {
    tasks.push(VillageState.random());
  }

  for(let robot of robots) {
    let ave = Math.floor(average(tasks.map(t => runRobot(t,  robot, []))));
    console.log(`${robot.name.toUpperCase()}: AVERAGE ${ave}`);
  }
}

compareRobots(routeRobot, goalOrientedRobot);

//PERSISTENT GROUP
class PGroup {
  constructor(array) {
    this.members = array;
  }

  add(element) {
    if (!has(element)) {
      let newPg = new PGroup(this.members.concat(element));
      return newPg.members;
    }
  }

  delete(element) {
    if (has(element)) {
      let newPg = new PGroup(this.members.filter(m => m != element));
      return newPg.members;
    }
  }

  has(element) {
    if (this.members.indexOf(element) != -1) {
      return true;
    }
  }
}

PGroup.empty = new PGroup([]);
