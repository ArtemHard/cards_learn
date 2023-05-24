import { useState } from "react"
import "./App.css"

export default function Example() {
  const [counter, setCounter] = useState<number>(
    () => {
      console.log("Expensive function")
      return Math.floor(Math.random() * 16)
    }
  )

  const incrBy3 = () => {
    setCounter(counter + 3)
  }

  return (
    <div className="container">
      <h1>Increment By 3</h1>
      <div className="counter-box">
        <span className="large">
          <b>{counter}</b>
        </span>
        <button onClick={incrBy3}>+ 3</button>
      </div>
    </div>
  )
}
