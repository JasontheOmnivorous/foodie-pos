import ItemCard from "@/components/item/ItemCard";
import CreateLocation from "@/components/locations/CreateLocation";
import { useAppSelector } from "@/store/hooks";
import { LocationCity } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const TablesPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const locations = useAppSelector((store) => store.location.items);

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
            justifyContent: "flex-start",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {locations.map((item) => (
            <ItemCard
              key={item.id}
              icon={<LocationCity sx={{ fontSize: 50 }} />}
              href="/"
              title={item.name}
            />
          ))}
        </Box>
        <Button
          sx={{ width: 250, height: 60 }}
          onClick={() => setOpen(true)}
          variant="contained"
        >
          add new location
        </Button>
        <CreateLocation open={open} setOpen={setOpen} />
      </Box>
    </Box>
  );
};

export default TablesPage;
