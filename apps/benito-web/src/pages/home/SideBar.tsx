import React from "react";
import {
    Route,
    Link, useLocation
} from "react-router-dom";


type Route = {
    path: string;
    title: string;
    icon: React.ReactElement;
    main: () => React.ReactElement;
}

type SideBarProps = {
    routes: Route[];
    routePrefix: string;
}

export default function Sidebar({ routes, routePrefix }: SideBarProps) {
    const location = useLocation();

    return (
        <ul className={"max-w-min list-none space-y-2"}>
            {routes.map(r => {
                    const routePath = routePrefix + r.path
                    const active = routePath === location.pathname;
                    const selectedClass = active ? "bg-gray-200" : "hover:bg-gray-100";

                    return (
                        <li key={r.path} className={``}>
                            <Link to={routePath}>
                                <div className={`flex flex-row gap-x-4 p-5 rounded-lg ${selectedClass}`}>
                                    {r.icon}
                                    <p>{r.title}</p>
                                </div>
                            </Link>
                        </li>
                    );
                }
            )}
        </ul>
    );
}
