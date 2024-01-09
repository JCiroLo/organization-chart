import { createTheme } from "@mui/material";
import dark from "./dark";
import light from "./light";

export const generateTheme = (mode) =>
  createTheme({
    palette: mode === "light" ? light : dark,
    typography: {
      fontFamily: "'Ubuntu', sans-serif",
      button: {
        textTransform: "initial",
      },
    },
    shadows: [
      "none",
      "0px 4px 16px 0px #45549229",
      "0px 2px 8px 0px #45549220",
      "0px 2px 8px 0px #2E373E44",
      "0px 4px 16px 0px #45549229",
      "0px 4px 16px 0px #45549229",
      "0px 4px 16px 0px #45549229",
      "0px 4px 16px 0px #45549229",
      "0px 4px 16px 0px #45549229",
      "0px 4px 16px 0px #45549229",
      "0px 4px 16px 0px #45549229",
      "0px 4px 16px 0px #45549229",
      "0px 4px 16px 0px #45549229",
      "0px 4px 16px 0px #45549229",
      "0px 4px 16px 0px #45549229",
      "0px 4px 16px 0px #45549229",
      "0px 4px 16px 0px #45549229",
      "0px 4px 16px 0px #45549229",
      "0px 4px 16px 0px #45549229",
      "0px 4px 16px 0px #45549229",
      "0px 4px 16px 0px #45549229",
      "0px 4px 16px 0px #45549229",
      "0px 4px 16px 0px #45549229",
      "0px 4px 16px 0px #45549229",
      "0px 4px 16px 0px #45549229",
      "0px 4px 16px 0px #45549229",
      "0px 4px 16px 0px #45549229",
      "0px 4px 16px 0px #45549229",
    ],
    shape: { borderRadius: 8 },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1400,
        xxl: 1600,
      },
    },
    components: {
      MuiDialog: {
        defaultProps: {
          sx: {
            "& .MuiModal-backdrop": {
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(2.5px)",
            },
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          SelectProps: {
            MenuProps: {
              slotProps: { paper: { elevation: 15, sx: { borderRadius: 0.5 } } },
            },
          },
          sx: {
            "& > div:not(.MuiInputBase-multiline) > fieldset": {
              borderRadius: 32,
            },
          },
        },
      },
      MuiStack: {
        defaultProps: {
          useFlexGap: true,
        },
      },
      MuiButton: {
        defaultProps: {
          variant: "contained",
          disableElevation: true,
          style: {
            borderRadius: 32,
          },
        },
        styleOverrides: {
          sizeLarge: {
            paddingInline: 24,
            paddingBlock: 12,
          },
        },
      },
      MuiLink: {
        defaultProps: {
          underline: "none",
        },
      },
      MuiIcon: {
        defaultProps: {
          baseClassName: "fal",
          fontSize: "small",
          style: {
            display: "flex",
            justifyContent: "center",
            width: "min-content",
            aspectRatio: 1,
            overflow: "visible",
          },
        },
      },
    },
  });
