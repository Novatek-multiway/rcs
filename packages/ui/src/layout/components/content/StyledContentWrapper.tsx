import { Box, styled } from '@mui/material'

export const StyledContentWrapper = styled(Box)(({ theme }) => ({
  color: theme.palette?.text?.primary,
  flex: 1,
  '& .menu': {
    position: 'absolute',
    display: 'flex',
    bottom: '45px',
    width: '100%',
    justifyContent: 'center',
    gap: '60px',
    '& .menu-item': {
      position: 'relative',
      cursor: 'pointer',
      '.glowing-btn': {
        position: 'relative',
        color: 'var(--glow-color)',
        padding: theme.spacing(1, 2),
        perspective: '2em',
        border: '2px solid',
        borderRadius: theme.spacing(0.5),
        borderColor: 'var(--glow-color)',
        WebkitBoxShadow: `inset 0px 0px 0.2em 0px var(--glow-color), 0px 0px 0.2em 0px var(--glow-color)`,
        boxShadow: `inset 0px 0px 0.2em 0px var(--glow-color), 0px 0px 0.2em 0px var(--glow-color)`,
        '&:before': {
          position: 'absolute',
          content: '""',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          opacity: 0.7,
          filter: 'blur(1em)',
          transform: 'translateY(120%) rotateX(95deg) scale(1, 0.35)',
          background: 'var(--glow-color)',
          pointerEvents: 'none'
        },
        '&:after': {
          position: 'absolute',
          content: '""',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0,
          zIndex: -1,
          /* background-color: var(--glow-color); */
          /* box-shadow: 0 0 0em 0.2em var(--glow-color); */
          transition: 'opacity 100ms linear'
        },
        '&:hover': {
          '&:before': {
            filter: 'blur(1.5em)',
            opacity: 1
          },
          '&:after': {
            opacity: 1
          }
        }
      }
    }
  }
}))
