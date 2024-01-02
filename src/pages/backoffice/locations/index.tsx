import CreateLocation from "@/components/locations/CreateLocation";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
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
        }}
      >
        <Box>
          {locations.map((item) => (
            <Typography key={item.id}>{item.name}</Typography>
          ))}
        </Box>
        <Button onClick={() => setOpen(true)} variant="contained">
          add new location
        </Button>
        <CreateLocation open={open} setOpen={setOpen} />
      </Box>
    </Box>
  );
};

export default TablesPage;
