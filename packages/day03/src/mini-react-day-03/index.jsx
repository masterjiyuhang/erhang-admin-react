import { ReactDOM } from 'react'
import React from 'react'
// import ReactDom from './core/reactDOM.js'
// import React from './core/React.js'

// import Counter from './counter.jsx'

// function Counter() {
//   return (
//     <div>
//       <h1>Counter</h1>
//     </div>
//   )
// }

// requestIdleCallback(work)

// // let taskId = 1
// function work(deadline) {
//   // deadline 上面有一个
//   // timeRemaining() 方法，能够获取当前浏览器的剩余空闲时间，单位 ms；
//   // 有一个属性 didTimeout，表示是否超时, 用来判断当前的回调函数是否因超时而被执行。
//   //   console.log(`当前帧剩余时间: ${deadline.timeRemaining()}`)
//   if (deadline.timeRemaining() > 1 || deadline.didTimeout) {
//     // 走到这里，说明时间有余，我们就可以在这里写自己的代码逻辑
//     // console.log('有空闲时间', taskId++)
//   }
//   // 走到这里，说明时间不够了，就让出控制权给主线程，下次空闲时继续调用
//   requestIdleCallback(work)
// }

// const App = React.createElement('div', { id: 'app' }, '嗷嗷', '啦啦啦')
const App = <div>mini react</div>
ReactDOM.createRoot(document.querySelector('#root')).render(App)
