import { Box, Button, Typography } from "@mui/material";
import { signIn } from "next-auth/react";

const SignInPage = () => {
  return (
    <Box>
      <Button
        variant="contained"
        onClick={() => signIn("google", { callbackUrl: "/" })} // first arg is choosing which provider and second one is for redirecting
      >
        Sign in
      </Button>
      <Typography>Custom signin page.</Typography>
    </Box>
  );
};

export default SignInPage;
