import { createContext, memo, PropsWithChildren, useEffect, useState } from 'react'

export interface ISystemConfig {
  network: {
    ws_url: string
  }
}

export const SystemConfigContext = createContext<Partial<ISystemConfig>>({})

const SystemConfig: React.FC<
  PropsWithChildren<{
    systemConfigPath?: string
  }>
> = (props) => {
  const { children, systemConfigPath = '' } = props
  const [systemConfig, setSystemConfig] = useState<Partial<ISystemConfig>>({})
  const [isSystemConfigLoaded, setIsSystemConfigLoaded] = useState(false) // 确保system config加载完成再进行组件初始化，防止在传了wsUrl地址的情况下，websocket会进行默认地址和传入的地址两次连接

  useEffect(() => {
    fetch(systemConfigPath + '/config.json')
      .then((res) => res.json())
      .then((data) => {
        if (!data) return console.warn('Faild to load config.json or incorrectly formatted json')

        setSystemConfig(data)
        setIsSystemConfigLoaded(true)
      })
  }, [systemConfigPath])

  return (
    <SystemConfigContext.Provider value={systemConfig}>{isSystemConfigLoaded && children}</SystemConfigContext.Provider>
  )
}

export default memo(SystemConfig)
