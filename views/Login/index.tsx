import React from "react";
import { Box, Stack, Button } from "@mui/material";
import Wrap from "../wrap";
import { useEther } from "../../contexts/useEther";
export default function LoginView() {
  const { onClickConnect, onClickDisconnect, currentAccount } = useEther();
  return (
    <Wrap>
      <Stack>
        <Button onClick={onClickConnect}>Connect wallet</Button>
      </Stack>
    </Wrap>
  );
}
