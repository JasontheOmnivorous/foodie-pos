import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
}

const CreateMenuCategory = ({ open, setOpen }: Props) => {
  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <DialogTitle>
        <Typography sx={{ fontWeight: "bold" }}>
          Create menu category
        </Typography>
      </DialogTitle>
      <DialogContent>
        <TextField sx={{ mt: 2 }} label="Name" variant="outlined" autoFocus />
      </DialogContent>
      <DialogActions>
        <Button variant="contained">create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateMenuCategory;
