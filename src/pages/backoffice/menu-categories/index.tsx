import CreateMenuCategory from "@/components/menuCategories/CreateMenuCategory";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const MenuCategoriesPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const menuCategories = useAppSelector((store) => store.menuCategory.items);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          {menuCategories.map((item) => (
            <Typography key={item.id}>{item.name}</Typography>
          ))}
        </Box>
        <Button
          sx={{ height: 50 }}
          onClick={() => setOpen(true)}
          variant="contained"
        >
          add new menu category
        </Button>
        <CreateMenuCategory open={open} setOpen={setOpen} />
      </Box>
    </Box>
  );
};

export default MenuCategoriesPage;
