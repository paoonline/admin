import { Box, CircularProgress } from "@mui/material";

export function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        p: 2,
      }}
    >
      <CircularProgress />
    </Box>
  );
}
