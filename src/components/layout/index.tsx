import { config } from "@/utils/config";
import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";
import Sidebar from "../sidebar";
import Topbar from "../topbar";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const { data: session } = useSession();
  console.log("session: ", session);

  // call api only when logged in
  useEffect(() => {
    if (session) fetchData(); // if session is populated, fetch data
  }, [session]);

  const fetchData = async () => {
    const response = await fetch(`${config.apiBaseUrl}/app`);
    const dataFromServer = await response.json();
    console.log("data from server: ", dataFromServer);
  };

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
