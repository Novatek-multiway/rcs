import { Search } from '@mui/icons-material'
import { useVoerkaI18n } from '@voerkai18n/react'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useCallback, useState } from 'react'
import { Button, Divider, IconButton, InputBase, MenuItem, Paper, Select } from 'ui'

import { useTwoDMapStore } from '../../store'
import { SearchAreaWrapper } from './style'

interface ISearchAreaProps {}

const SearchArea: FC<PropsWithChildren<ISearchAreaProps>> = () => {
  const { idPointMap, idLineMap, setLastCenter, setSearchAreaVisible } = useTwoDMapStore((state) => ({
    idPointMap: state.idPointMap,
    idLineMap: state.idLineMap,
    setLastCenter: state.setLastCenter,
    setSearchAreaVisible: state.setSearchAreaVisible
  }))
  const { t } = useVoerkaI18n()
  const [type, setType] = useState<'point' | 'line'>('point')
  const [id, setId] = useState<number>()
  const handleSearch = useCallback(() => {
    if (!id) return
    if (type === 'point') {
      const point = idPointMap.get(id)
      point && setLastCenter(point)
    } else if (type === 'line') {
      const line = idLineMap.get(id)
      const point = line?.points?.slice(0, 2)
      point && setLastCenter({ x: point[0], y: point[1] })
    }
  }, [type, id, idPointMap, idLineMap, setLastCenter])
  return (
    <SearchAreaWrapper>
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: 320,
          border: '1px solid #3d3b3b'
        }}
      >
        <Select
          size="small"
          sx={{
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent !important'
            }
          }}
          value={type}
          onChange={(e) => {
            setType(e.target.value as typeof type)
          }}
        >
          <MenuItem value={'point'}>{t('点')}</MenuItem>
          <MenuItem value={'line'}>{t('线')}</MenuItem>
        </Select>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <InputBase
          type="number"
          sx={{ ml: 1, flex: 1 }}
          placeholder={t('请输入id')}
          inputProps={{ color: 'white' }}
          value={id}
          onChange={(e) => {
            setId(parseInt(e.target.value))
          }}
        />

        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
          <Search />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <Button size="small" color="warning" onClick={() => setSearchAreaVisible(false)}>
          {t('关闭')}
        </Button>
      </Paper>
    </SearchAreaWrapper>
  )
}

export default memo(SearchArea)
