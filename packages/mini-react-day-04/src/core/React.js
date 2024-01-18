function createTextNode(textValue) {
  return {
    type: 'TEXT_NODE',
    props: {
      nodeValue: textValue,
      children: []
    }
  }
}

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        const isTextNode = typeof child === 'string' || typeof child === 'number'
        return isTextNode ? createTextNode(child) : child
      })
    }
  }
}

function render(element, container) {
  nextWorkOfUnit = {
    dom: container,
    props: {
      children: [element]
    }
  }

  startRoot = nextWorkOfUnit
}

let startRoot = null
let nextWorkOfUnit = null
function work(deadline) {
  // deadline 上面有一个
  // timeRemaining() 方法，能够获取当前浏览器的剩余空闲时间，单位 ms；
  // 有一个属性 didTimeout，表示是否超时, 用来判断当前的回调函数是否因超时而被执行。
  if ((deadline.timeRemaining() > 1 || deadline.didTimeout) && nextWorkOfUnit) {
    // 走到这里，说明时间有余，我们就可以在这里写自己的代码逻辑
    nextWorkOfUnit = performWorkOfUnit(nextWorkOfUnit)
  }

  if (!nextWorkOfUnit && startRoot) {
    commitRoot()
  }

  // 走到这里，说明时间不够了，就让出控制权给主线程，下次空闲时继续调用
  requestIdleCallback(work)
}

function commitRoot() {
  commitWork(startRoot.child)
  startRoot = null
}

function commitWork(fiber) {
  if (!fiber) return
  let fiberParent = fiber.parent
  while (!fiberParent.dom) {
    fiberParent = fiberParent.parent
  }

  if (fiber.dom) {
    fiberParent.dom.append(fiber.dom)
  }
  commitWork(fiber.child)
  commitWork(fiber.subLing)
}

function createDom(type) {
  // console.log('create dom')

  const pTypeList = ['TEXT_NODE', undefined]
  console.log('🤣🤣🤣🤣 创建虚拟dom', type, pTypeList.includes(type))
  return type === 'TEXT_NODE' ? document.createTextNode('') : document.createElement(type)
}

const updateDomProps = (dom, props) => {
  console.log(dom, props, '更新的节点')

  Object.keys(props).forEach((key) => {
    if (key !== 'children') {
      dom[key] = props[key]
    }
  })
}

function initChildren(fiber, children) {
  let prevChild = null
  console.log(children, 'children')
  children.forEach((child, index) => {
    const newWorker = {
      type: child.type,
      props: child.props,
      child: null,
      parent: fiber,
      subLing: null,
      dom: null
    }

    if (index === 0) {
      fiber.child = newWorker
    } else {
      prevChild.subLing = newWorker
    }
    prevChild = newWorker
  })
}

function updateFunctionComponent(fiber) {
  const children = [fiber.type(fiber.props)]

  initChildren(fiber, children)
}

function updateHostComponent(fiber) {
  if (!fiber.dom) {
    const dom = (fiber.dom = createDom(fiber.type))

    updateDomProps(dom, fiber.props)
  }

  const children = fiber.props.children
  initChildren(fiber, children)
}

function performWorkOfUnit(fiber) {
  const isFunctionComponent = typeof fiber.type === 'function'

  if (isFunctionComponent) {
    updateFunctionComponent(fiber)
  } else {
    updateHostComponent(fiber)
  }

  // 4, 返回下一个要执行的任务
  if (fiber.child) {
    return fiber.child
  }

  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.subLing) return nextFiber.subLing
    nextFiber = nextFiber.parent
  }
}

requestIdleCallback(work)

const React = {
  render,
  createElement
}

export default React
