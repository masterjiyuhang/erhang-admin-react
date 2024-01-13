const createTextNode = (textValue) => {
  return {
    type: 'TEXT_NODE',
    props: {
      innerText: textValue,
      children: []
    }
  }
}

const createElement = (type, props, ...children) => {
  return {
    type,
    props: {
      ...props,
      children: children.map((item) => {
        return typeof item === 'string' ? createTextNode(item) : item
      })
    }
  }
}

const render = (element, container) => {
  const { type } = element
  const vdom = type === 'TEXT_NODE' ? document.createElement('P') : document.createElement(type)

  Object.keys(element.props).forEach((key) => {
    if (key !== 'children') {
      vdom[key] = element.props[key]
    }
  })

  const children = element.props.children
  children.forEach((child) => {
    render(child, vdom)
  })

  container.append(vdom)
}

export const React = {
  render,
  createElement
}
