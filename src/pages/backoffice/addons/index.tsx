import CreateAddon from "@/components/addons/CreateAddon";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const AddonsPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const addons = useAppSelector((store) => store.addon.items);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          {addons.map((item) => (
            <Typography key={item.id}>{item.name}</Typography>
          ))}
        </Box>
        <Button onClick={() => setOpen(true)} variant="contained">
          add new addon
        </Button>
        <CreateAddon open={open} setOpen={setOpen} />
      </Box>
    </Box>
  );
};

export default AddonsPage;
