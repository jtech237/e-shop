import clsx from "clsx";
import ClickOutside from "../ClickOutside";
import Link from "next/link";
import { Pacifico } from "next/font/google";
import { ArrowLeft } from "lucide-react";
import menuGroups from "./routes";
import SidebarGroup from "./SidebarGroup";
import SidebarItem from "./SidebarItem";
import { usePathname } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useCallback, useMemo } from "react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
    const pathname = usePathname()
    const [pageName,  setPageName] = useLocalStorage("selectedMenu", "dashboard")

    const toggleSidebar = useCallback(() => setIsOpen(!isOpen), [isOpen, setIsOpen])

    const menuContent = useMemo(
        () => menuGroups.map((group, groupIndex) => (
            <SidebarGroup key={groupIndex} name={group.name}>
                {group.menuItems.map((item, itemIndex) => (
                    <SidebarItem item={item} key={itemIndex} pageName={pageName} setPageName={setPageName}/>
                ))}
            </SidebarGroup>
        )),
        [pageName]
    )
  return (
    <ClickOutside onClick={() => setIsOpen(false)}>
      <aside
        className={clsx(
          "fixed left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* <!-- Sidebar header --> */}
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
          <Link href="/admin" className={pacifico.className}>
            E-SHOP
          </Link>
          <button
            className="block lg:hidden"
            onClick={toggleSidebar}
          >
            <ArrowLeft />
          </button>
        </div>

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
            {menuContent}
          </nav>
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
