const fs = require('fs')
const data = fs.readFileSync('input.txt', 'utf8').split('\n')

const tuples = data.map((row) => {
  const [from, to] = row.split(' -> ')
  const [x1, y1] = from.split(',').map(Number)
  const [x2, y2] = to.split(',').map(Number)
  return { x1, y1, x2, y2 }
})

function a() {
  const positions = new Map()

  for (const { x1, y1, x2, y2 } of tuples) {
    const dX = Math.abs(x1 - x2)
    const dY = Math.abs(y1 - y2)

    const startX = Math.min(x1, x2)
    const startY = Math.min(y1, y2)

    if (x1 == x2 || y1 == y2) {
      for (let x = startX; x <= startX + dX; x++) {
        for (let y = startY; y <= startY + dY; y++) {
          const key = `${x},${y}`
          let val = positions.get(key) ?? 0
          positions.set(key, val + 1)
        }
      }
    }
  }

  let count = 0
  for (const [, value] of positions) {
    if (value >= 2) {
      count++
    }
  }
  return count
}

function b() {
  const positions = new Map()

  for (const { x1, y1, x2, y2 } of tuples) {
    const dX = Math.abs(x1 - x2)
    const dY = Math.abs(y1 - y2)

    const startX = Math.min(x1, x2)
    const startY = Math.min(y1, y2)

    if (x1 == x2 || y1 == y2) {
      for (let x = startX; x <= startX + dX; x++) {
        for (let y = startY; y <= startY + dY; y++) {
          const key = `${x},${y}`
          let val = positions.get(key) ?? 0
          positions.set(key, val + 1)
        }
      }
    } else if (dX == dY) {
      let startY = startX === x1 ? y1 : y2
      let stopY = startY === y1 ? y2 : y1
      let y = startY
      for (let x = startX; x <= startX + dX; x++) {
        // console.log({ x, y })
        const key = `${x},${y}`
        let val = positions.get(key) ?? 0
        positions.set(key, val + 1)
        y += startY < stopY ? 1 : -1
      }
    }
  }

  // const fillSize = 10
  // const field = Array(fillSize)
  //   .fill('.')
  //   .map((x) => Array(fillSize).fill('.'))
  // for (const [key, value] of positions) {
  //   const [y, x] = key.split(',').map(Number)
  //   field[x][y] = value
  // }

  // const diagram = field.map((row) => row.join(' ') + '\n').join('')
  // console.log(diagram)

  let count = 0
  for (const [, value] of positions) {
    if (value >= 2) {
      count++
    }
  }
  return count
}

console.log(a(), b())
