import {Route, Routes} from "react-router-dom";
import ListEntities from "./ListEntities";
import RegisterOrEditEntity from "./RegisterOrEditEntity";
import {EntityView} from "./EntityView.tsx";


export default function Organizations() {
    return (
        <Routes>
            <Route path={"/"} element={<ListEntities/>} />
            <Route path={"/register"} element={<RegisterOrEditEntity/>} />
            <Route path={"/:id"} element={<EntityView/>} />
        </Routes>
    )
}
