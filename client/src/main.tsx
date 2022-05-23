import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import ToggleColorMode from "./providers/ColorModeProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ToggleColorMode>
    <App />
  </ToggleColorMode>
);
