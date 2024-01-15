import React from './React.js'

const ReactDom = {
  createRoot(container) {
    return {
      render(vdom) {
        console.log('渲染的是啥')
        // eslint-disable-next-line react/no-deprecated
        React.render(vdom, container)
      }
    }
  }
}

export default ReactDom
