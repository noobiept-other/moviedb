import { Home } from "../pages/Home";
import { Info } from "../pages/Info";

export const ROUTES = {
    root: "Home",
    routes: [
        {
            path: "home",
            component: Home,
        },
        {
            path: "info/:movieID",
            component: Info,
        },
    ],
};
