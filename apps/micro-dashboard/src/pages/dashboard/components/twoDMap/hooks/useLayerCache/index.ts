import { useUpdateEffect } from 'ahooks'
import { ContainerConfig } from 'konva/lib/Container'
import { Node } from 'konva/lib/Node'
import { ElementRef, useRef } from 'react'
import { Layer } from 'react-konva'

export default function useLayerCache(
  depData?: any, // 依赖数据
  isNeedReCache = false,
  cacheConfig?: Parameters<Node<ContainerConfig>['cache']>[0],
  reCacheCallback?: () => void
) {
  cacheConfig ??= {}
  const silentLayerRef = useRef<ElementRef<typeof Layer>>(null)

  useUpdateEffect(() => {
    if (!depData) return // 依赖数据为空时，不缓存
    // 在缩放到一定程度时，重新缓存路线
    isNeedReCache &&
      setTimeout(() => {
        silentLayerRef.current?.cache(cacheConfig)
        reCacheCallback?.()
      })
  }, [depData, isNeedReCache])

  return {
    layerRef: silentLayerRef
  }
}
