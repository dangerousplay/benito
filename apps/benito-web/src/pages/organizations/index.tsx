import {Route, Routes} from "react-router-dom";
import ListEntities from "./ListEntities";
import RegisterOrEditEntity from "./RegisterOrEditEntity";


export default function Organizations() {
    return (
        <Routes>
            <Route path={"/"} element={<ListEntities/>} />
            <Route path={"/register"} element={<RegisterOrEditEntity/>} />
        </Routes>
    )
}
