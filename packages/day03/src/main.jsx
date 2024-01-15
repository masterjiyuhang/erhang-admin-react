import React from './mini-react-day-03/core/React'
import ReactDOM from './mini-react-day-03/core/ReactDOM'
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

export const App = React.createElement('div', { id: 'app' }, '啦啦啦')
ReactDOM.createRoot(document.getElementById('root')).render(App)
