const fs = require('fs')
const input = fs.readFileSync('input.txt', 'utf8').split(',').map(Number)

function a() {
  const data = [...input]
  let day = 1

  while (day <= 80) {
    let offsprings = []

    for (let i = 0; i < data.length; i++) {
      const element = data[i]
      if (element === 0) {
        data[i] = 6
        offsprings.push(8)
      } else {
        data[i]--
      }
    }
    data.push(...offsprings)
    day++
  }
  return data.length
}

function b() {
  const data = [...input]
  let day = 1
  let fish = new Map()

  for (let d of data) {
    const key = d
    const val = fish.get(key) ?? 0
    fish.set(key, val + 1)
  }

  while (day <= 256) {
    const newFish = new Map()

    for (let [key, value] of fish) {
      if (key == 0) {
        newFish.set(6, (newFish.get(6) ?? 0) + value)
        newFish.set(8, (newFish.get(8) ?? 0) + value)
      } else {
        const newKey = key - 1
        newFish.set(newKey, (newFish.get(newKey) ?? 0) + value)
      }
    }
    fish = newFish
    day++
  }
  let count = 0
  fish.forEach((val) => (count += val))
  return count
}

console.log(a(), b())
