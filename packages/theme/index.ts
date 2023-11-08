import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00d1d1'
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    text: {
      primary: '#e1e1e3',
      secondary: '#9ba0a6'
    },
    background: {
      paper: '#131519'
    }
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#e1e1e3'
        }
      }
    }
  }
})
