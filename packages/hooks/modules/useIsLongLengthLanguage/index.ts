import { useVoerkaI18n } from '@voerkai18n/react'
import { useMemo } from 'react'

const longLengthLanguages = ['en', 'jp']
export default function useIsLongLengthLanguage(customLongLengthLanguages?: ('zh' | 'en' | 'jp' | 'kor')[]) {
  const { activeLanguage } = useVoerkaI18n()
  const isLongLengthLanguage = useMemo(() => {
    return activeLanguage && (customLongLengthLanguages || longLengthLanguages).includes(activeLanguage)
  }, [activeLanguage, customLongLengthLanguages])

  return isLongLengthLanguage
}
