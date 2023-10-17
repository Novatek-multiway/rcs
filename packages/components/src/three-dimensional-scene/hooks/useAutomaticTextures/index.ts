import { useTexture } from '@react-three/drei'
import { MeshStandardMaterialProps } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import type { BufferGeometry, Texture } from 'three'
import * as THREE from 'three'

export type TTextureKeys = keyof Pick<
  MeshStandardMaterialProps,
  'map' | 'aoMap' | 'normalMap' | 'roughnessMap' | 'metalnessMap' | 'displacementMap' | 'alphaMap'
>
export type TTexturePathMap = Partial<Record<TTextureKeys, string>>
export type TTextureMap = Partial<Record<TTextureKeys, Texture>>

export const useAutomaticTextures = <G extends BufferGeometry>(
  texturePathMap: TTexturePathMap,
  onLoad?: (textureMap: TTextureMap) => void
) => {
  const textureMap = useTexture(texturePathMap)
  onLoad?.(textureMap)

  const geometryRef = useRef<G>(null!)
  useEffect(() => {
    if (textureMap['aoMap']) {
      const geometry = geometryRef.current
      geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(geometry.attributes.uv.array, 2))
    }
  }, [])

  return {
    geometryRef,
    textureMap
  }
}
