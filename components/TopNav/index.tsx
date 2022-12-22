import React from "react";
import styles from "./TopNav.module.css";

import { useState } from "react";
import { Grid, Box, TextField, ClickAwayListener, Stack, Button, Typography } from "@mui/material";
import { NavigateBefore, NavigateNext, CloudUpload, Search, Settings, Person, DarkMode, LightMode } from "@mui/icons-material";
import PopupMusicUpLoad from "../popups/PopupMusicUpLoad";
import { useThemeContext } from "../../contexts/useTheme";
import { useRouter } from "next/router";
import { useEther } from "../../contexts/useEther";
import { search } from "../../apis/public/extends/search/get_search";

import WalletConnect from "./components/WalletConnect";

export default function TopNav() {
  const router = useRouter();
  const [openPopUp, setOpenPopUp] = useState(false);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const { autoSetMode, mode } = useThemeContext();
  const [searchValue, setSearchValue] = useState<any>();
  const [focus, setFocus] = useState<any>(false);
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
          <ClickAwayListener
            onClickAway={() => {
              setFocus(false);
            }}
          >
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
                name="search"
                type="text"
                autoComplete="off"
                className={styles.searchInput}
                placeholder="Tìm kiếm bài hát, nghệ sỹ..."
                sx={{
                  "& fieldset": { border: "none" },
                  bgcolor: "background.paper",
                  borderRadius: "100px",
                }}
                onChange={async (event) => {
                  const text = event.target.value;
                  if (!text) return;
                  const value = await search(text);
                  setSearchValue(value);
                }}
                onFocus={() => {
                  setFocus(true);
                }}
              />
              {focus && (
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    top: "100%",
                    bgcolor: "#ffffff",
                    color: "#000000",
                    width: "100%",
                    borderRadius: "8px",
                    zIndex: 3000,
                    padding: "1rem",
                    minHeight: "10rem",
                  }}
                >
                  <Box>
                    <Stack>
                      {searchValue?.song?.map((item: any) => {
                        return (
                          <Typography
                            key={item.id}
                            onClick={() => {
                              setFocus(false);
                              router.push(`/album/${item.album_id}`);
                            }}
                            sx={{
                              "&:hover": {
                                background: "#e6e6e6e6",
                              },
                            }}
                          >
                            Song : {item?.name}
                          </Typography>
                        );
                      })}
                    </Stack>

                    <Stack>
                      {searchValue?.artist?.map((item: any) => {
                        return (
                          <Typography
                            key={item.id}
                            onClick={() => {
                              setFocus(false);
                              router.push(`/artist/${item.id}`);
                            }}
                            sx={{
                              "&:hover": {
                                background: "#e6e6e6e6",
                              },
                            }}
                          >
                            Artist : {item?.name}
                          </Typography>
                        );
                      })}
                    </Stack>

                    <Stack>
                      {searchValue?.album?.map((item: any) => {
                        return (
                          <Typography
                            key={item.id}
                            onClick={() => {
                              setFocus(false);
                              router.push(`/album/${item.id}`);
                            }}
                            sx={{
                              "&:hover": {
                                background: "#e6e6e6e6",
                              },
                            }}
                          >
                            Album : {item?.name}
                          </Typography>
                        );
                      })}
                    </Stack>
                  </Box>
                </Box>
              )}
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
          </ClickAwayListener>
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
            <ClickAwayListener onClickAway={() => setShowProfileCard(false)}>
              <Box className={styles.circle} sx={{ bgcolor: "background.default", position: "relative" }}>
                <Person
                  sx={{
                    color: "text.primary",
                  }}
                  onClick={() => setShowProfileCard(true)}
                />
                {showProfileCard && (
                  <Box sx={{ position: "absolute", top: "100%", right: 0, width: "30rem", height: "10rem", zIndex: 1000, bgcolor: "text.primary" }}>
                    <Stack>
                      <WalletConnect />
                    </Stack>
                  </Box>
                )}
              </Box>
            </ClickAwayListener>
          </Stack>
        </Grid>
      </Grid>
      <PopupMusicUpLoad open={openPopUp} setOpen={setOpenPopUp} />
    </>
  );
}
