import Logo from "@/assets/logo.png";
import { Box, Button, Typography } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Topbar = () => {
  const { data: session } = useSession();

  return (
    <Box
      sx={{
        width: "100vw",
        height: 100,
        boxShadow: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ m: 5 }}>
        <Image style={{ width: 100, height: 100 }} src={Logo} alt="Logo" />
      </Box>
      <Box>
        <Typography color={"secondary"} variant="h5">
          Foodie POS
        </Typography>
      </Box>
      {/* only show signout button when logged in */}
      {session ? (
        <Box sx={{ m: 5 }}>
          <Button
            onClick={() => signOut({ callbackUrl: "/" })}
            variant="contained"
          >
            sign out
          </Button>
        </Box>
      ) : (
        <span /> // flexbox trick to maintain space-between
      )}
    </Box>
  );
};

export default Topbar;
