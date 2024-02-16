import { Box } from "@mui/material";

function Layout({ children }: {children: React.ReactNode}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
        p: 2
      }}
    >
      {children}
    </Box>
  );
}

export default Layout
