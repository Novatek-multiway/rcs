import { useVoerkaI18n, VoerkaI18nProvider } from '@voerkai18n/react'
import { useUpdateEffect } from 'ahooks'
import type { FC, PropsWithChildren } from 'react'
import { memo } from 'react'
import { useGlobalStore } from 'store'

import { i18nScope } from '@/languages'

const LanguageProviderInternal: FC<PropsWithChildren> = (props) => {
  const language = useGlobalStore((state) => state.globalState.language)
  const { changeLanguage } = useVoerkaI18n()

  useUpdateEffect(() => {
    changeLanguage(language)
  }, [language])
  return props.children
}

const LanguageProvider: FC<PropsWithChildren> = (props) => (
  <VoerkaI18nProvider fallback={null} scope={i18nScope}>
    <LanguageProviderInternal children={props.children} />
  </VoerkaI18nProvider>
)

export default memo(LanguageProvider)
