import { Alert, Snackbar } from "@mui/material";

export default function Error({ open, onClose }: { open: boolean, onClose(): void  }) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={6000}
      onClose={() => onClose()}
    >
      <Alert
        onClose={() => onClose()}
        severity="error"
        variant="filled"
        sx={{ width: "100%" }}
      >
        This is a error
      </Alert>
    </Snackbar>
  );
}
