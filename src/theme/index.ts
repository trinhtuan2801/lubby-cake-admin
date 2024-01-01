import { createTheme } from '@mui/material';

const theme = createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        fontWeight: 'inherit',
      },
    },
  },
});

export default theme;
