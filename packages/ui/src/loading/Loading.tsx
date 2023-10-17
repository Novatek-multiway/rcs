import { Backdrop, CircularProgress } from '@mui/material'
import type { FC } from 'react'
import React, { memo } from 'react'
import { useGlobalStore } from 'store'

const Loading: FC = () => {
  const { GlobalLoading, setGlobalLoading } = useGlobalStore()
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={GlobalLoading}
      onClick={() => setGlobalLoading(false)}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default memo(Loading)
