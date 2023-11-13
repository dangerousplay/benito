import React, {ReactElement} from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/app.tsx";


import {BrowserRouter} from "react-router-dom";
import {Status, Wrapper} from "@googlemaps/react-wrapper";


const render = (status: Status): ReactElement => {
    if (status === Status.LOADING) return <h3>{status} ..</h3>;
    if (status === Status.FAILURE) return <h3>{status} ...</h3>;
    return <div>{status}</div>;
};


export const Root = () => {
    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <React.StrictMode>
            <BrowserRouter>
                <Wrapper apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} render={render}>
               <App />
                </Wrapper>
            </BrowserRouter>
        </React.StrictMode>
   )
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Root />
);
