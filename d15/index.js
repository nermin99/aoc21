const PriorityQueue = require('./PriorityQueue')
const fs = require('fs')
const graph = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .map((row) => row.split('').map(Number))

graph.__proto__.toString = function () {
  return this.map((row) => row.join('') + '\n').join('')
}
const key = (i, j) => `${i},${j}`
const coord = (str) => str.split(',').map(Number)

const getNeighbors = (graph, pos) => {
  const [i, j] = coord(pos)
  const neighbours = []
  const indexes = [
    [i - 1, j], // top
    [i, j + 1], // right
    [i + 1, j], // bottom
    [i, j - 1], // left
  ]

  for (const [i, j] of indexes) {
    const neighbour = graph?.[i]?.[j]
    if (neighbour) {
      neighbours.push({ node: key(i, j), weight: neighbour })
    }
  }
  return neighbours
}

const dijkstra = (graph, start = '0,0') => {
  const distances = {} // shortest distance from the start node.
  const pq = new PriorityQueue()

  for (const i of graph.keys()) {
    for (const j of graph[0].keys()) {
      distances[key(i, j)] = Infinity
    }
  }
  distances[start] = 0
  pq.enqueue(start, 0)

  while (!pq.isEmpty()) {
    const { element: currentNode, priority: currentWeight } = pq.dequeue()

    for (const neighbor of getNeighbors(graph, currentNode)) {
      let alt = distances[currentNode] + neighbor.weight
      if (alt < distances[neighbor.node]) {
        distances[neighbor.node] = alt
        pq.enqueue(neighbor.node, alt)
      }
    }
  }
  return distances
}

function a(graph) {
  const distances = dijkstra(graph)
  const end = key(graph.length - 1, graph[0].length - 1)

  return distances[end]
}

const transpose = (grid) => grid[0].map((_, colIndex) => grid.map((row) => row[colIndex]))

const expandHorizontal = (matrix, times = 5) => {
  const width = matrix[0].length
  const newMatrix = matrix.map((row) => {
    let newRow = [...row]
    for (const _ in [...Array(times - 1)]) {
      newRow = [...newRow, ...newRow.slice(-width).map((n) => (n == 9 ? 1 : n + 1))]
    }
    return newRow
  })
  return newMatrix
}

function b(graph) {
  let matrix = expandHorizontal(graph)
  matrix = transpose(expandHorizontal(transpose(matrix)))

  return a(matrix)
}

console.log(a(graph), b(graph)) // 527 2887
