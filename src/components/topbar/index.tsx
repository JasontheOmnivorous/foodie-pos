import Logo from "@/assets/logo.png";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";

const Topbar = () => {
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
      <Box sx={{ m: 2 }}>
        <Image style={{ width: 100, height: 100 }} src={Logo} alt="Logo" />
      </Box>
      <Box>
        <Typography color={"secondary"} variant="h5">
          Foodie POS
        </Typography>
      </Box>
      <Box sx={{ m: 2 }}>
        <Button variant="contained">sign out</Button>
      </Box>
    </Box>
  );
};

export default Topbar;
