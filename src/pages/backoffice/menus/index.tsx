import ItemCard from "@/components/item/ItemCard";
import CreateMenu from "@/components/menus/CreateMenu";
import { useAppSelector } from "@/store/hooks";
import { RestaurantMenuSharp } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
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
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {menus.map((item) => (
            <ItemCard
              key={item.id}
              icon={<RestaurantMenuSharp sx={{ fontSize: 50 }} />}
              title={item.name}
            />
          ))}
        </Box>
        <Button
          sx={{ width: 200, height: 60 }}
          onClick={() => setOpen(true)}
          variant="contained"
        >
          add new menu
        </Button>
        <CreateMenu open={open} setOpen={setOpen} />
      </Box>
    </Box>
  );
};

export default MenusPage;
