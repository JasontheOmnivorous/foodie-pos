import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteMenu, updateMenu } from "@/store/slices/menuSlice";
import { UpdateMenuOptions } from "@/types/menu";
import DeleteWarningBox from "@/utils/DeleteWarningBox";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const UpdateMenu = () => {
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

  const [updateMenuData, setUpdateMenuData] = useState<UpdateMenuOptions>({
    id: Number(router.query.id),
    name: selectedMenu?.name,
    price: selectedMenu?.price,
    menuCategoryIds: [],
  });
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (relatedMenuCategoryIds)
      setUpdateMenuData({
        ...updateMenuData,
        menuCategoryIds: relatedMenuCategoryIds,
      });
  }, [menuCategoryMenus]);

  const handleOnChange = (event: SelectChangeEvent<number[]>) => {
    const selectedIds = event.target.value as number[];
    setUpdateMenuData({ ...updateMenuData, menuCategoryIds: selectedIds });
  };

  const handleUpdateMenu = () => {
    dispatch(updateMenu(updateMenuData));
  };

  const handleDeleteMenu = () => {
    const id = Number(router.query.id);
    dispatch(deleteMenu({ id }));
  };

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
      <TextField
        onChange={(evt) =>
          setUpdateMenuData({ ...updateMenuData, name: evt.target.value })
        }
        sx={{ m: 2, width: 300 }}
        defaultValue={selectedMenu.name}
      />
      <TextField
        onChange={(evt) =>
          setUpdateMenuData({
            ...updateMenuData,
            price: Number(evt.target.value),
          })
        }
        sx={{ m: 2, width: 300 }}
        defaultValue={selectedMenu.price}
      />
      <FormControl sx={{ m: 2, width: 300 }}>
        <InputLabel>Choose Menu Category</InputLabel>
        <Select
          sx={{ m: 1, width: 300 }}
          multiple
          label="Choose Menu Category"
          value={updateMenuData.menuCategoryIds}
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
            <MenuItem value={item.id} key={item.id}>
              {/* if current id of all menuCategories exists inside related menuCategoryIds, checked = true */}
              <Checkbox
                checked={updateMenuData.menuCategoryIds.includes(item.id)}
              />
              <ListItemText primary={item.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* button section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Button sx={{ m: 2 }} onClick={handleUpdateMenu} variant="contained">
          update
        </Button>
        <Button
          onClick={() => setOpen(true)}
          sx={{ m: 2 }}
          color="error"
          variant="outlined"
        >
          delete
        </Button>
      </Box>
      {/* warning dialog */}
      <DeleteWarningBox
        handleDelete={handleDeleteMenu}
        open={open}
        setOpen={setOpen}
        deleteItemType="menu"
      />
    </Box>
  );
};

export default UpdateMenu;
