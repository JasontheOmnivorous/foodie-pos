import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <Box>
      <Typography>Layout's here</Typography>
      <Box>{children}</Box>
    </Box>
  );
};

export default Layout;
