import { ThemeProvider, createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export type AppTheme = typeof darkTheme;