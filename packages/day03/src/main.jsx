import React from './mini-react-day-03/core/React'
import ReactDOM from './mini-react-day-03/core/ReactDOM'
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

export const App = React.createElement('div', { id: 'app' }, '嗷嗷', '啦啦啦')
export const Counter = () => {
  return <h1>Counter</h1>
}
export function App1() {
  return (
    <div id='app'>
      <p>mini react day 03 -1 🍓 </p>
      <p>mini react day 03 -2 🍍 </p>
      <p>mini react day 03 -3 🥔 </p>
      哈哈
    </div>
  )
}
ReactDOM.createRoot(document.getElementById('root1')).render(App1)
