import { HubConnectionBuilder } from '@microsoft/signalr'
import type { FC, ReactNode } from 'react'
import { memo, useEffect } from 'react'
import { useSignalRStore } from 'store'

interface IProps {
  children?: ReactNode
}

const connection = new HubConnectionBuilder().withUrl('http://120.79.8.215:5200/messagingHub').build()

const SignalR: FC<IProps> = ({ children }) => {
  const { updateLocation, updateDevice } = useSignalRStore((state) => ({
    updateLocation: state.updateLocation,
    updateDevice: state.updateDevice
  }))
  useEffect(() => {
    connection.on('OnLayoutUpdated', function (data) {
      console.log('布局更新通知', data)
    })

    connection.on('OnModelUpdated', function (data) {
      console.log('设备更新通知', data)
      updateDevice(data)
    })

    connection.on('OnLocationUpdated', function (data) {
      console.log('库位更新通知', data)
      updateLocation(data)
    })
    connection.on('OnAlarmCreated', function (data) {
      console.log('告警通知', data)
    })
    connection.on('OnCapacityStatisticCreated', function (data) {
      console.log('库容统计通知', data)
    })
    connection.on('OnLocationStatisticUpdated', function (data) {
      console.log('区域库位统计通知', data)
    })

    connection
      .start()
      .then(function () {
        console.log('连接成功。')
      })
      .catch(function (err) {
        return console.error(err.toString())
      })

    return () => {
      connection.off('OnLayoutUpdated')
      connection.off('OnModelUpdated')
      connection.off('OnLocationUpdated')
      connection.off('OnAlarmCreated')
      connection.off('OnCapacityStatisticCreated')
      connection.off('OnLocationStatisticUpdated')
    }
  }, [updateLocation, updateDevice])
  return children
}

export default memo(SignalR)
