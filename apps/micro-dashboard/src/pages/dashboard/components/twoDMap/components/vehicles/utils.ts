export const getVehicleImage = async (imageName: string) => {
  const imageModule = await import(`../../../../../../assets/vehicles/${imageName}.png`)
  return imageModule.default
}
export const getVehicleLightImage = async (imageName: string) => {
  const imageModule = await import(`../../../../../../assets/vehicles/lights/${imageName}.png`)
  return imageModule.default
}

export const getPowerColor = (power: number) => {
  if (power > 60) {
    return '#31e2c3'
  } else if (power > 20) {
    return '#ff9f43'
  } else {
    return '#ee5253'
  }
}

/**
 * @description: 获取最短旋转距离的旋转角度（如从360 -> 15，防止逆向旋转）
 * @param {number} startAngle 0 - 360
 * @param {number} endAngle 0 - 360
 * @return {*}
 */
let revolutions = 0
export const getShortestRotation = (startAngle: number, endAngle: number) => {
  const diff = endAngle + 360 * revolutions - (startAngle + 360 * revolutions)
  if (diff > 180) {
    revolutions--
  } else if (diff < -180) {
    revolutions++
  }
  return endAngle + 360 * revolutions
}
