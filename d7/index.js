const fs = require('fs')
const data = fs
  .readFileSync('input.txt', 'utf8')
  .split(',')
  .map(Number)
  .sort((a, b) => a - b)

const min = Math.min(...data)
const max = Math.max(...data)
const sum = data.reduce((acc, curr) => acc + curr, 0)
const avg = sum / data.length || 0
const median = (() => {
  const mid = Math.floor(data.length / 2)
  return data.length % 2 !== 0 ? data[mid] : (data[mid - 1] + data[mid]) / 2
})()

// console.log({ min, max, avg, median, sum })

function a() {
  let distance = 0
  for (let crab of data) {
    distance += Math.abs(median - crab)
  }
  return distance
}

function b() {
  // console.log(Math.floor(avg), Math.round(avg), Math.ceil(avg)) // one of these should work
  const roundedAvg = Math.floor(avg)
  let distance = 0
  for (let crab of data) {
    const n = Math.abs(roundedAvg - crab)
    distance += (n * (n + 1)) / 2 // 1+2+3+...+n = n(n+1)/2
  }
  return distance
}

console.log(a(), b())
