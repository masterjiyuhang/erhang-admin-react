import React from './React.js'

const ReactDom = {
  createRoot(container) {
    return {
      render(App) {
        // eslint-disable-next-line react/no-deprecated
        React.render(App, container)
      }
    }
  }
}

export default ReactDom
