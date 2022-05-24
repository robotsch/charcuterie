import { createContext, useState, useMemo } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function ToggleColorMode(props: any) {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#5C3FA2",
          },
          secondary: {
            main: "#2589BD",
          },
          warning: {
            main: "#FF8906",
          },
          divider: "#403F4C",
          error: {
            main: "#CA054D",
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
