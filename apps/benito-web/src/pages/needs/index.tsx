import {Route, Routes} from "react-router-dom";
import ListNeeds from "./ListNeeds.tsx";
import {NeedView} from "./NeedView.tsx";


export default function Needs() {
    return (
        <Routes>
            <Route path={"/"} element={<ListNeeds/>} />

            <Route path={"/:id"} element={<NeedView/>} />
        </Routes>
    )
}
