import React from "react";
import { Stack, Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./CarouselPlayBasic.module.css";
type TProps = {
  list: TCarouselPlayBasic[];
};
export type TCarouselPlayBasic = {
  name: string;
  cover: string;
  clickHrefTo: string;
};
export default function CarouselPlayBasic(props: TProps) {
  const list: TCarouselPlayBasic[] = props.list;
  const router = useRouter();
  const MainContent = () => {
    return (
      <Box display={"flex"} flexWrap={"wrap"} alignItems="flex-start">
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
                router.push(item?.clickHrefTo as string);
              }}
            >
              <Box position="relative" className={styles.card}>
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
