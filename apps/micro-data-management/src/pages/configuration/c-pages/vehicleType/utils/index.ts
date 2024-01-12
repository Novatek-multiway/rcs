export const getVehicleImage = async (imageName: string) => {
  const imageModule = await import(`../../../../../assets/vehicles/${imageName.replace('.png', '')}.png`)
  const imageUrl = imageModule.default

  if (import.meta.env.PROD) return imageUrl
  return imageUrl.startsWith('http') ? imageUrl : import.meta.env.VITE_APP_HOST + imageUrl
}
