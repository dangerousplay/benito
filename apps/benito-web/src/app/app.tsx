
import {NavigationBar} from "../pages/base";
import {Home} from "../pages/Home.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";


function App() {
  return (
    <main>
      <NavigationBar />
      <BrowserRouter>
          <Routes>
              <Route path="/" Component={Home}/>
          </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
