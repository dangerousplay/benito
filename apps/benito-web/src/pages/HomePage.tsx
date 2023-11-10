import Sidebar from "./home/SideBar.tsx";

import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/breadcrumbs";
import {Link, Route, Routes, useLocation} from "react-router-dom";
import SquareSVG from "../assets/icons/Squares.tsx";
import React from "react";
import Organizations from "./organizations";
import Needs from "./needs";


const routes = [
    {
        path: "/needs",
        icon: <SquareSVG />,
        title: "Necessidades",
        main: () => <Needs />
    },
    {
        path: "/",
        icon: <SquareSVG />,
        title: "Necessidades",
        main: () =>
            <h2>Necessidades</h2>
    },
    {
        path: "/organizations",
        icon: <SquareSVG />,
        title: "Organizações",
        main: () => <Organizations />
    },
];


const BreadCrumbs = () => {
    const location = useLocation();
    const paths = location.pathname.split('/').filter(v => v);

    return (
      <section className={"m-10 ml-72"}>
        <Breadcrumbs itemClasses={{
            item: ["text-xl data-[current=true]:font-bold"]
        }}>
            {paths.map((v, i) => {
                return (
                  <BreadcrumbItem key={v}>
                    <Link to={paths.slice(1, i+1).join('/')}>{v}</Link>
                  </BreadcrumbItem>
                )
            })}
        </Breadcrumbs>
      </section>
    )
};

type PageContainerProps = React.PropsWithChildren<{}>;

const PageContainer = ({ children }: PageContainerProps) => {
    return (
        <section className={"ml-10"}>
            {children}
        </section>
    )
};

export const HomePage = () => {
  return (
      <div>
          <BreadCrumbs />
          <div className={"m-10 flex flex-auto"}>
              <Sidebar routes={routes} routePrefix="/home" />

              <Routes>
                  {routes.map((route) => (
                      // You can render a <Route> in as many places
                      // as you want in your app. It will render along
                      // with any other <Route>s that also match the URL.
                      // So, a sidebar or breadcrumbs or anything else
                      // that requires you to render multiple things
                      // in multiple places at the same URL is nothing
                      // more than multiple <Route>s.
                      <Route
                          key={route.path}
                          path={route.path}
                          element={
                              <PageContainer> {route.main()} </PageContainer>
                          }
                      />
                  ))}
              </Routes>
          </div>
      </div>
  )
}