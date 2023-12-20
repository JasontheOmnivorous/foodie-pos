import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import Sidebar from "../sidebar";
import Topbar from "../topbar";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const { data: session } = useSession();

  return (
    <Box>
      <Topbar />
      <Box sx={{ display: "flex" }}>
        {session ? <Sidebar /> : <span />}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            m: 5,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
