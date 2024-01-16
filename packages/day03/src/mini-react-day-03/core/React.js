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
      children: children.map((child) => {
        // console.log(child, typeof child === 'string')
        return typeof child === 'string' ? createTextNode(child) : child
      })
    }
  }
}

let startRoot = null
const render = (element, container) => {
  const el = typeof element === 'function' ? element() : element

  // TODO 需要处理没有tag标签时的类型
  // 需要通过 createELement 处理数据的结构
  console.log(el, '🥺🥺🥺', createElement(el.type, el.props, ...el.props.children))

  nextWorkOfUnit = {
    dom: container,
    props: {
      children: [el]
      // children: createElement(el.type, el.props, ...el.props.children)
    }
  }

  startRoot = nextWorkOfUnit
}

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
  fiber.parent.dom.append(fiber.dom)
  commitWork(fiber.child)
  commitWork(fiber.subLing)
}

function createDom(type) {
  // console.log('create dom')
  console.log('🤣🤣🤣🤣 创建虚拟dom', type)

  const pTypeList = ['TEXT_NODE', undefined]
  return pTypeList.includes(type) ? document.createElement('P') : document.createElement(type || 'div')
}

const updateDomProps = (dom, props) => {
  console.log(dom, props, '更新的节点')

  Object.keys(props).forEach((key) => {
    if (key !== 'children') {
      dom[key] = props[key]
    } else if (!Array.isArray(props['children'])) {
      dom.innerText = props['children']
    }
  })
}

function performWorkOfUnit(fiber) {
  if (!fiber.dom) {
    // 1, 创建虚拟dom
    const VDom = (fiber.dom = createDom(fiber.type))

    // 这是为了处理直接写的那种东西
    if (!fiber.props) {
      fiber.props = {
        innerText: '你也不知道是啥吧'
      }
    }
    // 2, 复制props
    updateDomProps(VDom, fiber.props)
  }

  // 3, 指针设置
  initChildren(fiber)

  // 4, 返回下一个要执行的任务
  if (fiber.child) {
    return fiber.child
  }

  if (fiber.subLing) {
    return fiber.subLing
  }

  return fiber.parent?.subLing
}

function initChildren(fiber) {
  const children = fiber.props.children
  let prevChild = null
  console.log('初始化子节点 fiber: ', fiber, children)

  if (Array.isArray(children)) {
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
  } else {
    // fiber.props = Object.assign({}, fiber.props, { innerText: children })
    // console.log(fiber.props, children)
  }
}
requestIdleCallback(work)

const React = {
  render,
  createElement
}

export default React
