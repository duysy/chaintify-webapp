import { Box, Stack, Typography } from "@mui/material";
import { useMusicPlayer } from "../../contexts/useMusicPlayer";
import Image from "next/image";
import styles from "./MusicPlayer.module.css";
import AudioPlayer from "../AudioPlayer";

export default function Player() {
  const { hidden, listSongMusicPlayer, indexSongPlaylist, playerRef, onPlay, onPause, onClickPrevious, onClickNext, onEnded } = useMusicPlayer();
  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        left: 0,
        zIndex: 1000,
        display: hidden && "none",
        height: "13%",
      }}
    >
      <AudioPlayer
        audioRefPlayer={playerRef}
        src={listSongMusicPlayer[indexSongPlaylist]?.path || ""}
        onPlay={onPlay}
        onPause={onPause}
        onClickNext={onClickNext}
        onClickPrevious={onClickPrevious}
        onEnded={onEnded}
        autoPlay={false}
        leftElement={
          <Box sx={{ color: "text.primary", height: "100%" }}>
            <Stack direction={"row"} spacing={1} height="100%">
              <Box
                height="100%"
                style={{
                  minHeight: "100%",
                  aspectRatio: "1 / 1",
                  padding: "0.5rem",
                }}
              >
                <Image
                  src={listSongMusicPlayer[indexSongPlaylist]?.cover || ""}
                  alt="Image play music"
                  width={100}
                  height={100}
                  layout="responsive"
                  style={{
                    borderRadius: "8px",
                    objectFit: "cover",
                    aspectRatio: "1 / 1",
                  }}
                />
              </Box>
              <Box display={"flex"} flexDirection="column" justifyContent={"space-around"}>
                <Typography variant="subtitle1">{listSongMusicPlayer[indexSongPlaylist]?.name || ""}</Typography>
                <Typography variant="subtitle2">
                  {(listSongMusicPlayer[indexSongPlaylist]?.artist &&
                    listSongMusicPlayer[indexSongPlaylist]?.artist.map((item: any) => item.name).join("|")) ||
                    "Không có ca sỹ"}
                </Typography>
              </Box>
            </Stack>
          </Box>
        }
      />
    </Box>
  );
}
