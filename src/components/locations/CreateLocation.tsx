import { useAppDispatch } from "@/store/hooks";
import { createLocation } from "@/store/slices/locationSlice";
import { LocationPayload } from "@/types/location";
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

const CreateLocation = ({ open, setOpen }: Props) => {
  const [location, setLocation] = useState<LocationPayload>({
    name: "",
    address: "",
  });
  const dispatch = useAppDispatch();

  const onSuccess = () => {
    setOpen(false);
  };

  const handleCreateLocation = () => {
    const { name, address } = location;
    dispatch(createLocation({ name, address, onSuccess }));
  };

  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <DialogTitle>
        <Typography sx={{ fontWeight: "bold" }}>Create Location</Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          onChange={(evt) =>
            setLocation({ ...location, name: evt.target.value })
          }
          sx={{ width: 300, margin: 2 }}
          placeholder="Name..."
        />
        <TextField
          onChange={(evt) =>
            setLocation({ ...location, address: evt.target.value })
          }
          sx={{ width: 300, margin: 2 }}
          placeholder="Address..."
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
          onClick={handleCreateLocation}
          disabled={location.name && location.address ? false : true}
          variant="contained"
        >
          create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateLocation;
