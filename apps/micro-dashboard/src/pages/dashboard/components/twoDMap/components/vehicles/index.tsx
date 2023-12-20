import { useVoerkaI18n } from '@voerkai18n/react'
import Konva from 'konva'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Circle, Group, Image as KonvaImage, Rect } from 'react-konva'
import { Html } from 'react-konva-utils'

import { useImage } from '../../hooks/useImage'
import { useTwoDMapStore } from '../../store'
import Lines, { ILinesProps } from '../lines'
import { LINE_COLORS, ROTATION_OFFSET, VEHICLE_LIGHT_IMAGE_SIZE, vehicleColorMap } from './constant'
import { TooltipWrapper } from './style'
import { getPowerColor, getShortestRotation, getVehicleImage, getVehicleLightImage } from './utils'

export interface IVehicleProps {
  id: number
  x: number
  y: number
  vehicleImageName: string
  vehicleLightImageName: string
  outlineWidth?: number // 车辆轮廓宽
  outlineHeight?: number // 车辆轮廓高
  outlineNormalizedCenterX?: number // 轮廓归一化的中心点x
  outlineNormalizedCenterY?: number // 轮廓归一化的中心点y
  statusName?: string
  battery?: number
  angle?: number
  lines?: ILinesProps['lines']
  stroke?: ILinesProps['stroke']
  strokeWidth?: ILinesProps['strokeWidth']
  showImage?: boolean
  showOutline?: boolean
  showLines?: boolean // 是否显示规划路线
  showTooltip?: boolean // 是否显示提示信息
  showBenchmarks?: boolean // 是否显示基准点
}

const Vehicle: FC<IVehicleProps> = memo((props) => {
  const { t } = useVoerkaI18n()
  const {
    id,
    x,
    y,
    vehicleImageName,
    vehicleLightImageName = 'circleBlue',
    outlineHeight = VEHICLE_LIGHT_IMAGE_SIZE,
    outlineWidth = VEHICLE_LIGHT_IMAGE_SIZE,
    outlineNormalizedCenterX = 0.5,
    outlineNormalizedCenterY = 0.5,
    statusName = t('离线'),
    battery = 0,
    angle = 0,
    lines = [],
    stroke,
    strokeWidth,
    showImage = true,
    showOutline = false,
    showLines = true,
    showTooltip = true,
    showBenchmarks = false
  } = props

  const currentScale = useTwoDMapStore((state) => state.currentScale)
  const [vehicleImagePath, setVehicleImagePath] = useState<string>('')
  const [vehicleLightImagePath, setVehicleLightImagePath] = useState<string>('')
  const vehicleImage = useImage(vehicleImagePath)
  const vehicleImageAspectRatio = useMemo(
    () => (vehicleImage && vehicleImage?.width / vehicleImage?.height) || 1,
    [vehicleImage]
  )
  const vehicleSize = useMemo(() => outlineWidth, [outlineWidth])
  const vehicleLightSize = useMemo(() => Math.max(outlineWidth, outlineHeight) * 1.8, [outlineWidth, outlineHeight])

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

  /* ---------------------------------- 车辆运动 ---------------------------------- */
  const carGroupRef = useRef<Konva.Group>(null)
  const carRotateGroupRef = useRef<Konva.Group>(null)
  const [isFirstRender, setIsFirstRender] = useState(true)
  useEffect(() => {
    if (x && y && carGroupRef.current) {
      const carGroup = carGroupRef.current
      const carGroupTween = new Konva.Tween({
        node: carGroup,
        duration: 0.06,
        x,
        y
      })

      if (isFirstRender) {
        carGroup.setPosition({ x, y })
        setIsFirstRender(false)
      } else {
        // 第一次不做动画，否则会跳跃
        carGroupTween.play()
      }

      return () => {
        carGroupTween.destroy()
      }
    }
  }, [x, y, carGroupRef, isFirstRender])

  const [prevAngle, setPrevAngle] = useState(0)
  const getTargetRotation = useCallback((angle: number) => getShortestRotation(prevAngle, angle), [prevAngle])
  useEffect(() => {
    if (angle && carRotateGroupRef.current) {
      const rotation = getTargetRotation(angle)
      setPrevAngle(angle)
      const carRotateGroup = carRotateGroupRef.current

      const carRotateGroupTween = new Konva.Tween({
        node: carRotateGroup,
        duration: 0.06,
        rotation: -rotation + ROTATION_OFFSET
      })

      if (isFirstRender) {
        carRotateGroup && carRotateGroup.rotate(rotation)
        setIsFirstRender(false)
      } else {
        carRotateGroupTween && carRotateGroupTween.play()
      }

      return () => {
        carRotateGroupTween && carRotateGroupTween.destroy()
      }
    }
  }, [angle, isFirstRender, getTargetRotation])
  /* ---------------------------------- 车辆运动 ---------------------------------- */

  return (
    <Group>
      {showLines && <Lines lines={lines} stroke={stroke ?? randomStroke} strokeWidth={strokeWidth} />}

      <Group ref={carGroupRef}>
        <Group
          ref={carRotateGroupRef}
          offsetY={-outlineNormalizedCenterX * outlineWidth}
          offsetX={-outlineNormalizedCenterY * outlineHeight}
        >
          {showImage && (
            <>
              <KonvaImage
                ref={vehicleLightImageRef}
                perfectDrawEnabled={false}
                image={vehicleLightImage}
                width={vehicleLightSize * vehicleLightImageAspectRatio}
                height={vehicleLightSize}
                offsetX={(vehicleLightSize * vehicleLightImageAspectRatio) / 2}
                offsetY={vehicleLightSize / 2}
              ></KonvaImage>
              <KonvaImage
                perfectDrawEnabled={false}
                image={vehicleImage}
                width={vehicleSize * vehicleImageAspectRatio}
                height={vehicleSize}
                offsetX={(vehicleSize * vehicleImageAspectRatio) / 2}
                offsetY={vehicleSize / 2}
              ></KonvaImage>
            </>
          )}

          <Group rotation={-ROTATION_OFFSET}>
            {showOutline && (
              <Rect
                perfectDrawEnabled={false}
                image={vehicleImage}
                width={outlineWidth}
                height={outlineHeight}
                offsetX={outlineWidth / 2}
                offsetY={outlineHeight / 2}
                stroke={'#00cbca'}
                strokeWidth={0.04}
                fill="transparent"
                dash={[0.05, 0.025, 0.05]}
              />
            )}

            {showBenchmarks && (
              <Circle
                width={0.3}
                height={0.3}
                fill="red"
                x={outlineWidth * outlineNormalizedCenterX}
                y={outlineHeight * outlineNormalizedCenterY}
              />
            )}
          </Group>
        </Group>
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
                userSelect: 'none',
                willChange: 'transform'
              }
            }}
          >
            <TooltipWrapper>
              <div className="tooltip">
                <div>
                  {t('编号:')}
                  <span>{id}</span>
                </div>
                <div>
                  {t('状态:')}
                  <span>{statusName}</span>
                </div>
                <div className="battery">
                  {t('电量:')}
                  <span style={{ color: getPowerColor(battery) }}>{battery}%</span>
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
  showBenchmarks?: IVehicleProps['showBenchmarks']
}

const Vehicles: FC<PropsWithChildren<IVehiclesProps>> = (props) => {
  const { vehicles, stroke, strokeWidth, showImage, showOutline, showLines, showTooltip, showBenchmarks } = props
  return vehicles.map((vehicle) => (
    <Vehicle
      key={vehicle.id}
      stroke={stroke}
      strokeWidth={strokeWidth}
      showImage={showImage}
      showOutline={showOutline}
      showLines={showLines}
      showTooltip={showTooltip}
      showBenchmarks={showBenchmarks}
      {...vehicle}
    />
  ))
}

export default memo(Vehicles)
