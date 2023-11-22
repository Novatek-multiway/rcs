import { Context } from 'konva/lib/Context'

export interface IPoint {
  x: number
  y: number
}

interface IBezierMakerOptions {
  stroke?: Context['strokeStyle']
  strokeWidth?: Context['lineWidth']
}

export default class BezierMaker {
  ctx: Context | null = null
  options: IBezierMakerOptions = {}

  constructor(context?: Context | null, options?: IBezierMakerOptions) {
    if (context) this.setContext(context)
    if (options) this.options = options
  }

  setContext(context: Context) {
    this.ctx = context
    const { stroke = 'black', strokeWidth = 1 } = this.options
    context.strokeStyle = stroke
    context.lineWidth = strokeWidth
  }

  setOptions(options: IBezierMakerOptions) {
    this.options = options
  }

  // bezier(t: number, controlPoints: IPoint[]) {
  //   //贝塞尔公式调用
  //   let x = 0
  //   let y = 0
  //   const n = controlPoints.length - 1
  //   // eslint-disable-next-line @typescript-eslint/no-this-alias
  //   const self = this
  //   controlPoints.forEach(function (item, index) {
  //     if (!index) {
  //       x += item.x * Math.pow(1 - t, n - index) * Math.pow(t, index)
  //       y += item.y * Math.pow(1 - t, n - index) * Math.pow(t, index)
  //     } else {
  //       x +=
  //         (self.factorial(n) / self.factorial(index) / self.factorial(n - index)) *
  //         item.x *
  //         Math.pow(1 - t, n - index) *
  //         Math.pow(t, index)
  //       y +=
  //         (self.factorial(n) / self.factorial(index) / self.factorial(n - index)) *
  //         item.y *
  //         Math.pow(1 - t, n - index) *
  //         Math.pow(t, index)
  //     }
  //   })
  //   return {
  //     x: x,
  //     y: y
  //   }
  // }

  drawBezier(controlPoints: IPoint[]) {
    if (!this.ctx) throw new Error('Please set context first!')
    //通过控制点算出实时xy值渲染到canvas
    const ctx = this.ctx

    // 设置line样式
    const { stroke = 'black', strokeWidth = 1 } = this.options
    ctx.strokeStyle = stroke
    ctx.lineWidth = strokeWidth

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
      // draw
      controlPoints.forEach((item, index) => {
        if (index && controlPoints) {
          const startX = controlPoints[index - 1].x
          const startY = controlPoints[index - 1].y
          const x = item.x
          const y = item.y
          ctx.beginPath()
          ctx.moveTo(startX, startY)
          ctx.lineTo(x, y)
          ctx.stroke()
        }
      })
    }
  }

  // factorial(num: number): number {
  //   //递归阶乘
  //   if (num <= 1) {
  //     return 1
  //   } else {
  //     return num * this.factorial(num - 1)
  //   }
  // }
}