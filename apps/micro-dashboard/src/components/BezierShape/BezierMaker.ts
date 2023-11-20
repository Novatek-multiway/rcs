import { Context } from 'konva/lib/Context'

interface IPoint {
  x: number
  y: number
}

export default class BezierMaker {
  ctx: Context | null = null
  controlPoints: IPoint[] = []
  id: number | null = null
  bezierArrMap = new Map<number, IPoint[]>() // 缓存计算结果

  constructor(
    context: Context,
    controlPoints: IPoint[],
    id: number,
    options: {
      stroke?: Context['strokeStyle']
      strokeWidth?: Context['lineWidth']
    }
  ) {
    const { stroke = 'black', strokeWidth = 1 } = options
    context.strokeStyle = stroke
    context.lineWidth = strokeWidth
    this.ctx = context
    this.controlPoints = controlPoints
    this.id = id
  }

  bezier(t: number) {
    //贝塞尔公式调用
    let x = 0
    let y = 0
    const controlPoints = this.controlPoints
    const n = controlPoints.length - 1
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this
    controlPoints.forEach(function (item, index) {
      if (!index) {
        x += item.x * Math.pow(1 - t, n - index) * Math.pow(t, index)
        y += item.y * Math.pow(1 - t, n - index) * Math.pow(t, index)
      } else {
        x +=
          (self.factorial(n) / self.factorial(index) / self.factorial(n - index)) *
          item.x *
          Math.pow(1 - t, n - index) *
          Math.pow(t, index)
        y +=
          (self.factorial(n) / self.factorial(index) / self.factorial(n - index)) *
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

  drawBezier() {
    if (!this.ctx) throw new Error('Please set context first!')
    if (!this.id) throw new Error('Please set id first!')
    //通过控制点算出实时xy值渲染到canvas
    const ctx = this.ctx
    const controlPoints = this.controlPoints
    const id = this.id
    const bezierArrMap = this.bezierArrMap
    if (controlPoints.length === 2) {
      console.warn('Control nodes should be more then two!')
      const startNode = controlPoints[0]
      const endNode = controlPoints[1]
      ctx.moveTo(startNode.x, startNode.y)
      ctx.lineTo(endNode.x, endNode.y)
      ctx.stroke()
    } else if (controlPoints.length === 3) {
      const startNode = controlPoints[0]
      const ctrlNode = controlPoints[1]
      const endNode = controlPoints[2]
      ctx.beginPath()
      ctx.moveTo(startNode.x, startNode.y)
      ctx.quadraticCurveTo(ctrlNode.x, ctrlNode.y, endNode.x, endNode.y)
      ctx.stroke()
    } else if (controlPoints.length === 4) {
      const startNode = controlPoints[0]
      const ctrlNodeA = controlPoints[1]
      const ctrlNodeB = controlPoints[2]
      const endNode = controlPoints[3]
      ctx.beginPath()
      ctx.moveTo(startNode.x, startNode.y)
      ctx.bezierCurveTo(ctrlNodeA.x, ctrlNodeA.y, ctrlNodeB.x, ctrlNodeB.y, endNode.x, endNode.y)
      ctx.stroke()
    } else {
      let cachedBezierArr = bezierArrMap.get(id)
      if (!cachedBezierArr) {
        const newBezierArr: IPoint[] = []
        for (let i = 0; i < 1; i += 0.01) {
          newBezierArr.push(this.bezier(i))
        }
        bezierArrMap.set(id, newBezierArr)
        cachedBezierArr = newBezierArr
      }

      cachedBezierArr.forEach((item, index) => {
        if (index && cachedBezierArr) {
          const startX = cachedBezierArr[index - 1].x,
            startY = cachedBezierArr[index - 1].y,
            x = item.x,
            y = item.y
          ctx.beginPath()
          ctx.moveTo(startX, startY)
          ctx.lineTo(x, y)
          ctx.stroke()
        }
      })
    }
  }

  factorial(num: number): number {
    //递归阶乘
    if (num <= 1) {
      return 1
    } else {
      return num * this.factorial(num - 1)
    }
  }
}
