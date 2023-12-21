import CreateMenu from "@/components/menus/CreateMenu";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const MenusPage = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button onClick={() => setOpen(true)} variant="contained">
          add new menu
        </Button>
        <CreateMenu open={open} setOpen={setOpen} />
      </Box>
      <h1>other stuffs...</h1>
    </Box>
  );
};

export default MenusPage;
