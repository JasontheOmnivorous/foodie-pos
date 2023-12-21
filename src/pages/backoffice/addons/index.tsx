import CreateAddon from "@/components/addons/CreateAddon";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const AddonsPage = () => {
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
          add new addon
        </Button>
        <CreateAddon open={open} setOpen={setOpen} />
      </Box>
      <h1>other stuffs...</h1>
    </Box>
  );
};

export default AddonsPage;
