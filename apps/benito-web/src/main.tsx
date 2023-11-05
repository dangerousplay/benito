import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/app.tsx";

import {NextUIProvider} from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <React.StrictMode>
      <NextUIProvider>
          <App />
      </NextUIProvider>
  </React.StrictMode>
);
