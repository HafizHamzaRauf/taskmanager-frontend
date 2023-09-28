// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2D2D38",
    },
    secondary: {
      main: "#655Ec6",
    },
    tertiary: {
      main: "#008000",
    },

    quaternary: {
      main: "#4169E1",
    },
    text: {
      primary: "#000",
      secondary: "#838998",
      tertiary: "#fff",
    },
    background: {
      default: "#22232E",
      disabled: "#f0f1f6",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    fontWeightRegular: 500,
    fontWeightBold: 700,
    fontSize: 16,
  },
});

export default theme;
