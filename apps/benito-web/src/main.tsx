import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/app.tsx";

import {BrowserRouter} from "react-router-dom";

export const Root = () => {
    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <React.StrictMode>
            <BrowserRouter>
               <App />
            </BrowserRouter>
        </React.StrictMode>
   )
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Root />
);
