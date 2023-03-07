import { Grid, Stack, Container, Box, Typography, Icon } from "@mui/material";
import SideBar from "../../components/SideBar";
import TopNav from "../../components/TopNav";
import { useMusicPlayer } from "../../contexts/useMusicPlayer";
import MusicPlay from "../../components/MusicPlayer";
import Logo from "../../components/Logo";
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
      <Grid
        item
        xs={0}
        md={2}
        sx={{
          height: "10%",
          bgcolor: "background.default",
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        <Logo />
      </Grid>
      <Grid item xs={12} md={10} sx={{ height: "10%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <TopNav />
      </Grid>
      <Grid
        item
        xs={2}
        md={2}
        sx={{
          height: `calc(100% - ${hidden ? 10 : heightValue + 10}%)`,
          // display: {
          //   xs: "none",
          //   md: "block",
          // },
        }}
      >
        <SideBar />
      </Grid>
      <Grid item xs = {10} md={10} sx={{ height: `calc(100% - ${hidden ? 10 : heightValue + 10}%)`, overflowY: "scroll", padding: "0 2rem" }}>
        <Box>{props.children}</Box>
      </Grid>
      <Grid item xs={12} sx={{ height: `${heightValue}%`, display: hidden && "none" }}>
        <MusicPlay />
      </Grid>
    </Grid>
  );
}
