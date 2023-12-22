import { useVoerkaI18n } from '@voerkai18n/react'
import { useRequest, useUpdateEffect } from 'ahooks'
import { getDicts } from 'apis'
import { useState } from 'react'
import { useDictStore } from 'store'

// Converts an object with arrays of dictValueI and dictLabel to an object with arrays of value and label
export const dictsTransform = (obj: Record<string, any[]>) => {
  const keys = Object.keys(obj)
  const newDicts: Record<string, { value: number; label: string }[]> = {}
  keys.forEach((key) => {
    newDicts[key] = obj[key].map((item) => ({
      value: item.dictValueI,
      label: item.dictLabel
    }))
  })
  return newDicts
}
const GlobalContext = () => {
  const { setDicts } = useDictStore()
  const { activeLanguage } = useVoerkaI18n()
  console.log('re-render')
  const [ready, setReady] = useState(true)
  useRequest(() => getDicts({}), {
    onSuccess: (res) => {
      if (res.data) {
        setDicts(dictsTransform(res.data))
        setReady(false)
      }
    },
    ready,
    cacheKey: activeLanguage
  })

  useUpdateEffect(() => {
    setReady(true)
  }, [activeLanguage])
  return null
}

export default GlobalContext
