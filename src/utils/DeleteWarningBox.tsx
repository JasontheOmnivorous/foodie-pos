import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

interface Props {
  deleteItemType: string;
  open: boolean;
  setOpen: (val: boolean) => void;
  handleDelete: () => void;
}

const DeleteWarningBox = ({
  deleteItemType,
  open,
  setOpen,
  handleDelete,
}: Props) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Confirm delete</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete this {deleteItemType}?
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Button
          onClick={() => setOpen(false)}
          variant="outlined"
          color="secondary"
        >
          cancel
        </Button>
        <Button onClick={handleDelete} variant="outlined" color="error">
          confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteWarningBox;
