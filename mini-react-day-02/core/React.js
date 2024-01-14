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
  console.log('render....', element, container)
  nextWorkOfUnit = {
    dom: container,
    props: {
      children: [element]
    }
  }
  // const { type } = element
  // const vdom = type === 'TEXT_NODE' ? document.createElement('P') : document.createElement(type)

  // Object.keys(element.props).forEach((key) => {
  //   if (key !== 'children') {
  //     vdom[key] = element.props[key]
  //   }
  // })

  // const children = element.props.children
  // children.forEach((child) => {
  //   render(child, vdom)
  // })

  // container.append(vdom)
}

requestIdleCallback(work)

let taskId = 1
let nextWorkOfUnit = null
function work(deadline) {
  // deadline 上面有一个
  // timeRemaining() 方法，能够获取当前浏览器的剩余空闲时间，单位 ms；
  // 有一个属性 didTimeout，表示是否超时, 用来判断当前的回调函数是否因超时而被执行。
  // console.log(`当前帧剩余时间: ${deadline.timeRemaining()}`)
  if ((deadline.timeRemaining() > 1 || deadline.didTimeout) && nextWorkOfUnit) {
    // 走到这里，说明时间有余，我们就可以在这里写自己的代码逻辑
    console.log('有空闲时间', ++taskId)
    nextWorkOfUnit = performWorkOfUnit(nextWorkOfUnit)
  }
  // 走到这里，说明时间不够了，就让出控制权给主线程，下次空闲时继续调用
  requestIdleCallback(work)
}

function performWorkOfUnit(fiber) {
  if (!fiber.dom) {
    console.log('有节点', fiber, fiber.parent)
    // 1, 创建虚拟dom
    const vdom = (fiber.dom = fiber.type === 'TEXT_NODE' ? document.createElement('P') : document.createElement(fiber.type))

    console.log(vdom)
    // 获取父级容器
    fiber.parent.dom.append(vdom)
    // 2, 复制props
    Object.keys(fiber.props).forEach((key) => {
      if (key !== 'children') {
        console.log(key, fiber.props[key])
        fiber.dom[key] = fiber.props[key]
      }
    })
  }

  // 3, 指针设置
  const children = fiber.props.children
  let prevChild = null
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

  // 4, 返回下一个要执行的任务
  if (fiber.child) {
    return fiber.child
  }

  if (fiber.subLing) {
    return fiber.subLing
  }

  return fiber.parent?.subLing
}

const React = {
  render,
  createElement
}

export default React
