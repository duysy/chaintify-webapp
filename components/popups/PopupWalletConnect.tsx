import React, { useState, useEffect, useRef } from "react";
import { Dialog, Typography, Button, Box, Stack, Link } from "@mui/material";
import { useAccount, useConnect, useDisconnect } from "wagmi";

type Props = {
  open: boolean;
  setOpen: (state: boolean) => void;
};
export default function PopupWalletConnect(props: Props) {
  const handleClosePopUp = () => props.setOpen(false);
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { address, connector, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <Dialog onClose={handleClosePopUp} open={props.open} sx={{ zIndex: 2000 }}>
      <Box
        sx={{
          position: "relative",
          width: { xs: "80vw", md: "500px" },
          height: "auto",
          bgcolor: "background.default",
          boxShadow: 24,
          p: 3,
        }}
      >
        {isConnected ? (
          <Box sx={{ padding: "1rem" }}>
            <Typography color={"text.primary"} sx={{ wordBreak: "break-word" }}>
              {address}
            </Typography>
            <Typography color={"text.primary"}>Connected to {connector?.name}</Typography>
            <Box textAlign="center">
              <Button onClick={() => disconnect()}>Disconnect</Button>
            </Box>
          </Box>
        ) : (
          <Stack display="flex" flexDirection="column" spacing={2} sx={{ padding: "1rem" }}>
            {connectors.map((connector) => (
              <Button key={connector.id} onClick={() => connect({ connector })}>
                {connector.name}
                {!connector.ready && " (unsupported)"}
                {isLoading && connector.id === pendingConnector?.id && " (connecting)"}
              </Button>
            ))}
            {error && (
              <Typography sx={{ textAlign: "center" }} color="red">
                {error.message}
              </Typography>
            )}
          </Stack>
        )}
      </Box>
    </Dialog>
  );
}
