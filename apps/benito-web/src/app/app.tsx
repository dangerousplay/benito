
import {NavigationBar} from "../pages/base";
import {LandingPage} from "../pages/LandingPage.tsx";
import {Route, Routes, useNavigate} from "react-router-dom";
import {NextUIProvider} from "@nextui-org/system";
import {HomePage} from "../pages/HomePage.tsx";


function App() {
  const navigate = useNavigate();

  return (
      <NextUIProvider navigate={navigate}>
        <main>
          <NavigationBar />

          <Routes>
              <Route path="/" Component={LandingPage}/>
              <Route path="/home" Component={HomePage}/>
              <Route path="/home/*" Component={HomePage}/>
          </Routes>
        </main>
      </NextUIProvider>
  );
}

export default App;
