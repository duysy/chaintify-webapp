import React from "react";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { FilterDrama } from "@mui/icons-material";

export default function UploadTab() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <FilterDrama
        sx={{
          fontSize: "20rem",
          color: "text.primary",
        }}
      />
      <Typography
        variant="h6"
        sx={{
          color: "text.primary",
        }}
      >
        Bạn chưa có bào nào trong thư viện
      </Typography>
    </Box>
  );
}
