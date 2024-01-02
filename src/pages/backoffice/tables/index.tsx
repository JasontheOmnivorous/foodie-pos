import CreateTable from "@/components/tables/CreateTable";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const TablesPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const tables = useAppSelector((store) => store.table.items);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          {tables.map((item) => (
            <Typography key={item.id}>{item.name}</Typography>
          ))}
        </Box>
        <Button onClick={() => setOpen(true)} variant="contained">
          add new table
        </Button>
        <CreateTable open={open} setOpen={setOpen} />
      </Box>
    </Box>
  );
};

export default TablesPage;
