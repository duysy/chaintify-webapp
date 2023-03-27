import React from "react";
import { Grid, Stack, Container, Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PlayCircle, PauseCircle } from "@mui/icons-material";
import styles from "./CarouselPlayAlbum.module.css";
type TProps = {
  list: TCarouselPlayAlbum[];
};
export type TCarouselPlayAlbum = {
  name: string;
  cover: string;
  isMint: boolean;
  balance: string;
  clickHrefTo: string;
};
export default function CarouselPlayAlbum(props: TProps) {
  const list: TCarouselPlayAlbum[] = props.list;
  const router = useRouter();

  const MainContent = () => {
    return (
      <Box display="flex" flexWrap="wrap" alignItems="flex-start">
        {list.map((item: any, index: any) => {
          return (
            <Box
              key={index}
              display="flex"
              flexDirection="column"
              justifyContent="space-around"
              alignItems="center"
              sx={{
                width: 150,
                margin: "0 1rem 1.5rem 0",
              }}
              onClick={(event: any) => {
                event.stopPropagation();
                // console.log("card click");
                router.push(item?.clickHrefTo as string);
              }}
            >
              <Box position="relative" className={styles.card}>
                <Box
                  position="absolute"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    // borderRadius: "20px",
                    top: 0,
                    right: 0,
                  }}
                >
                  {item.isMint ? (
                    <Typography
                      sx={{
                        bgcolor: "#E8AC24",
                      }}
                    >
                      MINT
                    </Typography>
                  ) : (
                    <></>
                  )}
                  {item.balance ? (
                    <Typography
                      sx={{
                        bgcolor: "#E8AC24",
                      }}
                    >
                      Balance : {item.balance}
                    </Typography>
                  ) : (
                    <></>
                  )}
                </Box>
                <Image
                  src={item?.cover as string}
                  alt="Image album"
                  width={150}
                  height={150}
                  style={{
                    borderRadius: "20px",
                    objectFit: "cover",
                  }}
                  placeholder="blur"
                  blurDataURL="/assert/images/image-loading.gif"
                />
              </Box>
              <Typography
                sx={{
                  color: "text.primary",
                }}
              >
                {item.name}
              </Typography>
            </Box>
          );
        })}
      </Box>
    );
  };
  if (list && list.length > 0) return <MainContent />;
  return <Typography sx={{ color: "text.primary" }}>Oops, there is no data</Typography>;
}
