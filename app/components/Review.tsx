import { useContext } from "react";
import { DetailsContext } from "../context/Details";
import { InfoContext } from "../context/Info";
import { Box, Stack, Typography } from "@mui/material";

export default function Review() {
  const { rsvp, guest } = useContext(DetailsContext);
  const { first, last, email } = useContext(InfoContext);

  return (
    <Box display="flex" justifyContent="center">
      <Stack>
        <Stack pb={2}>
          <Typography variant="h6">Review</Typography>
        </Stack>

        <Stack spacing={2}>
          <Stack spacing={1}>
            <Typography variant="body2" fontWeight={700}>
              First Name
            </Typography>
            <Typography variant="body1">{first}</Typography>
          </Stack>

          <Stack spacing={1}>
            <Typography variant="body2" fontWeight={700}>
              Last Name
            </Typography>
            <Typography variant="body1">{last}</Typography>
          </Stack>

          <Stack spacing={1}>
            <Typography variant="body2" fontWeight={700}>
              Email
            </Typography>
            <Typography variant="body1">{email}</Typography>
          </Stack>

          <Stack spacing={1}>
            <Typography variant="body2" fontWeight={700}>
              RSVP
            </Typography>
            <Typography variant="body1">{rsvp}</Typography>
          </Stack>

          <Stack spacing={1}>
            <Typography variant="body2" fontWeight={700}>
              Guest(s)
            </Typography>
            <Typography variant="body1">{guest}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
