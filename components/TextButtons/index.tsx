import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useThemeContext } from "../../contexts/useTheme";
export default function TextButtons() {
  const { autoSetMode, mode } = useThemeContext();
  return (
    <>
      <Button onClick={autoSetMode}>{mode}</Button>
    </>
  );
}
