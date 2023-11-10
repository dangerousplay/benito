import {Route, Routes} from "react-router-dom";
import ListNeeds from "./ListNeeds.tsx";


export default function Needs() {
    return (
        <Routes>
            <Route path={"/"} element={<ListNeeds/>} />
        </Routes>
    )
}
