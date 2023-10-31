// 显示成图片的点位对应图片名称的映射
export const POINT_IMAGE_NAME_MAP: Record<number, string> = {
  2: 'parking', // 待命点
  6: 'charge' // 充点电
}

// 车辆灯光效果
export enum EVehicleLightImageName {
  BLUE = 'circleBlue',
  RED = 'circleRed',
  WHITE = 'circleWhite',
  YELLOW = 'circleYellow'
}
