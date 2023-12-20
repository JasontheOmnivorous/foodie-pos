import { Box, Button, Typography } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  // if not logged in, get the user logged in
  if (!session) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Typography sx={{ m: 2 }} variant="h5">
          Not signed in.
        </Typography>
        <Button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          variant="contained"
        >
          Sign in
        </Button>
      </Box>
    );
    // if logged in, push the user to order page
  } else {
    router.push("/backoffice/orders");
  }
}
