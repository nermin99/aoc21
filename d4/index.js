const fs = require('fs')
const data = fs.readFileSync('input.txt', 'utf8').split('\n\n')

const drawNumbers = data.shift().split(',').map(Number)

const matrices = data.map((matrix, i) =>
  matrix.split('\n').map((row) =>
    row
      .trim()
      .split(/\s+/)
      .map((nr) => ({ val: Number(nr), marked: false }))
  )
)

function mark(table, nr) {
  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table[0].length; j++) {
      let element = table[i][j]
      if (element.val == nr) {
        table[i][j].marked = true
      }
    }
  }
}

function isBingo(table) {
  const transposed = table[0].map((_, colIndex) =>
    table.map((row) => row[colIndex])
  )
  return (
    table.some((row) => row.every((element) => element.marked)) ||
    transposed.some((row) => row.every((element) => element.marked))
  )
}

const sumUnmarked = (table) =>
  table.reduce((acc, cur) => {
    let sum = cur.reduce((a, c) => {
      if (!c.marked) {
        a += c.val
      }
      return a
    }, 0)
    acc += sum
    return acc
  }, 0)

function a() {
  for (const nr of drawNumbers) {
    for (const [i, table] of matrices.entries()) {
      mark(table, nr)

      if (isBingo(table)) {
        return nr * sumUnmarked(table)
      }
    }
  }
}

function b() {
  const lastWinner = new Map()

  for (const nr of drawNumbers) {
    for (const [i, table] of matrices.entries()) {
      mark(table, nr)

      if (isBingo(table)) {
        if (!lastWinner.has(i)) {
          lastWinner.set(i, { nr, table: JSON.parse(JSON.stringify(table)) })
        }
      }
    }
  }
  const { nr, table } = [...lastWinner.values()].pop()
  return nr * sumUnmarked(table)
}

console.log(a(), b())
