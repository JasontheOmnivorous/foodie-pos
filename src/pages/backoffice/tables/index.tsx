import CreateTable from "@/components/tables/CreateTable";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const TablesPage = () => {
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
          add new table
        </Button>
        <CreateTable open={open} setOpen={setOpen} />
      </Box>
      <h1>other stuffs...</h1>
    </Box>
  );
};

export default TablesPage;
