import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#00d1d1'
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    text: {
      primary: '#f1f1f1',
      secondary: '#9ba0a6'
    }
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#000'
        }
      }
    }
  }
})
