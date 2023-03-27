import React from "react";
import { Box, Stack, Button, Typography } from "@mui/material";
import Image from "next/image";
import imageLogin from "../../public/assert/images/login.jpg";

import Wrap from "../wrap";
export default function LoginView() {
  return (
    <Wrap>
      <Box height={"80vh"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
        <Image src={imageLogin} width={300} height={300} alt="Picture of login" />
        <Typography color="text.primary">Please connect your wallet now.</Typography>
      </Box>
    </Wrap>
  );
}
