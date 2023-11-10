
import {NavigationBar} from "../pages/base";
import {LandingPage} from "../pages/LandingPage.tsx";
import {Route, Routes, useNavigate} from "react-router-dom";
import {NextUIProvider} from "@nextui-org/system";

import { Provider as ZenStackHooksProvider } from 'benito-common/hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import {HomePage} from "../pages/HomePage.tsx";

const queryClient = new QueryClient();


function App() {
  const navigate = useNavigate();

  return (
      <QueryClientProvider client={queryClient}>
          <ZenStackHooksProvider value={{ endpoint: 'http://localhost:3002/api/model' }}>
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
          </ZenStackHooksProvider>
      </QueryClientProvider>
  );
}

export default App;
