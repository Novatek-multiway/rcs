import { registerMicroApps, start } from 'qiankun'

const getActiveRule = (path: string) => (location: Location) => location.pathname.startsWith(path)

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

  start({
    sandbox: {
      experimentalStyleIsolation: true
    }
  })
}

export default qiankunInit
