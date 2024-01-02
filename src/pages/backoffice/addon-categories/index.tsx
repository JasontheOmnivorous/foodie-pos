import CreateAddonCategory from "@/components/addonCategories/CreateAddonCategory";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const AddonCategoriesPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const addonCategories = useAppSelector((store) => store.addonCategory.items);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          {addonCategories.map((item) => (
            <Typography key={item.id}>{item.name}</Typography>
          ))}
        </Box>
        <Button onClick={() => setOpen(true)} variant="contained">
          add new addon category
        </Button>
        <CreateAddonCategory open={open} setOpen={setOpen} />
      </Box>
    </Box>
  );
};

export default AddonCategoriesPage;
