import TextButtons from "../../components/TextButtons";
import { Grid, Stack, Container, Box, Typography } from "@mui/material";
import SideBar from "../../components/SideBar";
import TopNav from "../../components/TopNav";
import Slide from "../../components/Slide";
import Image from "next/image";
import MusicPlayerContextProvider, { useMusicPlayer } from "../../contexts/useMusicPlayer";
import MusicPlay from "../../components/MusicPlayer";
export default function Wrap(props: any) {
  const { hidden } = useMusicPlayer();
  const heightValue = 13;
  return (
    <Grid
      container
      spacing={0}
      rowSpacing={0}
      sx={{
        bgcolor: "background.default",
        height: "100vh",
        width: "100%",
      }}
    >
      <Grid item xs={2} sx={{ height: "10%", bgcolor: "background.default" }}>
        <Box display="flex" alignItems="center" justifyContent="center" width="100%" height="100%">
          <Typography
            variant="h4"
            sx={{
              color: "text.primary",
              fontWeight: "1000",
            }}
          >
            Chaintify
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={10} sx={{ height: "10%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <TopNav />
      </Grid>
      <Grid item xs={2} sx={{ height: `calc(100% - ${hidden ? 10 : heightValue + 10}%)` }}>
        <SideBar />
      </Grid>
      <Grid item xs={10} sx={{ height: `calc(100% - ${hidden ? 10 : heightValue + 10}%)`, overflowY: "scroll", padding: "0 2rem" }}>
        <Box >{props.children}</Box>
      </Grid>
      <Grid item xs={12} sx={{ height: `${heightValue}%`, display: hidden && "none" }}>
        {/* <MusicPlayerContextProvider> */}
        {/* <MusicPlay /> */}
        {/* </MusicPlayerContextProvider> */}
      </Grid>
    </Grid>
  );
}
