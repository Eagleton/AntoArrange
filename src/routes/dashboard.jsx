import {Dashboard,LibraryBooks, BubbleChart, Notifications} from "@material-ui/icons";

import ScheduleContainer from "../pages/Schedule/Schedule";
import rooms from "../pages/rooms";
import arranging from "../pages/arranging";
import notifications from "../pages/notifications";

const dashboardRoutes = [
    {
      path: "/dashboard",
      sidebarName: "课表",
      navbarName: "当前用户：管理员01",
      icon: Dashboard,
      component: ScheduleContainer
    },

    {
        path: "/RoomResource",
        sidebarName: "教室资源管理",
        navbarName: "当前用户：管理员01",
        icon: LibraryBooks,
        component: rooms
    },
    {
        path: "/icons",
        sidebarName: "排课",
        navbarName: "当前用户：管理员01",
        icon: BubbleChart,
        component: arranging
    },
    {
        path: "/notifications",
        sidebarName: "受理请求",
        navbarName: "当前用户：管理员01",
        icon: Notifications,
        component: notifications
    },
    { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
