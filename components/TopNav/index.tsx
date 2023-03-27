import React, { useEffect } from "react";
import styles from "./TopNav.module.css";

import { useState } from "react";
import { Grid, Box, TextField, ClickAwayListener, Stack, Button, Typography } from "@mui/material";
import { NavigateBefore, NavigateNext, CloudUpload, Search, Lyrics, Person, DarkMode, LightMode } from "@mui/icons-material";
import PopupMusicUpLoad from "../popups/PopupMusicUpLoad";
import { useThemeContext } from "../../contexts/useTheme";
import { useRouter } from "next/router";
import { search } from "../../apis/public/extends/search/get_search";

import PopupWalletConnect from "../popups/PopupWalletConnect";
export default function TopNav() {
  const router = useRouter();
  const { autoSetMode, mode } = useThemeContext();
  const [openUploadPopUp, setOpenUploadPopUp] = useState(false);
  const [openWalletPopUp, setOpenWalletPopUp] = useState(false);
  const [searchValue, setSearchValue] = useState<any>();
  const [focus, setFocus] = useState<any>(false);
  const [textSearch, setTextSearch] = useState("");
  const handelUploadClick = () => {
    setOpenUploadPopUp(true);
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
  const handelOpenWalletPopUp = () => setOpenWalletPopUp(true);
  useEffect(() => {
    const search_ = async () => {
      const value = await search(textSearch);
      setSearchValue(value);
    };
    search_();
  }, [textSearch]);
  return (
    <>
      <Grid container spacing={0}>
        <Grid
          item
          xs={1}
          sx={{
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-evenly"
            sx={{
              height: "100%",
            }}
          >
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
        <Grid item xs={6} md={6}>
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
                placeholder="Search for songs, artists..."
                sx={{
                  "& fieldset": { border: "none" },
                  bgcolor: "background.paper",
                  borderRadius: "100px",
                }}
                onChange={async (event) => {
                  const text = event.target.value;
                  setTextSearch(text);
                }}
                onFocus={() => {
                  setFocus(true);
                }}
              />
              {focus && textSearch.length > 0 && (
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
                              router.push(`/album/public/${item.album_id}`);
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
        <Grid item xs={6} md={5}>
          <Stack direction="row" alignItems="center" justifyContent="end" sx={{ height: "100%" }}>
            <Box className={styles.circle} sx={{ bgcolor: "background.default" }} onClick={handelIconThemeModeClick}>
              {mode == "dark" ? (
                <DarkMode
                  sx={{
                    color: "text.secondary",
                  }}
                />
              ) : (
                <LightMode
                  sx={{
                    color: "text.secondary",
                  }}
                />
              )}
            </Box>

            <Box className={styles.circle} sx={{ bgcolor: "background.default" }} onClick={handelUploadClick}>
              <CloudUpload
                sx={{
                  color: "text.secondary",
                }}
              />
            </Box>
            <Box className={styles.circle} sx={{ bgcolor: "background.default" }}>
              <Lyrics
                sx={{
                  color: "text.secondary",
                }}
                onClick={handelIconSettingClick}
              />
            </Box>

            <Box className={styles.circle} sx={{ bgcolor: "background.default" }}>
              <Person
                sx={{
                  color: "text.secondary",
                }}
                onClick={handelOpenWalletPopUp}
              />
            </Box>
          </Stack>
        </Grid>
      </Grid>
      <PopupWalletConnect open={openWalletPopUp} setOpen={setOpenWalletPopUp} />
      <PopupMusicUpLoad open={openUploadPopUp} setOpen={setOpenUploadPopUp} />
    </>
  );
}
