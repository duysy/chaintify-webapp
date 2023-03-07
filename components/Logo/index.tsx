import React from "react";
import { Box } from "@mui/material";
import { useThemeContext } from "../../contexts/useTheme";
import { useRouter } from "next/router";
export default function Logo() {
  const { mode } = useThemeContext();
  const router = useRouter();
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100%"
      onClick={() => {
        router.push("/");
      }}
    >
      {mode == "dark" ? (
        <img src="/assert/images/logo-dark.png" alt="logo" style={{ height: "65%" }} />
      ) : (
        <img src="/assert/images/logo-light.png" alt="logo" style={{ height: "65%" }} />
      )}
    </Box>
  );
}
