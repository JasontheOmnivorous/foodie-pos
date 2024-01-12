import { useAppSelector } from "@/store/hooks";
import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

const UpdateMenu = () => {
  const [updateMenu, setUpdateMenu] = useState();
  const router = useRouter();
  const menus = useAppSelector((store) => store.menu.items);
  const selectedMenu = menus.find(
    (item) => item.id === Number(router.query.id)
  );
  const menuCategoryMenus = useAppSelector(
    (store) => store.menuCategoryMenu.items
  );
  const relatedMenuCategoryMenus = menuCategoryMenus.filter(
    (item) => item.menuId === selectedMenu?.id
  );
  const relatedMenuCategoryIds = relatedMenuCategoryMenus.map(
    (item) => item.menuCategoryId
  );
  const menuCategories = useAppSelector((store) => store.menuCategory.items);

  const handleOnChange = () => {};

  if (!selectedMenu) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextField sx={{ m: 2, width: 300 }} defaultValue={selectedMenu.name} />
      <TextField sx={{ m: 2, width: 300 }} defaultValue={selectedMenu.price} />
      <FormControl sx={{ m: 2, width: 300 }}>
        <InputLabel>Choose Menu Category</InputLabel>
        <Select
          sx={{ m: 1, width: 300 }}
          multiple
          label="choose menu category"
          value={relatedMenuCategoryIds}
          onChange={handleOnChange}
          // selected menu category ids will be put internally inside this arg to render as default text of select
          renderValue={(selectedIds) => {
            return selectedIds
              .map((selectedId) => {
                const menuCategory = menuCategories.find(
                  (item) => item.id === selectedId
                );
                return menuCategory?.name; // render selected menuCategory's name
              })
              .join(", "); // join all selected menuCategory names with comma
          }}
          // MenuProps is to control the size of select's options
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
            <MenuItem key={item.id}>
              {/* if current id of all menuCategories exists inside related menuCategoryIds, checked = true */}
              <Checkbox checked={relatedMenuCategoryIds.includes(item.id)} />
              <ListItemText primary={item.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default UpdateMenu;
