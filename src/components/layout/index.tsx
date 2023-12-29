import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAppData } from "@/store/slices/appSlice";
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
  const dispatch = useAppDispatch();
  const initiated = useAppSelector((store) => store.app.init);

  // call api only when logged in
  useEffect(() => {
    // if the user is logged in and data haven't been fetched once, fetch the data
    if (session && !initiated) {
      dispatch(fetchAppData({ onSuccess })); // if session is populated, fetch data
    }
  }, [session]);

  const onSuccess = () => {
    alert(`Welcome, ${session?.user?.name}`);
  };

  return (
    <Box>
      <Topbar />
      <Box sx={{ display: "flex" }}>
        {session ? <Sidebar /> : <span />}
        <Box
          sx={{
            m: 5,
            width: "100%",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
