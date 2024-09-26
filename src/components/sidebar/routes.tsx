import {FolderKanbanIcon, LayoutDashboardIcon } from "lucide-react";

export interface SubMenuItem {
    label: string,
    route: string
}
export interface MenuItem {
    icon: JSX.Element;
    label: string;
    route: string;
    children?: SubMenuItem[];
  }
  
export  interface MenuGroup {
    name: string;
    menuItems: MenuItem[];
  }
const menuGroups: MenuGroup[] = [
    {
      name: "MENU",
      menuItems: [
        {
          icon: (
            <LayoutDashboardIcon/>
          ),
          label: "Dashboard",
          route: "/admin",
        },
        {
          icon: (
            <FolderKanbanIcon/>
          ),
          label: "Manage",
          route: "#",
          children: [
            {label: "Categories", route: "/admin/categories"}
          ]
        },
      ],
    },
    {
      name: "OTHERS",
      menuItems: [
      ],
    },
  ];

  export default menuGroups