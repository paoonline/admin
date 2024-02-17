import { Box } from "@mui/material";
import AuthModule from "./_modules/Auth/Auth";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height:"100%"
      }}
    >
      <AuthModule />
    </Box>
  );
}
