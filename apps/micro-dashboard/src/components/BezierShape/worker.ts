import { IPoint } from './BezierMaker'

const factorial = (num: number): number => {
  //递归阶乘
  if (num <= 1) {
    return 1
  } else {
    return num * factorial(num - 1)
  }
}
const bezier = (t: number, controlPoints: IPoint[]) => {
  //贝塞尔公式调用
  let x = 0
  let y = 0
  const n = controlPoints.length - 1
  controlPoints.forEach(function (item, index) {
    if (!index) {
      x += item.x * Math.pow(1 - t, n - index) * Math.pow(t, index)
      y += item.y * Math.pow(1 - t, n - index) * Math.pow(t, index)
    } else {
      x +=
        (factorial(n) / factorial(index) / factorial(n - index)) *
        item.x *
        Math.pow(1 - t, n - index) *
        Math.pow(t, index)
      y +=
        (factorial(n) / factorial(index) / factorial(n - index)) *
        item.y *
        Math.pow(1 - t, n - index) *
        Math.pow(t, index)
    }
  })
  return {
    x: x,
    y: y
  }
}

self.addEventListener(
  'message',
  function (event) {
    const mainThreadData = JSON.parse(event.data)
    if (mainThreadData) {
      const { id, controlPoints } = mainThreadData
      const bezierArr: IPoint[] = []
      // get bezier line
      for (let i = 0; i < 1; i += 0.01) {
        bezierArr.push(bezier(i, controlPoints))
      }
      self.postMessage(
        JSON.stringify({
          id,
          bezierArr
        })
      )
    }
  },
  false
)
