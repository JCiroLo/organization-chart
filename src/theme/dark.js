import { createTheme } from "@mui/material";

const { palette } = createTheme();

export default {
  mode: "dark",
  primary: {
    main: "#175CFF",
  },
  secondary: {
    main: "#646470",
  },
  background: {
    default: "#091631",
    foreground: "#14213D",
    paper: "#14213D",
  },
  text: {
    primary: "#EDF2F4",
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
      main: "#d1d1d1",
    },
    name: "customGray",
  }),
  customBlack: palette.augmentColor({
    color: {
      main: "#FFFFFF",
    },
    name: "customBlack",
  }),
};
