import React, { useEffect, useState } from "react";
import styles from "./MusicList.module.css";

import { Favorite, MoreVert } from "@mui/icons-material";
import { Stack, Typography, Checkbox, Table, TableCell, TableBody, TableRow, TableHead, TableContainer, Button } from "@mui/material";

import Image from "next/image";
import { useRouter } from "next/navigation";
import PopupAddMusicToPlaylist from "../popups/PopupAddMusicToPlaylist";

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
                Bài Hát
              </TableCell>
              <TableCell align="center" className={styles.tableRow} sx={{ minWidth: "10rem" }}>
                Album
              </TableCell>
              <TableCell align="center" className={styles.tableRow} style={{ maxWidth: "5rem" }}>
                Thời gian
              </TableCell>
              <TableCell align="center" className={styles.tableRow} sx={{ maxWidth: "5rem" }}>
                Yêu thích
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
                      <Typography>Thêm vào playlist</Typography>
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
                      <Image
                        src={row.cover}
                        alt="Picture of the author"
                        width={50}
                        height={50}
                        style={{
                          borderRadius: "8px",
                          border: "none",
                          objectFit: "cover"
                        }}
                      />
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
                          {row.artist ? row.artist : "artist"}
                        </Typography>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell align="center" className={styles.tableRow}>
                    {row.album ? row.album : "album"}
                  </TableCell>
                  <TableCell align="center" className={styles.tableRow}>
                    {row.time ? row.time : "time"}
                  </TableCell>
                  <TableCell align="center" className={styles.tableRow}>
                    <Favorite />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  if (list && list.length > 0) return <MainContent />;
  return <Typography sx={{ color: "text.primary" }}>Ops, Không có bài hát nào</Typography>;
}
