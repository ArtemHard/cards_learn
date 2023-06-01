import { useEffect, useState } from "react"
import "./App.css"

export default function Example() {
  const [count, setCount] = useState(-1)
  const onClickHandler = () => {
    setCount(5)
  }

  useEffect(() => {
    if (count === 0) {
      alert("ACTION")
      setCount(-1)
    } else if (count > 0) {
      const timer = setInterval(() => {
        setCount((prev) => prev - 1)
        clearInterval(timer)
      }, 1000)
    }
  }, [count])
  return (
    <button onClick={onClickHandler}>
      {count < 0 ? "click ACtion" : `Cancel ${count}`}{" "}
    </button>
  )
}
