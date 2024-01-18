import React from './core/React.js'

function Counter({ num }) {
  return <div>ATM {num}</div>
}

function App() {
  return (
    <div>
      萨瓦迪卡😄
      <Counter num={10}></Counter>
      <Counter num={20}></Counter>
    </div>
  )
}

export default App
