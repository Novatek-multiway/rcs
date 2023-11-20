import { initGlobalState, MicroAppStateActions, registerMicroApps, start } from 'qiankun'
import { useGlobalStore } from 'store'

const getActiveRule = (path: string) => (location: Location) => location.pathname.startsWith(path)

const globalState = {
  logoTitleClickTime: Date.now()
}
const actions: MicroAppStateActions = initGlobalState(globalState)

export const updateMicroAppState = (getNewState: (oldState: Record<string, any>) => Partial<typeof globalState>) => {
  const newState = getNewState(globalState)
  actions.setGlobalState(newState)
}

function qiankunInit() {
  registerMicroApps(
    [
      {
        name: 'micro-dashboard',
        entry: import.meta.env.DEV ? 'http://localhost:8001' : 'http://localhost:6991',
        container: '#app',
        activeRule: getActiveRule('/micro-dashboard'),
        props: {}
      },
      {
        name: 'micro-data-management',
        entry: import.meta.env.DEV ? 'http://localhost:8002' : 'http://localhost:6992',
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
      }
    }
  )

  start()
}

export default qiankunInit
