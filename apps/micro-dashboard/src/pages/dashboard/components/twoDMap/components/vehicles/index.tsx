import Konva from 'konva'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import { Group, Image as KonvaImage, Rect } from 'react-konva'
import { Html } from 'react-konva-utils'

import { useImage } from '../../hooks/useImage'
import { useTwoDMapStore } from '../../store'
import Lines, { ILinesProps } from '../lines'
import { LINE_COLORS, VEHICLE_IMAGE_SIZE, VEHICLE_LIGHT_IMAGE_SIZE, vehicleColorMap } from './constant'
import { TooltipWrapper } from './style'
import { getPowerColor, getVehicleImage, getVehicleLightImage } from './utils'

export interface IVehicleProps {
  id: number
  x: number
  y: number
  vehicleImageName: string
  vehicleLightImageName: string
  statusName?: string
  battery?: number
  lines?: ILinesProps['lines']
  stroke?: ILinesProps['stroke']
  strokeWidth?: ILinesProps['strokeWidth']
  showImage?: boolean
  showOutline?: boolean
  showLines?: boolean // 是否显示规划路线
  showTooltip?: boolean // 是否显示提示信息
}

const Vehicle: FC<IVehicleProps> = memo((props) => {
  const {
    id,
    x,
    y,
    vehicleImageName,
    vehicleLightImageName = 'circleBlue',
    statusName = '离线',
    battery = 0,
    lines = [],
    stroke,
    strokeWidth,
    showImage = true,
    showOutline = false,
    showLines = true,
    showTooltip = true
  } = props
  const currentScale = useTwoDMapStore((state) => state.currentScale)
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

  const randomStroke = useMemo(() => {
    if (vehicleColorMap.has(id)) {
      return vehicleColorMap.get(id)
    } else {
      const color = LINE_COLORS[Math.ceil(Math.random() * LINE_COLORS.length - 1)]
      vehicleColorMap.set(id, color)
      return color
    }
  }, [id])

  return (
    <Group>
      {showLines && <Lines lines={lines} stroke={stroke ?? randomStroke} strokeWidth={strokeWidth} />}

      <Group x={x} y={y}>
        {showImage && (
          <>
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
          </>
        )}
        {showOutline && (
          <Rect
            perfectDrawEnabled={false}
            image={vehicleImage}
            width={VEHICLE_LIGHT_IMAGE_SIZE}
            height={VEHICLE_LIGHT_IMAGE_SIZE}
            offsetX={VEHICLE_LIGHT_IMAGE_SIZE / 2}
            offsetY={VEHICLE_LIGHT_IMAGE_SIZE / 2}
            stroke={'#00cbca'}
            strokeWidth={0.1}
            fill="transparent"
          />
        )}
        {showTooltip && (
          <Html
            transform
            transformFunc={(attrs) => {
              const scale = Math.max(Math.min(50 / currentScale, 3), 2.5)
              const newAttrs = { ...attrs, scaleX: scale, scaleY: scale }
              return newAttrs
            }}
            divProps={{
              style: {
                zIndex: 9,
                fontSize: '6px',
                touchAction: 'none',
                pointerEvents: 'none',
                userSelect: 'none'
              }
            }}
          >
            <TooltipWrapper>
              <div className="tooltip">
                <div>
                  编号: <span>{id}</span>
                </div>
                <div>
                  状态: <span>{statusName}</span>
                </div>
                <div className="battery">
                  电量: <span style={{ color: getPowerColor(battery) }}>{battery}%</span>
                </div>
              </div>
            </TooltipWrapper>
          </Html>
        )}
      </Group>
    </Group>
  )
})

export interface IVehiclesProps {
  vehicles: IVehicleProps[]
  stroke?: ILinesProps['stroke']
  strokeWidth?: IVehicleProps['strokeWidth']
  showImage?: IVehicleProps['showImage']
  showOutline?: IVehicleProps['showOutline']
  showLines?: IVehicleProps['showLines']
  showTooltip?: IVehicleProps['showTooltip']
}

const Vehicles: FC<PropsWithChildren<IVehiclesProps>> = (props) => {
  const { vehicles, stroke, strokeWidth, showImage, showOutline, showLines, showTooltip } = props
  return vehicles.map((vehicle) => (
    <Vehicle
      key={vehicle.id}
      stroke={stroke}
      strokeWidth={strokeWidth}
      showImage={showImage}
      showOutline={showOutline}
      showLines={showLines}
      showTooltip={showTooltip}
      {...vehicle}
    />
  ))
}

export default memo(Vehicles)
