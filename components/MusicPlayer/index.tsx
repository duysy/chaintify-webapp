import { Box, Typography } from "@mui/material";
import { useMusicPlayer } from "../../contexts/useMusicPlayer";
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
          <Box sx={{ color: "text.primary", width: "30rem", padding: "0 1rem" }}>
            <Typography variant="subtitle1">{listSongMusicPlayer[indexSongPlaylist]?.name || ""}</Typography>
            <Typography variant="subtitle2">
              {(listSongMusicPlayer[indexSongPlaylist]?.artist &&
                listSongMusicPlayer[indexSongPlaylist]?.artist.map((item: any) => item.name).join("|")) ||
                "Không có ca sỹ"}
            </Typography>
          </Box>
        }
      />
    </Box>
  );
}