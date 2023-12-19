import { Box, Button, Typography } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
      <Box>
        <Typography>Welcome, {session.user?.name}!</Typography>
        <Button onClick={() => signOut()} variant="contained">
          Sign out
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography>Not signed in.</Typography>
      <Button onClick={() => signIn()} variant="contained">
        Sign in
      </Button>
    </Box>
  );
}
