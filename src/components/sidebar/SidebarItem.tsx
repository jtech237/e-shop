import React, { useCallback, useMemo } from "react";
import { MenuItem } from "./routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import dynamic from "next/dynamic";

interface SidebarItemProps {
  item: MenuItem;
  pageName: string;
  setPageName: (pageName: string) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = React.memo(({
  item,
  pageName,
  setPageName,
}) => {
  const pathname = usePathname();

  // Détermine si le menu est actif
  const isActive = useCallback((item: MenuItem): boolean => {
    if (item.route === pathname) return true;
    if (item.children) {
      return item.children.some((child) => isActive(child as MenuItem));
    }
    return false;
  }, [pathname]);

  const isItemActive = useMemo(() => isActive(item), [item, isActive]);

  // Gestion de l'expansion du menu : ouvert si actif ou si pageName est défini
  const isMenuOpen = isItemActive || pageName === item.label.toLowerCase();

  const handleClick = useCallback(() => {
    const updatedPageName =
      pageName !== item.label.toLowerCase() ? item.label.toLowerCase() : "";
    setPageName(updatedPageName);
  }, [pageName, item.label, setPageName]);

  const SidebarDropdown = dynamic(() => import('./SidebarDropdown'), {
    loading: () => <div>Loading....</div>
  })

  return (
    <>
      <li>
        <Link
          href={item.route}
          onClick={handleClick}
          className={clsx(
            isItemActive ? "bg-graydark dark:bg-meta-4" : "",
            "group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"
          )}
        >
          {item.icon}
          {item.label}
          {item.children && (
            <svg
              className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                isMenuOpen && "rotate-180"
              }`}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                fill=""
              />
            </svg>
          )}
        </Link>
        {item.children && (
          <div
            className={clsx(
              "translate transform overflow-hidden transition-all duration-300",
              !isMenuOpen && "hidden"
            )}
          >
            <SidebarDropdown items={item.children} />
          </div>
        )}
      </li>
    </>
  );
});
SidebarItem.displayName = 'SidebarItem'

export default SidebarItem;
