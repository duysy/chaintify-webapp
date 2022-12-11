import { Box, Stack, Button, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
import { useMusicPlayer } from "../../contexts/useMusicPlayer";
import styles from "./SideBar.module.css";
import PopupCreatePlaylist from "../popups/PopupCreatePlaylist";
import { LibraryMusic, Album, AirlineStops, Bookmark, Add } from "@mui/icons-material";
import { useAuth } from "../../contexts/useAuth";
export default function SideBar() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const { isLogin } = useAuth();
  const listMenuTop = [
    {
      iconElement: <LibraryMusic />,
      title: "Cá Nhân",
      href: "/mymusic",
      login: true,
    },
    {
      iconElement: <Album />,
      title: "Khám Phá",
      href: "/home",
      login: false,
    },
    {
      iconElement: <AirlineStops />,
      title: "Trending",
      href: "/mymusic",
      login: false,
    },
    {
      iconElement: <Bookmark />,
      title: "Theo Dõi",
      href: "/artist",
      login: false,
    },
  ];
  const listMenuBottom = [
    {
      iconElement: <LibraryMusic />,
      title: "Mint NFT",
      href: "/nft",
    },
    {
      iconElement: <Album />,
      title: "Collection",
      href: "/nft/collection",
    },
    {
      iconElement: <AirlineStops />,
      title: "Nhạc mới",
      href: "/mymusic",
    },
    {
      iconElement: <Bookmark />,
      title: "Theo Dõi",
      href: "/artist",
    },
  ];
  const ListLink = (props: any) => {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-around"
        sx={{
          height: "100%",
          boxSizing: "box-sizing",
          padding: "0",
        }}
      >
        {props.list.map((item: any, index: any) => {
          return (
            <Box
              className={styles.SideBar_link}
              key={item?.title}
              sx={{
                color: "text.primary",
                minWidth: "10rem",
                "&:hover": {
                  bgcolor: "background.paper",
                  borderLeft: "2px solid #E8AC24",
                },
              }}
              onClick={() => {
                if (item.login == true) {
                  if (isLogin == true) {
                    router.push(item?.href);
                  } else {
                    router.push("/login");
                  }
                } else {
                  router.push(item?.href);
                }
              }}
            >
              {item?.iconElement}
              <Typography
                variant="subtitle1"
                sx={{
                  marginLeft: "0.5rem",
                  display: { xs: "none", sm: "block" },
                  fontWeight: "500",
                }}
              >
                {item?.title}
              </Typography>
            </Box>
          );
        })}
      </Box>
    );
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-around"
      sx={{
        bgcolor: "background.default",
        borderRadius: "20px",
        height: "100%",
        padding: "1rem 0",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <ListLink list={listMenuTop} />
      </Box>
      <hr
        style={{
          margin: "1rem",
        }}
      />
      <Box sx={{ flexGrow: 1 }}>
        <ListLink list={listMenuBottom} />
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ height: "3rem", width: "100%" }}
        onClick={() => {
          console.log("Create Playlist");
          setOpen(true);
        }}
      >
        <Button
          sx={{
            width: "80%",
            background: "#E8AC24",
            borderRadius: "15px",
            height: "2.5rem",
            color: "text.primary",
          }}
        >
          <>
            <Add />
            <Typography
              sx={{
                textTransform: "none",
                display: { xs: "none", sm: "block" },
              }}
            >
              Tạo playlist mới
            </Typography>
          </>
        </Button>
      </Box>
      <>
        <PopupCreatePlaylist open={open} setOpen={setOpen} />
      </>
    </Box>
  );
}
