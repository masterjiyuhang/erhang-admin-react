const container = document.querySelector('#root')

console.log(container)

// const vdom = document.createElement('div')
// vdom.id = 'app'

// const appendChild = document.createElement('p')
// appendChild.innerText = 'hello mini react !'

// container.append(vdom)
// vdom.append(appendChild)

// v2

// what's vdom
// dom type
// dom props
// dom children

// // create a vdom demo v2
// const TextTemp = {
//   type: 'TEXT_NODE',
//   props: {
//     nodeValue: 'hello text node ',
//     children: []
//   }
// }
// const vDomTemp = {
//   type: 'div',
//   props: {
//     id: 'app',
//     children: [TextTemp]
//   }
// }

// const vdom = document.createElement(vDomTemp.type)
// vdom.id = vDomTemp.props.id

// const appendChild = document.createElement(TextTemp.type)
// appendChild.innerText = TextTemp.props.nodeValue

// container.append(vdom)
// vdom.append(appendChild)

// create a vdom demo v3
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

// const TextTemp = createTextNode('hello text node v3')
// const vDomTemp = createElement('div', { id: 'app' }, TextTemp)

// const vdom = document.createElement(vDomTemp.type)
// vdom.id = vDomTemp.props.id
// container.append(vdom)

// const appendChild = document.createElement(TextTemp.type)
// appendChild.innerText = TextTemp.props.nodeValue
// vdom.append(appendChild)

// v4 update create child
const TextTemp = createTextNode('hello text node v3')
const vDomTemp = createElement('div', { id: 'app' }, '嗷嗷', TextTemp)

// const vdom = document.createElement(vDomTemp.type)
// vdom.id = vDomTemp.props.id
// container.append(vdom)

// const appendChild = document.createElement(TextTemp.type)
// appendChild.innerText = TextTemp.props.nodeValue
// vdom.append(appendChild)

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

// render(vDomTemp, container)

const ReactDom = {
  createRoot(container) {
    return {
      render(vdom) {
        render(vdom, container)
      }
    }
  }
}
ReactDom.createRoot(container).render(vDomTemp)
