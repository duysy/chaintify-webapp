import React from "react";
import { Typography } from "@mui/material";
export default function SectionTitle(props: any) {
  return (
    <Typography
      variant="h5"
      sx={{ color: "text.primary", marginTop: "3rem", marginBottom: "1rem" }}
    >
      {props.children}
    </Typography>
  );
}
