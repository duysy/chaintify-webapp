import React from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Stack, Button, Box, Typography } from "@mui/material";
export default function WalletConnect() {
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { address, connector, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <Box sx={{ padding: "1rem" }}>
        <Typography color={"text.primary"}>{address}</Typography>
        <Typography color={"text.primary"}>Connected to {connector?.name}</Typography>
        <Button onClick={() => disconnect()}>Disconnect</Button>
      </Box>
    );
  }
  return (
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
  );
}
