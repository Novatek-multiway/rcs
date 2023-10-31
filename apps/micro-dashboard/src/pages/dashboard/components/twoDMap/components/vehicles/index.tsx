import Konva from 'konva'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import { Group, Image as KonvaImage } from 'react-konva'

import { useImage } from '../../hooks/useImage'
import Lines, { ILinesProps } from '../lines'

const getVehicleImage = async (imageName: string) => {
  const imageModule = await import(`../../../../../../assets/vehicles/${imageName}.png`)
  return imageModule.default
}
const getVehicleLightImage = async (imageName: string) => {
  const imageModule = await import(`../../../../../../assets/vehicles/lights/${imageName}.png`)
  return imageModule.default
}

export interface IVehicleProps {
  id: number
  x: number
  y: number
  vehicleImageName: string
  vehicleLightImageName: string
  lines?: ILinesProps['lines']
  strokeWidth?: ILinesProps['strokeWidth']
}

const VEHICLE_IMAGE_SIZE = 4
const VEHICLE_LIGHT_IMAGE_SIZE = 8
const LINE_COLORS = ['#55efc4', '#81ecec', '#74b9ff', '#a29bfe', '#ffeaa7', '#fab1a0', '#ff7675', '#fd79a8']

const Vehicle: FC<IVehicleProps> = memo((props) => {
  const { x, y, vehicleImageName, vehicleLightImageName = 'circleBlue', lines = [], strokeWidth } = props
  const [vehicleImagePath, setVehicleImagePath] = useState<string>('')
  const [vehicleLightImagePath, setVehicleLightImagePath] = useState<string>('')
  const vehicleImage = useImage(vehicleImagePath)
  const vehicleImageAspectRatio = useMemo(
    () => (vehicleImage && vehicleImage?.width / vehicleImage?.height) || 1,
    [vehicleImage]
  )

  const vehicleLightImage = useImage(vehicleLightImagePath)
  const vehicleLightImageAspectRatio = useMemo(
    () => (vehicleLightImage && vehicleLightImage?.width / vehicleLightImage?.height) || 1,
    [vehicleLightImage]
  )
  useEffect(() => {
    const setImageExternal = async () => {
      const vehicleImagePath = await getVehicleImage(vehicleImageName)
      setVehicleImagePath(vehicleImagePath)
    }
    setImageExternal()
  }, [vehicleImageName])
  useEffect(() => {
    const setImageExternal = async () => {
      const vehicleLightImagePath = await getVehicleLightImage(vehicleLightImageName)
      setVehicleLightImagePath(vehicleLightImagePath)
    }
    setImageExternal()
  }, [vehicleLightImageName])

  /* -------------------------------- light 旋转 -------------------------------- */
  const vehicleLightImageRef = useRef<Konva.Image>(null)
  useEffect(() => {
    const angularSpeed = 90
    const anim = new Konva.Animation(function (frame) {
      if (vehicleLightImageRef.current) {
        const angleDiff = (frame!.timeDiff * angularSpeed) / 500
        vehicleLightImageRef.current.rotate(angleDiff)
      }
    })

    anim.start()

    return () => {
      anim.stop()
    }
  }, [])
  /* -------------------------------- light 旋转 -------------------------------- */

  const lineStroke = useMemo(() => LINE_COLORS[Math.ceil(Math.random() * LINE_COLORS.length - 1)], [])

  return (
    <Group>
      <Lines lines={lines} stroke={lineStroke} strokeWidth={strokeWidth} />

      <Group x={x} y={y}>
        <KonvaImage
          ref={vehicleLightImageRef}
          perfectDrawEnabled={false}
          image={vehicleLightImage}
          width={VEHICLE_LIGHT_IMAGE_SIZE * vehicleLightImageAspectRatio}
          height={VEHICLE_LIGHT_IMAGE_SIZE}
          offsetX={(VEHICLE_LIGHT_IMAGE_SIZE * vehicleLightImageAspectRatio) / 2}
          offsetY={VEHICLE_LIGHT_IMAGE_SIZE / 2}
        ></KonvaImage>
        <KonvaImage
          perfectDrawEnabled={false}
          image={vehicleImage}
          width={VEHICLE_IMAGE_SIZE * vehicleImageAspectRatio}
          height={VEHICLE_IMAGE_SIZE}
          offsetX={(VEHICLE_IMAGE_SIZE * vehicleImageAspectRatio) / 2}
          offsetY={VEHICLE_IMAGE_SIZE / 2}
        ></KonvaImage>
      </Group>
    </Group>
  )
})

export interface IVehiclesProps {
  vehicles: IVehicleProps[]
  strokeWidth?: IVehicleProps['strokeWidth']
}

const Vehicles: FC<PropsWithChildren<IVehiclesProps>> = (props) => {
  const { vehicles, strokeWidth } = props
  return vehicles.map((vehicle) => <Vehicle key={vehicle.id} strokeWidth={strokeWidth} {...vehicle} />)
}

export default memo(Vehicles)
