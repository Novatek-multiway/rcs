/**
 * @description: 获取正确的资源路径，以解决在主应用中资源404
 * @param {string} assetsPath
 * @return {*}
 */
export const getAssetsRightPath = (assetsPath: string) =>
  assetsPath.startsWith('http') ? assetsPath : import.meta.env.VITE_APP_HOST + assetsPath
