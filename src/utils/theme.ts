import { createTheme } from "@mui/material";
import { green, grey, pink, purple } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: pink[200],
    },
    secondary: {
      main: purple[500],
    },
    info: {
      main: grey[200],
    },
    success: {
      main: green[400],
    },
  },
});
