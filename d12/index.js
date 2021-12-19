const fs = require('fs')
const data = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .map((row) => row.split('-'))

const connections = new Map()

for (const [first, second] of data) {
  if (!connections.get(first)) {
    connections.set(first, new Set())
  }
  if (!connections.get(second)) {
    connections.set(second, new Set())
  }
  connections.get(first).add(second)
  connections.get(second).add(first)
}

const isUpperCase = (str) => str === str.toUpperCase()
const isLowerCase = (str) => str === str.toLowerCase()

const getPaths = (graph) => {
  const paths = []
  DFS('start', paths)

  function DFS(node, paths, visited = []) {
    visited.push(node)

    if (node === 'end') {
      paths.push(visited.join(','))
      return
    }

    const neighbours = graph.get(node)
    for (const neighbour of neighbours) {
      if (isLowerCase(neighbour) && visited.includes(neighbour)) {
        continue
      }
      DFS(neighbour, paths, [...visited])
    }
  }
  return paths
}

function a() {
  const paths = getPaths(connections)
  return paths.length
}

const getPaths2 = (graph) => {
  const paths = []
  DFS('start', paths)

  function DFS(node, paths, visited = [], visitedTwice = false) {
    visited.push(node)

    if (node === 'end') {
      paths.push(visited.join(','))
      return
    }

    const neighbours = graph.get(node)
    for (const neighbour of neighbours) {
      if (neighbour === 'start') {
        continue
      }
      if (isLowerCase(neighbour) && visited.includes(neighbour)) {
        if (visitedTwice) {
          continue
        }
        DFS(neighbour, paths, [...visited], true)
      } else {
        DFS(neighbour, paths, [...visited], visitedTwice)
      }
    }
  }
  return paths
}

function b() {
  const paths = getPaths2(connections)
  return paths.length
}

console.log(a(), b()) // 5212 134862
