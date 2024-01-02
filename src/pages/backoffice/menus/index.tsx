import CreateMenu from "@/components/menus/CreateMenu";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const MenusPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const menus = useAppSelector((store) => store.menu.items);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          {menus.map((item) => (
            <Typography key={item.id}>{item.name}</Typography>
          ))}
        </Box>
        <Button onClick={() => setOpen(true)} variant="contained">
          add new menu
        </Button>
        <CreateMenu open={open} setOpen={setOpen} />
      </Box>
    </Box>
  );
};

export default MenusPage;
