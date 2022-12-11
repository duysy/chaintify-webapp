import React from "react";
import styles from "./TopNav.module.css";

import { useState } from "react";
import { Grid, Box, TextField, Paper, Stack, Button } from "@mui/material";
import { NavigateBefore, NavigateNext, CloudUpload, Search, Settings, Person, DarkMode, LightMode } from "@mui/icons-material";
import PopupMusicUpLoad from "../popups/PopupMusicUpLoad";
import { useThemeContext } from "../../contexts/useTheme";
import { useRouter } from "next/router";
import { useEther } from "../../contexts/useEther";
import { Typography } from "@material-ui/core";

export default function TopNav() {
  const router = useRouter();
  const [openPopUp, setOpenPopUp] = useState(false);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const { autoSetMode, mode } = useThemeContext();
  const { onClickConnect, onClickDisconnect, currentAccount, balance } = useEther();
  const handelUploadClick = () => {
    setOpenPopUp(true);
  };
  const handelClickNavigateBefore = () => {
    router.back();
  };
  const handelNavigateNext = () => {
    router.back();
  };
  const handelIconThemeModeClick = () => {
    autoSetMode();
  };
  const handelIconSettingClick = () => {
    router.push("/profile");
  };
  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={1}>
          <Stack direction="row" alignItems="center" justifyContent="space-evenly" sx={{ height: "100%" }}>
            <NavigateBefore
              sx={{
                color: "text.primary",
                fontSize: "2rem",
              }}
              onClick={handelClickNavigateBefore}
            />
            <NavigateNext
              sx={{
                color: "text.primary",
                fontSize: "2rem",
              }}
              onClick={handelNavigateNext}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-evenly"
            sx={{
              height: "100%",
              position: "relative",
            }}
          >
            <TextField
              type="text"
              className={styles.searchInput}
              placeholder="Tìm kiếm bài hát, nghệ sỹ..."
              sx={{
                "& fieldset": { border: "none" },
                bgcolor: "background.paper",
                borderRadius: "100px",
              }}
            />
            <Search
              sx={{
                top: 0,
                left: 10,
                position: "absolute",
                height: "100%",
                color: "text.primary",
              }}
            />
          </Stack>
        </Grid>
        <Grid item xs={5}>
          <Stack direction="row" alignItems="center" justifyContent="end" sx={{ height: "100%" }}>
            <Box className={styles.circle} sx={{ bgcolor: "background.default" }} onClick={handelIconThemeModeClick}>
              {mode == "dark" ? (
                <DarkMode
                  sx={{
                    color: "text.primary",
                  }}
                />
              ) : (
                <LightMode
                  sx={{
                    color: "text.primary",
                  }}
                />
              )}
            </Box>

            <Box className={styles.circle} sx={{ bgcolor: "background.default" }} onClick={handelUploadClick}>
              <CloudUpload
                sx={{
                  color: "text.primary",
                }}
              />
            </Box>
            <Box className={styles.circle} sx={{ bgcolor: "background.default" }}>
              <Settings
                sx={{
                  color: "text.primary",
                }}
                onClick={handelIconSettingClick}
              />
            </Box>
            <Box className={styles.circle} sx={{ bgcolor: "background.default", position: "relative" }}>
              <Person
                sx={{
                  color: "text.primary",
                }}
                onClick={() => setShowProfileCard(!showProfileCard)}
              />
              {showProfileCard && (
                <Box sx={{ position: "absolute", top: "100%", right: 0, width: "30rem", height: "10rem", zIndex: 1000, bgcolor: "text.primary" }}>
                  <Stack>
                    <Typography>{currentAccount}</Typography>
                    <Typography>{balance}</Typography>
                    <Button onClick={onClickDisconnect}>DisConnect wallet</Button>
                    <Button onClick={onClickConnect}>Connect wallet</Button>
                  </Stack>
                </Box>
              )}
            </Box>
          </Stack>
        </Grid>
      </Grid>
      <PopupMusicUpLoad open={openPopUp} setOpen={setOpenPopUp} />
    </>
  );
}
