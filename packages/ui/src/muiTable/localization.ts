import { MRT_Localization } from 'material-react-table'
import { MRT_Localization_EN } from 'material-react-table/locales/en'
import { MRT_Localization_JA } from 'material-react-table/locales/ja'
import { MRT_Localization_KO } from 'material-react-table/locales/ko'
import { MRT_Localization_ZH_HANS } from 'material-react-table/locales/zh-Hans'

class MRTLEmitter {
  private listeners: ((mrtl: MRT_Localization) => void)[] = []
  public subscribe(listener: (mrtl: MRT_Localization) => void) {
    this.listeners.push(listener)
  }
  public unsubscribe(listener: (mrtl: MRT_Localization) => void) {
    this.listeners = this.listeners.filter((l) => l !== listener)
  }
  public emit(mrtl: MRT_Localization) {
    this.listeners.forEach((l) => {
      console.log('🚀 ~ file: localization.ts ~ line 17 ~ MRTLEmitter ~ emit ~ this.listeners', this.listeners)
      return l(mrtl)
    })
  }
}

export const mRTLEmitter = new MRTLEmitter()

export let mRTL: MRT_Localization = MRT_Localization_ZH_HANS
export const setMRTL = (language: string) => {
  switch (language) {
    case 'zh':
      mRTL = MRT_Localization_ZH_HANS
      break
    case 'en':
      mRTL = MRT_Localization_EN
      break
    case 'jp':
      mRTL = MRT_Localization_JA
      break
    case 'kor':
      mRTL = MRT_Localization_KO
      break
    default:
      mRTL = MRT_Localization_ZH_HANS
      break
  }

  mRTLEmitter.emit(mRTL)
}

setMRTL(localStorage.getItem('language') || 'zh')
