import { createContext, JSXElementConstructor, ReactChild, ReactElement, useContext, useState } from "react";
import { ThemeProvider, createTheme, ThemeOptions } from "@mui/material/styles";
import { deepOrange, grey } from "@mui/material/colors";
export type ThemeContextValue = {
  mode: string;
  setMode: any;
  autoSetMode: () => void;
};
export const ThemeContext = createContext<ThemeContextValue>({} as ThemeContextValue);

type Props = {
  children: string | number | ReactElement<any, string | JSXElementConstructor<any>>;
};

type TMode = "dark" | "light";

const ThemeContextProvider = ({ children }: Props) => {
  const [mode, setMode] = useState<TMode>("dark");
  const dartMode = createTheme({
    palette: {
      mode: mode,
      ...{
        primary: grey,
        divider: grey[700],
        background: {
          default: "#1A1E1F",
          paper: "#212121",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "FFFFFF",
        },
      },
    },
  });

  const lightMode = createTheme({
    palette: {
      mode: mode,
      ...{
        primary: grey,
        divider: grey[700],
        background: {
          default: "#FFFFFF",
          paper: "#f5f5f5",
        },
        text: {
          primary: "#1A1E1F",
          secondary: "1A1E1F",
        },
      },
    },
  });
  const autoSetMode = () => {
    if (mode === "dark") {
      setMode("light");
    }
    if (mode === "light") {
      setMode("dark");
    }
  };
  const getMode = (mode: string) => {
    if (mode === "dark") {
      return dartMode;
    }
    if (mode === "light") {
      return lightMode;
    }
  };
  return (
    <ThemeContext.Provider
      value={{
        mode,
        setMode,
        autoSetMode,
      }}
    >
      <ThemeProvider theme={getMode(mode) as ThemeOptions}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
export const useThemeContext = () => useContext(ThemeContext);
