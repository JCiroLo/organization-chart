import { createTheme } from "@mui/material";

const { palette } = createTheme();

export default {
  primary: {
    main: "#175CFF",
  },
  secondary: {
    main: "#646470",
  },
  background: {
    default: "#F8F8F8",
    foreground: "white",
  },
  text: {
    light: "#D9D9D9",
    dark: "#B1B1B1",
  },
  success: {
    main: "#63FF60",
    contrastText: "#000000",
  },
  warning: {
    main: "#FFDC60",
    contrastText: "#000000",
  },
  error: {
    main: "#FF6060",
    contrastText: "#FFFFFF",
  },
  divider: "#B1B1B1",
  customGray: palette.augmentColor({
    color: {
      main: "#8A8A8A",
    },
    name: "customGray",
  }),
  customBlack: palette.augmentColor({
    color: {
      main: "#000000",
    },
    name: "customBlack",
  }),
};
