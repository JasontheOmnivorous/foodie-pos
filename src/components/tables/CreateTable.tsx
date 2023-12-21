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

const CreateTable = ({ open, setOpen }: Props) => {
  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <DialogTitle>
        <Typography sx={{ fontWeight: "bold" }}>Create Table</Typography>
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

export default CreateTable;
