const Queue = require("../queue/index.js");

const Stack = require("../stack");

class Dictionary {
  constructor() {
    this.table = {};
  }
  set(key, value) {
    this.table[key] = value;
  }
  get(key) {
    return this.table[key];
  }
}

class Graph {
  constructor() {
    this.isDirected = false;
    this.vertices = []; // 顶点
    this.adjList = new Dictionary(); // 邻边
  }

  addVertex(v) {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v);
      this.adjList.set(v, []);
    }
  }

  addEdge(v, w) {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v);
    }
    if (!this.vertices.includes(w)) {
      this.vertices.push(w);
    }
    this.adjList.get(v).push(w);
    if (!this.isDirected) {
      this.adjList.get(w).push(v);
    }
  }

  getVertices() {
    return this.vertices;
  }
  getAdjList() {
    return this.adjList;
  }

  // breadthFirstSearch(first) {}

  toString() {
    let result = "";

    for (let i = 0; i < this.vertices.length; i++) {
      const vertex = this.vertices[i];
      const adjList = this.adjList.get(vertex);
      result += `${vertex} => ${adjList} \n`;
    }
    return result;
  }
}

function initMark(vertices) {
  const map = {};
  for (let i = 0; i < vertices.length; i++) {
    map[vertices[i]] = false;
  }
  return map;
}

function breadthFirstSearch(graph, startVertex, callback) {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();

  const eachMap = initMark(vertices);
  const queue = new Queue();
  queue.enqueue(startVertex);

  while (!queue.isEmpty()) {
    const u = queue.dequeue();
    const neighbors = adjList.get(u);
    eachMap[u] = true;
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      if (!eachMap[neighbor]) {
        eachMap[neighbor] = true;
        queue.enqueue(neighbor);
      }
    }
    if (typeof callback === "function") {
      callback(u);
    }
  }
}

function breadthFirstSearchPath(graph, firstVertex) {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const eachMap = initMark(vertices);
  const distances = {};
  const predecessors = {};
  const queue = new Queue();
  queue.enqueue(firstVertex);

  for (let i = 0; i < vertices.length; i++) {
    const vertex = vertices[i];
    distances[vertex] = 0;
    predecessors[vertex] = null;
  }

  while (!queue.isEmpty()) {
    const u = queue.dequeue();
    const neighbors = adjList.get(u);
    eachMap[u] = true;

    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      if (!eachMap[neighbor]) {
        eachMap[neighbor] = true;
        distances[neighbor] = distances[u] + 1;
        predecessors[neighbor] = u;

        queue.enqueue(neighbor);
      }
    }
  }

  return {
    distances,
    predecessors,
  };
}

function deapthFirstSearch(graph, callback) {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();

  const eachMap = initMark(vertices);

  for (let i = 0; i < vertices.length; i++) {
    const vertex = vertices[i];
    if (!eachMap[vertex]) {
      deapthFirstSearchVisible(vertex, eachMap, adjList, callback);
    }
  }
}

function deapthFirstSearchVisible(vertex, eachMap, adjList, callback) {
  eachMap[vertex] = true;
  if (typeof callback === "function") {
    callback(vertex);
  }
  const neighbors = adjList.get(vertex);

  for (let i = 0; i < neighbors.length; i++) {
    const neighbor = neighbors[i];
    if (!eachMap[neighbor]) {
      deapthFirstSearchVisible(neighbor, eachMap, adjList, callback);
    }
  }

  // 最深
  // vertex
}

const graph = new Graph();
const myVertices = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
for (let i = 0; i < myVertices.length; i++) {
  graph.addVertex(myVertices[i]);
}
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("A", "D");
graph.addEdge("C", "D");
graph.addEdge("C", "G");
graph.addEdge("D", "G");
graph.addEdge("D", "H");
graph.addEdge("B", "E");
graph.addEdge("B", "F");
graph.addEdge("E", "I");

console.log(graph);
console.log(graph.toString());

console.log("广度优先，breadthFirstSearch：");
breadthFirstSearch(graph, "A", function (node) {
  console.log(node);
});

console.log("breadthFirstSearchPath, 广度优先最短距离和path");
const { distances, predecessors } = breadthFirstSearchPath(graph, "A");

console.log(distances, predecessors);

const fromVertex = myVertices[0];

for (let i = 1; i < myVertices.length; i++) {
  const toVertex = myVertices[i];
  const path = new Stack();

  for (let v = toVertex; v !== fromVertex; v = predecessors[v]) {
    path.push(v);
  }

  path.push(fromVertex);

  let s = path.pop();
  while (!path.isEmpty()) {
    s += `-${path.pop()}`;
  }

  console.log(s);
}

console.log("deapthFirstSearch, 深度优先遍历算法");

deapthFirstSearch(graph, function (vertex) {
  console.log(vertex);
});
