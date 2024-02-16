"use client";
import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useRouter } from 'next/navigation';

export default function Auth() {
  const { push } = useRouter();

  const handleAuth = () => {
    push('/home')
  }

  return (
    <Box flexDirection={"column"}>
      <Box>
        <TextField id="outlined-basic" label="User name" variant="outlined" />
      </Box>

      <Box sx={{ mt: 2 }}>
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
        />
      </Box>

      <Button sx={{ mt: 2 }} onClick={handleAuth}>Login</Button>
    </Box>
  );
}
