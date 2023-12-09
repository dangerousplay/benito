import React from "react";
import {
    Link, useLocation
} from "react-router-dom";


export type Submenu = {
    paths: string[];
    title: string;
}

export type Menu = {
    paths: string[];
    title: string;
    icon: React.ReactElement;
    main: () => React.ReactElement;
    submenus: Submenu[]
}

type SideBarProps = {
    menus: Menu[];
    routePrefix: string;
}

export default function Sidebar({ menus, routePrefix }: Readonly<SideBarProps>) {
    const location = useLocation();

    return (
        <ul className={"list-none space-y-2"}>
            {menus.map(r => {
                const path = r.paths[0];
                const routePath = routePrefix + path
                let active = routePath === location.pathname || location.pathname.startsWith(routePath);

                const selectedClass = active ? "bg-gray-200" : "hover:bg-gray-100";

                return (
                    <li key={path} className={``}>
                        <Link to={routePath}>
                            <div className={`flex flex-row gap-x-4 p-5 mr-8 rounded-lg ${selectedClass}`}>
                                {r.icon}
                                <p className={"xl:text-xl"}>{r.title}</p>
                            </div>
                            {r?.submenus && <div className={"ml-4 mt-3"}>
                                {r?.submenus?.map(s => {
                                    const subroutePath = `${routePath}/${s.paths[0]}`;
                                    const active = subroutePath === location.pathname;
                                    const selectedClass = active ? "bg-gray-100" : "hover:bg-gray-100";

                                    return (
                                        <div className={`rounded-lg p-2 ${selectedClass}`} key={subroutePath}>
                                            <Link to={subroutePath}>
                                                <p className={"xl:text-xl"}>{s.title}</p>
                                            </Link>
                                        </div>
                                    )
                                })}
                            </div>}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}
