import React, { useRef, useEffect, useState } from "react";
import styles from "./AudioPlayer.module.css";
import { Grid, Box, Typography, Slider } from "@mui/material";
import { Shuffle, SkipPrevious, Pause, PlayArrow, SkipNext, SettingsBackupRestore, VolumeUp } from "@mui/icons-material";

type TProps = {
  onPlay: () => void | null;
  onPause: () => void | null;
  onEnded: () => void | null;
  onClickNext: () => void | null;
  onClickPrevious: () => void | null;
  src: string | (() => string);
  autoPlay: Boolean | null;
  audioRefPlayer: any;
  leftElement: any;
};
export default function Player(props: TProps) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(props.audioRefPlayer.current);

  const [toggle, setToggle] = useState<Boolean>(false);
  const [autoPlay, setAutoPlay] = useState<Boolean | null>(props.autoPlay);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [percentVolume, setPercentVolume] = useState(50);
  const [percentCurrentTime, setPercentCurrentTime] = useState(0);

  const handelPause = () => {
    if (!audio) return;
    audio?.pause();
  };
  const handelPlay = () => {
    if (!audio) return;
    if (audio.src == "") return;
    audio?.play();
  };

  const handelClickNext = props.onClickNext;
  const handelClickPrevious = props.onClickPrevious;
  const onPlay = (event: any) => {
    setToggle(true);
    if (props.onPlay) {
      props.onPlay();
    }
  };
  const onPause = (event: any) => {
    if (props.onPause) {
      props.onPause();
    }
    setToggle(false);
  };
  const onEnded = (event: any) => {
    // console.log("onEnd");
    if (props.onEnded) {
      props.onEnded();
    }
  };
  const updateDuration = () => {
    if (!audio) return;
    const duration_ = audio.duration;
    setDuration(duration_);
  };

  const onTimeupdate = (event: any) => {
    if (!audio) return;
    const currentTime_ = audio.currentTime;
    const duration_ = audio.duration;
    let percent_ = ((currentTime_ / duration_) * 100).toFixed(1);

    if (currentTime_) setCurrentTime(+currentTime_);
    if (percent_) setPercentCurrentTime(+percent_);

    // console.log("currentTime : ", currentTime);
    // console.log("duration : ", duration);
    // console.log("percent : ", percent_);
  };
  const onPlaying = (event: any) => {
    // console.log("onPlaying");
    setToggle(true);
  };

  const onLoadstart = (event: any) => {
    // console.log("onLoadstart");
    setTimeout(() => {
      updateDuration();
    }, 1000);
    // setToggle(false);
  };
  const onSeeked = (event: any) => {
    // console.log("seeked");
    updateDuration();
  };

  const handleProgressChange = (e: any, value: any) => {
    if (!audio) return;
    e.preventDefault();

    const currentTime_ = ((value * audio.duration) / 100).toFixed(0);
    if (currentTime_) audio.currentTime = +currentTime_;
  };

  useEffect(() => {
    if (!audio) return;
    audio.autoplay = autoPlay as boolean;
  }, [audio]);

  useEffect(() => {
    if (!audio) return;
    if (props.src) audio.src = props.src as string;
    audio.src = props.src as string;
  }, [props.src]);

  useEffect(() => {
    if (!audio) return;
    audio.volume = percentVolume / 100;
    // console.log("volume : ", audio.volume);
  }, [percentVolume]);

  // useEffect(() => {
  //   if (!audio) return;
  //   const present_ = (audio?.currentTime / audio?.duration) * 100;
  //   setPercentCurrentTime(present_);
  // }, [audio?.currentTime]);

  useEffect(() => {
    if (!audio) return;
    audio.addEventListener("seeked", onSeeked);
    audio.addEventListener("loadstart", onLoadstart);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("timeupdate", onTimeupdate);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("seeked", onSeeked);
      audio.removeEventListener("loadstart", onLoadstart);
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("timeupdate", onTimeupdate);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, [audio]);

  return (
    <Box
      style={{
        border: "1px solid rgba(60, 60, 60, 0.1)",
        backdropFilter: "blur(25px)",
      }}
      sx={{
        display: "fex",
        flexDirection: "row",
        width: "100%",
        bgcolor: "background.paper",
        height: "100%",
      }}
    >
      <div>
        <audio controls ref={props.audioRefPlayer}>
          <source src="" type="audio/mpeg" />
        </audio>
      </div>
      <Box sx={{ width: "20%", height: "100%" }}>{props.leftElement}</Box>
      <Box sx={{ width: "60%", height: "100%" }} display="flex" flexDirection="column">
        <Box display="flex" justifyContent="space-around" alignItems="center" sx={{ width: "100%", height: "60%", padding: "0 30%" }}>
          <Shuffle sx={{ color: "text.primary" }} />
          <SkipPrevious sx={{ color: "text.primary" }} onClick={handelClickPrevious} />
          {toggle ? (
            <Pause
              onClick={handelPause}
              sx={{
                fontSize: "3rem",
                color: "text.primary",
              }}
            />
          ) : (
            <PlayArrow
              onClick={handelPlay}
              sx={{
                fontSize: "3rem",
                color: "text.primary",
              }}
            />
          )}
          <SkipNext sx={{ color: "text.primary" }} onClick={handelClickNext} />
          <SettingsBackupRestore sx={{ color: "text.primary" }} />
        </Box>
        <Box display="flex" justifyContent="space-evenly" alignItems="center" sx={{ width: "100%", height: "40%", padding: "0 3rem" }}>
          <Typography sx={{ color: "text.primary" }}>{(currentTime / 60).toFixed(2)}</Typography>
          <Slider sx={{ width: "80%" }} value={percentCurrentTime} aria-label="Volume" valueLabelDisplay="auto" onChange={handleProgressChange} />
          <Typography sx={{ color: "text.primary" }}>{(duration / 60).toFixed(2)}</Typography>
        </Box>
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center" sx={{ width: "20%", height: "100%" }}>
        <VolumeUp
          sx={{
            color: "text.primary",
          }}
        />
        <Slider
          size="small"
          sx={{ width: "60%" }}
          defaultValue={50}
          aria-label="Volume"
          valueLabelDisplay="auto"
          onChange={(e: any) => {
            // console.log(e.target.value);
            const percentVolume_ = e.target.value;
            setPercentVolume(percentVolume_);
          }}
        />
      </Box>
    </Box>
  );
}
