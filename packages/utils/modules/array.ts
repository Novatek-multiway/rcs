type TReturnHierarchyArray<T> = ({ [k in keyof T]: string } & { children: T[] })[]

export const createHierarchyFromFlatArray = <T extends Record<string | number | symbol, any>>(
  flatArray: T[],
  key: keyof T
): TReturnHierarchyArray<T> => {
  const map = new Map<string, T[]>()
  const result: TReturnHierarchyArray<T> = []

  flatArray.forEach((item) => {
    const arr = map.get(item[key])
    if (arr) {
      arr.push(item)
    } else {
      map.set(item[key], [item])
    }
  })

  map.forEach((v, k: keyof T) => {
    result.push({ children: v, [key]: k } as TReturnHierarchyArray<T>[0])
  })

  return result
}
