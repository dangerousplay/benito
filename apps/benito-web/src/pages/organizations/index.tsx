import {Route, Routes} from "react-router-dom";
import ListEntities from "./ListEntities.tsx";


export default function Organizations() {
    return (
        <Routes>
            <Route path={"/"} element={<ListEntities/>} />
        </Routes>
    )
}
