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
