const fs = require('fs')
const data = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .map((row) => row.split('').map(Number))

const getNeighbours = (i, j) => {
  const top = { val: data?.[i - 1]?.[j], i: i - 1, j }
  const right = { val: data?.[i]?.[j + 1], i, j: j + 1 }
  const bottom = { val: data?.[i + 1]?.[j], i: i + 1, j }
  const left = { val: data?.[i]?.[j - 1], i, j: j - 1 }
  return [top, right, bottom, left]
}

const isLowPoint = (i, j) => {
  return getNeighbours(i, j)
    .filter(({ val }) => val !== undefined)
    .every(({ val }) => val > data[i][j])
}

const getLowPoints = () => {
  const lowPoints = []
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
      if (isLowPoint(i, j)) {
        lowPoints.push({ val: data[i][j], i, j })
      }
    }
  }
  return lowPoints
}

function a() {
  return getLowPoints().reduce((acc, { val }) => acc + val + 1, 0)
}

// BFS
const getBasins = () => {
  const lowPoints = getLowPoints()
  const basins = []

  for (const current of lowPoints) {
    const visited = new Set()
    visited.add([current.i, current.j].toString())
    const queue = []
    queue.push(current)

    while (queue.length > 0) {
      const element = queue.shift()
      const neighbours = getNeighbours(element.i, element.j)

      for (const neighbour of neighbours.values()) {
        const { val, i, j } = neighbour
        const key = [i, j].toString()

        if (!visited.has(key) && val < 9) {
          visited.add(key)
          queue.push(neighbour)
        }
      }
    }
    basins.push(visited)
  }

  basins.sort((a, b) => b.size - a.size)
  return basins
}

function b() {
  const basins = getBasins().slice(0, 3)
  return basins.reduce((acc, { size }) => acc * size, 1)
}

console.log(a(), b())
