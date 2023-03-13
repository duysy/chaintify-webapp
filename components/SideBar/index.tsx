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
      href: "/",
      login: false,
    },
    {
      iconElement: <AirlineStops />,
      title: "Nhạc mới",
      href: "/newsong",
      login: false,
    },
    {
      iconElement: <Bookmark />,
      title: "Nghệ sĩ",
      href: "/artist",
      login: false,
    },
  ];
  const listMenuBottom = [
    {
      iconElement: <LibraryMusic />,
      title: "Mint NFT",
      href: "/nft",
      login: true,
    },
    {
      iconElement: <Album />,
      title: "Collection",
      href: "/nft/collection",
      login: false,
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
                "&:hover": {
                  bgcolor: "background.paper",
                  borderLeft: "2px solid #E8AC24",
                  opacity: 1,
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
                  display: { xs: "none", md: "block" },
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
      alignItems="center"
      sx={{
        bgcolor: "background.paper",
        borderRadius: "5px",
        height: "100%",
        padding: "1rem 0",
      }}
    >
      <Box sx={{ flexGrow: 3, width: "100%" }}>
        <ListLink list={listMenuTop} />
      </Box>
      <Box
        sx={{
          margin: "1rem 0",
          height: "1px",
          width: "80%",
          bgcolor: "text.primary",
        }}
      />
      <Box sx={{ flexGrow: 3, width: "100%" }}>
        <ListLink list={listMenuBottom} />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ height: "3rem", width: "100%", flexGrow: 1 }}
        onClick={() => {
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
                display: { xs: "none", md: "block" },
              }}
            >
              Tạo playlist mới
            </Typography>
          </>
        </Button>
      </Box>
      <PopupCreatePlaylist open={open} setOpen={setOpen} />
    </Box>
  );
}
