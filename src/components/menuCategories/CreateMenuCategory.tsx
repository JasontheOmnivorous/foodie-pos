import { useAppDispatch } from "@/store/hooks";
import { createMenuCategory } from "@/store/slices/menuCategorySlice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
}

const CreateMenuCategory = ({ open, setOpen }: Props) => {
  const [name, setName] = useState<string>("");
  const dispatch = useAppDispatch();

  const onSuccess = () => {
    setOpen(false);
  };

  const handleCreateMenuCategory = () => {
    dispatch(
      createMenuCategory({
        name,
        // get selected locationId from localStorage to create new menuCategory
        locationId: Number(localStorage.getItem("selectedLocationId")),
        onSuccess,
      })
    );
  };

  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <DialogTitle>
        <Typography sx={{ fontWeight: "bold" }}>
          Create menu category
        </Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          onChange={(evt) => setName(evt.target.value)}
          sx={{ mt: 2, width: "300px" }}
          label="Name"
          variant="outlined"
          autoFocus
        />
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "space-around" }}>
        <Button onClick={() => setOpen(false)} variant="contained">
          cancel
        </Button>
        <Button
          onClick={handleCreateMenuCategory}
          disabled={!name}
          variant="contained"
        >
          create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateMenuCategory;
