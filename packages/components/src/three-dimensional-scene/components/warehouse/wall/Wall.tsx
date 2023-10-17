import type { FC } from 'react'
import React, { memo, useMemo } from 'react'
import { BoxGeometry, Texture } from 'three' // Import specific types from 'three'
import * as THREE from 'three'

import { useAutomaticTextures } from '../../../hooks/useAutomaticTextures'
import useGenericWall from '../hooks'
import { IWallProps } from './type'
import { getWallArgsAndPosition } from './util'
/**
 * 配置给定纹理映射的纹理。
 *
 * @param {Record<string, Texture>} textureMap - 需要配置的纹理映射。
 * @return {void} 此函数没有返回值。
 */
const configureTextures = (textureMap: Record<string, Texture>): void => {
  Object.values(textureMap).forEach((texture: Texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(64, 8)
  })
}

/**
 * 渲染具有给定属性的墙组件。
 * @param {IWallProps} props - 墙组件的属性。
 * @return {ReactNode} 渲染的墙组件。
 */
const Wall: FC<IWallProps> = (props) => {
  const { generateMeshes } = useGenericWall()
  const { width, height, wallTexturePathMap = {} } = props
  const wallArgsAndPositions = useMemo(() => getWallArgsAndPosition({ width, height }), [width, height])
  const { textureMap, geometryRef } = useAutomaticTextures<BoxGeometry>(wallTexturePathMap, configureTextures)

  return <group>{generateMeshes(wallArgsAndPositions, textureMap, geometryRef)}</group>
}

export default memo(Wall)
