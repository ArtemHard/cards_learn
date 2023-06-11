import "./App.css"

export default function Example() {
  return <></>
}
const items = [1, 2, 2345, 234, 54, 3, 2, 1]
function sortingMax(a, b) {
  return b - a
}
function sortingMin(a, b) {
  return a - b
}

// console.log("min " + items.sort(sortingMin)[0])
// console.log("max " + items.sort(sortingMax)[0])

console.log("min " + Math.min(...items))
console.log("max " + Math.max(...items))
