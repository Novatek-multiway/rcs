import { useMemo } from 'react'

type TLanguages = 'zh' | 'en' | 'jp' | 'kor'
const longLengthLanguages = ['en', 'jp']
export default function useIsLongLengthLanguage(activeLanguage?: string, customLongLengthLanguages?: TLanguages[]) {
  const isLongLengthLanguage = useMemo(() => {
    return activeLanguage && (customLongLengthLanguages || longLengthLanguages).includes(activeLanguage)
  }, [activeLanguage, customLongLengthLanguages])

  return isLongLengthLanguage
}
