import * as React from 'react'
import { forwardRef as baseForwardRef } from 'react'

import type { As, InternalForwardRefRenderFunction, PropsOf, RightJoinProps } from './types'

export function forwardRef<Component extends As, Props extends object, OmitKeys extends keyof any = never>(
  component: React.ForwardRefRenderFunction<
    any,
    RightJoinProps<PropsOf<Component>, Props> & {
      as?: As
    }
  >
) {
  return baseForwardRef(component) as InternalForwardRefRenderFunction<Component, Props, OmitKeys>
}
