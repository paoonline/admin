import { Alert, Snackbar } from "@mui/material";

export default function Success({ open, onClose }: { open: boolean, onClose(): void  }) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={6000}
      onClose={() => onClose()}
    >
      <Alert
        onClose={() => onClose()}
        severity="success"
        variant="filled"
        sx={{ width: "100%" }}
      >
        This is a success
      </Alert>
    </Snackbar>
  );
}
