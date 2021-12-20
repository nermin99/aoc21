const fs = require('fs')
const [input, folds] = fs.readFileSync('input.txt', 'utf8').split('\n\n')

const data = input.split('\n').map((coord) => coord.split(',').map(Number))
const foldMatches = folds.match(/[xy]=\d+/gm)

const copy = (m) => JSON.parse(JSON.stringify(m))

const transpose = (grid) => grid[0].map((_, colIndex) => grid.map((row) => row[colIndex]))

const generateGrid = (coordinates, fill = '#', defaultFill = '.') => {
  // const width = Math.max(...coordinates.flatMap(([x, y]) => x)) + 1
  // const height = Math.max(...coordinates.flatMap(([x, y]) => y)) + 1
  const width = Number(foldMatches.find((str) => str[0] === 'x').split('=')[1]) * 2 + 1
  const height = Number(foldMatches.find((str) => str[0] === 'y').split('=')[1]) * 2 + 1

  const grid = Array(height)
    .fill('')
    .map((_) => Array(width).fill(defaultFill))

  grid.__proto__.toString = function () {
    return this.map((row) => row.join(' ') + '\n').join('')
  }

  for (const [x, y] of coordinates) {
    grid[y][x] = fill
  }
  return grid
}

const merge = (first, second) => {
  const newGrid = first
  for (const [y, row] of second.entries()) {
    for (const [x, colVal] of row.entries()) {
      if (colVal === '#') {
        newGrid[y][x] = colVal
      }
    }
  }
  return newGrid
}

const foldHorizontal = (grid, y) => {
  const _y = grid.length % 2 === 0 ? y : y + 1

  const first = grid.slice(0, y)
  const second = grid.slice(_y)
  const reversed = copy(second).reverse()
  return merge(first, reversed)
}

const foldVertical = (grid, x) => {
  return transpose(foldHorizontal(transpose(grid), x))
}

const countSymbol = (grid, symbol = '#') => {
  let count = 0
  for (const row of grid) {
    for (const val of row) {
      if (val === symbol) count++
    }
  }
  return count
}

function ab() {
  let firstIteration = true
  let grid = generateGrid(data)

  for (const match of foldMatches) {
    let [xy, n] = match.split('=')
    n = Number(n)
    grid = xy === 'y' ? foldHorizontal(grid, n) : foldVertical(grid, n)

    if (firstIteration) {
      console.log('a: ', countSymbol(grid))
      firstIteration = false
    }
  }
  return grid.toString()
}

console.log(ab()) // 684 JRZBLGKH
