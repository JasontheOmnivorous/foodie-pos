import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
}

const CreateAddon = ({ open, setOpen }: Props) => {
  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <DialogTitle>
        <Typography sx={{ fontWeight: "bold" }}>Create Addon</Typography>
      </DialogTitle>
      <DialogContent>
        <h1>form here...</h1>
      </DialogContent>
      <DialogActions>
        <Button variant="contained">create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateAddon;
