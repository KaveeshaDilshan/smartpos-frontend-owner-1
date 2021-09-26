import { createTheme } from '@material-ui/core';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4B76D1',
      light: '#E8EFFF',
      Dark: '#3B76A2',
    },
    secondary: {
      main: '#E43066',
      light: '#E8EFFF',
      darkLight: '#FB66AC',
    },
  },
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The default props to change
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'capitalize',
        fontSize: '0.85rem',
      },
    },
    MuiIconButton: {
      root: {
        '&:hover': {
          backgroundColor: '#fff',
        },
      },
    },
  },
});

export default theme;
