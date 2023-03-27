import React, { useEffect, useState } from "react";
import styles from "./MusicList.module.css";

import { FavoriteBorder } from "@mui/icons-material";
import { Stack, Typography, Checkbox, Table, TableCell, TableBody, TableRow, TableHead, TableContainer, Button, Box } from "@mui/material";

import Image from "next/image";
import { useRouter } from "next/navigation";
import PopupAddMusicToPlaylist from "../popups/PopupAddMusicToPlaylist";
import { useMusicPlayer } from "../../contexts/useMusicPlayer";
import { TMusicList } from "./types";
type TProps = {
  list: TMusicList[] | null;
};

const data: TMusicList[] = [
  {
    id: 1,
    checkBoxStatus: false,
    cover: "https://picsum.photos/100/100",
    name: "Con mua ngang qua",
    artist: "Sơn tung MTP",
    album: "string",
    time: "string",
    favorite: true,
  },
  {
    id: 2,
    checkBoxStatus: false,
    cover: "https://picsum.photos/100/100",
    name: "string",
    artist: "string",
    album: "string",
    time: "string",
    favorite: true,
  },
  {
    id: 3,
    checkBoxStatus: false,
    cover: "https://picsum.photos/100/100",
    name: "string",
    artist: "string",
    album: "string",
    time: "string",
    favorite: true,
  },
];
export default function MusicList(props: TProps) {
  const list: TMusicList[] = props.list ? props.list : [];
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [showPlayListAdd, setShowPlayListAdd] = useState(false);
  const [rows, setRows] = useState<TMusicList[] | null>(null);
  const [allCheck, setAllCheck] = useState(false);
  const [listSong, setListSong] = useState<number[]>([]);

  const { listSongMusicPlayer, indexSongPlaylist, isPlay } = useMusicPlayer();
  useEffect(() => {
    if (!list || list.length == 0) return;
    setRows(list);
  }, [list]);

  const handelCheckBoxStateChange = (id: string, state: Boolean) => {
    // console.log(id, state);
    if (!rows) return;
    let rows_ = rows.map((item) => {
      if (item.id === id) {
        return { ...item, ...{ checkBoxStatus: state } };
      }
      return item;
    });
    setRows(rows_);
    // console.log(rows_);
  };
  const setDefaultFalseCheckBox = () => {
    if (!rows) return;
    let rows_ = rows.map((item) => {
      return { ...item, ...{ checkBoxStatus: false } };
    });
    setRows(rows_);
    // console.log(rows_);
  };
  const setDefaultCheckBox = () => {
    setAllCheck(!allCheck);
  };

  useEffect(() => {
    if (!rows) return;
    let rows_ = rows.map((item) => {
      return { ...item, ...{ checkBoxStatus: allCheck } };
    });
    setRows(rows_);
  }, [allCheck]);

  useEffect(() => {
    const checkOpenPlayListAdd = () => {
      if (!rows) return;
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].checkBoxStatus === true) {
          setShowPlayListAdd(true);
          return;
        }
        setShowPlayListAdd(false);
      }
    };

    checkOpenPlayListAdd();
  }, [rows]);

  useEffect(() => {
    if (!rows) return;
    const listSong_: number[] = [];
    for (let i = 0; i < rows.length; i++) {
      if (!rows[i].id) continue;
      if (rows[i].checkBoxStatus === true) {
        listSong_.push(+rows[i].id);
        // console.log(rows[i].id);
      }
    }
    setListSong([...listSong_] as number[]);
  }, [rows]);

  useEffect(() => {
    // console.log("listSong : ", listSong);
    if (open == false) {
      setDefaultFalseCheckBox();
      setAllCheck(false);
    }
  }, [open]);

  const MainContent = () => {
    return (
      <TableContainer>
        <Table
          sx={{ width: "100%" }}
          style={{
            borderCollapse: "separate",
            borderSpacing: "0 1rem",
          }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center" className={styles.tableRow} sx={{ width: "1rem" }}>
                #
              </TableCell>
              <TableCell align="center" className={styles.tableRow} sx={{ minWidth: "15rem" }}>
                Song
              </TableCell>
              <TableCell align="center" className={styles.tableRow} sx={{ minWidth: "10rem" }}>
                Album
              </TableCell>
              <TableCell align="center" className={styles.tableRow} style={{ maxWidth: "5rem" }}>
                Time
              </TableCell>
              <TableCell align="center" className={styles.tableRow} sx={{ maxWidth: "5rem" }}>
                Favorite
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showPlayListAdd && (
              <TableRow>
                <TableCell colSpan={100}>
                  <Stack direction="row">
                    <Checkbox onClick={setDefaultCheckBox} checked={allCheck} />
                    <Button
                      onClick={() => {
                        setOpen(true);
                      }}
                    >
                      <Typography>Add to playlist</Typography>
                    </Button>
                    <PopupAddMusicToPlaylist open={open} setOpen={setOpen} listSong={listSong} />
                  </Stack>
                </TableCell>
              </TableRow>
            )}

            {rows &&
              rows.map((row: any) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    backdropFilter: "blur(5px)",
                    borderRadius: "15px",
                    bgcolor: "background.paper",
                  }}
                >
                  <TableCell align="center" className={styles.tableRow}>
                    <Checkbox
                      checked={row.checkBoxStatus}
                      onClick={(event: any) => {
                        handelCheckBoxStateChange(row.id, event?.target?.checked);
                      }}
                    />
                  </TableCell>
                  <TableCell align="center" className={styles.tableRow}>
                    <Stack direction="row" spacing={2}>
                      <Box width={50} height={50} sx={{ position: "relative" }}>
                        <Image
                          src={row.cover}
                          alt="Picture of music"
                          width={50}
                          height={50}
                          style={{
                            borderRadius: "8px",
                            border: "none",
                            objectFit: "cover",
                          }}
                        />
                        {listSongMusicPlayer[indexSongPlaylist]?.id == row.id && isPlay && (
                          <Box
                            sx={{ position: "absolute", top: 0, left: 0, borderRadius: "8px", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            width={50}
                            height={50}
                          >
                            <Image src={"/assert/images/icon-playing.gif"} alt="Picture of music" width={20} height={20} />
                          </Box>
                        )}
                      </Box>

                      <Stack direction="column" justifyContent="start">
                        <Typography
                          sx={{
                            fontStyle: "normal",
                            fontWeight: "600",
                            fontSize: "1rem",
                            color: "text.primary",
                            textAlign: "left",
                          }}
                        >
                          {row.name}
                        </Typography>
                        <Typography
                          sx={{
                            fontStyle: "normal",
                            fontWeight: "200",
                            fontSize: "0.8rem",
                            color: "text.primary",
                            textAlign: "left",
                          }}
                        >
                          {row.artist ? row.artist : "Unknown artist"}
                        </Typography>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell align="center" className={styles.tableRow}>
                    {row.album ? row.album : "Unknown album"}
                  </TableCell>
                  <TableCell align="center" className={styles.tableRow}>
                    {row.time ? (row?.time / 60).toFixed(2) : "time"}
                  </TableCell>
                  <TableCell align="center" className={styles.tableRow}>
                    <FavoriteBorder />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  if (list && list.length > 0) return <MainContent />;
  return <Typography sx={{ color: "text.primary" }}>Oops, there are no songs</Typography>;
}
