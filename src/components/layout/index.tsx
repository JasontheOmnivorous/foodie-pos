import { Box } from "@mui/material";
import { ReactNode } from "react";
import Topbar from "../topbar";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <Box>
      <Topbar />
      <Box>{children}</Box>
    </Box>
  );
};

export default Layout;
