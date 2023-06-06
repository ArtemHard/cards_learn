import "./App.css"

export default function Example() {
  return <></>
}
const items = [1, 2, 2345, 234, 54, 3, 2, 1]
const sortedItems = items.sort(sorting)
// console.log(sortedItems)
function sorting(a, b) {
  if (a > b) {
    return 1
  }

  if (a < b) {
    return -1
  }
  return 0
}

console.log("Max>>> " + sortedItems[sortedItems.length - 1])
