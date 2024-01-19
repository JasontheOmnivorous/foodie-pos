import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createMenu } from "@/store/slices/menuSlice";
import { CreateMenuOptions } from "@/types/menu";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { MenuCategory } from "@prisma/client";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
}

const CreateMenu = ({ open, setOpen }: Props) => {
  const [newMenu, setNewMenu] = useState<CreateMenuOptions>({
    name: "",
    price: 0,
    menuCategoryIds: [],
  });
  const menuCategories = useAppSelector((store) => store.menuCategory.items);
  const dispatch = useAppDispatch();

  const handleChange = (event: SelectChangeEvent<number[]>) => {
    const selectedIds = event.target.value as number[];
    setNewMenu({ ...newMenu, menuCategoryIds: selectedIds });
  };

  const onSuccess = () => {
    setOpen(false);
  };

  const handleCreateMenu = () => {
    const { name, price, menuCategoryIds } = newMenu;
    dispatch(createMenu({ name, price, menuCategoryIds, onSuccess }));
  };

  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <DialogTitle>
        <Typography sx={{ fontWeight: "bold" }}>Create Menu</Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <FormControl sx={{ m: 2, width: 400 }}>
          <InputLabel>Menu Category</InputLabel>
          <Select
            sx={{ m: 1 }}
            multiple // this guy is required for multiple selection
            value={newMenu.menuCategoryIds}
            label="Menu Category"
            onChange={handleChange}
            // renderValue is to show selected multiple
            renderValue={(selectedMenuCategoryIds) => {
              // find matching selectedMenuCategoryIds in menuCategories array, extract their names, and join them with comma
              return selectedMenuCategoryIds
                .map((selectedMenuCategoryId) => {
                  const menuCategory = menuCategories.find(
                    (item) => item.id === selectedMenuCategoryId
                  ) as MenuCategory;
                  return menuCategory.name;
                })
                .join(", ");
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 48 * 4.5 + 8,
                  width: 250,
                },
              },
            }}
          >
            {menuCategories.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                <Checkbox checked={newMenu.menuCategoryIds.includes(item.id)} />
                <ListItemText primary={item.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          onChange={(event) =>
            setNewMenu({ ...newMenu, name: event.target.value })
          }
          sx={{ width: 400, m: 2 }}
          placeholder="Name..."
        />
        <TextField
          onChange={(event) =>
            setNewMenu({ ...newMenu, price: Number(event.target.value) })
          }
          sx={{ width: 400, m: 2 }}
          placeholder="Price..."
        />
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Button onClick={() => setOpen(false)} variant="contained">
          cancel
        </Button>
        <Button
          disabled={
            !newMenu.name || !newMenu.price || !newMenu.menuCategoryIds.length
          }
          onClick={handleCreateMenu}
          variant="contained"
        >
          create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateMenu;
