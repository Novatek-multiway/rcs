import { initGlobalState, MicroAppStateActions, registerMicroApps, start } from 'qiankun'

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
        entry: 'http://localhost:8001',
        container: '#app',
        activeRule: getActiveRule('/micro-dashboard'),
        props: {}
      },
      {
        name: 'micro-data-management',
        entry: 'http://localhost:8002',
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
      },

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      afterMount: () => {
        // 子应用挂载后隐藏loading
      }
    }
  )

  start()
}

export default qiankunInit
