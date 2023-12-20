import { initGlobalState, MicroAppStateActions, registerMicroApps, start } from 'qiankun'
import { useGlobalStore } from 'store'

const getActiveRule = (path: string) => (location: Location) => location.pathname.startsWith(path)

export let globalState = {
  logoTitleClickTime: Date.now(),
  language: localStorage.getItem('language') || 'zh'
}
const actions: MicroAppStateActions = initGlobalState(globalState)

export const updateMicroAppState = (
  updateGlobalState: (oldState: Record<string, any>) => Partial<typeof globalState>
) => {
  const newGlobalState = { ...globalState, ...updateGlobalState(globalState) }
  actions.setGlobalState(newGlobalState)
  globalState = newGlobalState
  useGlobalStore.getState().setGlobalState(newGlobalState)
}

const env = import.meta.env
function qiankunInit() {
  registerMicroApps(
    [
      {
        name: 'micro-dashboard',
        entry: env.DEV ? env.VITE_MODULE_DASHBOARD_ENTRY : env.VITE_MODULE_DASHBOARD_ENTRY,
        container: '#app',
        activeRule: getActiveRule('/micro-dashboard'),
        props: {}
      },
      {
        name: 'micro-data-management',
        entry: env.DEV ? env.VITE_MODULE_DATA_MANAGEMENT_ENTRY : env.VITE_MODULE_DATA_MANAGEMENT_ENTRY,
        container: '#app',
        activeRule: getActiveRule('/micro-data-management'),
        props: {}
      }
    ],
    {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      beforeLoad: () => {
        // 子应用加载时显示loading
        useGlobalStore.getState().setGlobalLoading(true)
      },

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      afterMount: () => {
        // 子应用挂载后隐藏loading
        useGlobalStore.getState().setGlobalLoading(false)
        updateMicroAppState(() => globalState)
      }
    }
  )

  start()
}

export default qiankunInit
