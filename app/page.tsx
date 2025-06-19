import { Stack } from "@mui/material";
import Info from "./components/Info";
import Details from "./components/Details";

export default function Home() {
  return (
    <Stack>
      <Info />
      <Details />
    </Stack>
  );
}
