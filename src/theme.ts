import { blue, grey, green } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: blue.A200,
      // red: "#c43838",
      // darkRed: "#ff2608",
      // liveRed: "#d90000",
      // lightBlack: "#1e1e1e",
      // blue: "#223263",
      // blue2: "#004aad",
      // sparkBlue: "#338aff",
      // sparkBlue2: "#2847a1",
      // lightBlue: "#cce2ff",
      // darkBlue: "#0065ed",
      // borderBlue: "#cce2ff",
      // grey: "#747474",
      // grey2: "#d6d6d6",
      // grey3: "#e3e3e3",
      // red: "#c33838"
    },
    // background: {
    //   default: grey[100],
    // },
  },
  // shape: {
  //   borderRadius: 5,
  // },
  // typography: {
  //   h6: {
  //     // fontSize: (theme) => theme.typography.pxToRem(18.57),
  //     fontWeight: 500,
  //     letterSpacing: "0.02em",
  //   },
  // },
  components: {
    // MuiTypography: {
    //   defaultProps: {
    //     component: "div",
    //   },
    // },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
  // typography: {
  //   htmlFontSize: 20
  // }
});

export default theme;
