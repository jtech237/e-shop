"use client";

import { ReactNode, useState } from "react";
import Sidebar from "../sidebar";
import Header from "../header";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        <div className="flex">
        {/** <!-- Sidebar start --> */}
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        {/** <!-- Sidebar end --> */}

        {/** <!-- Content start --> */}
        <div className="relative flex flex-1 flex-col lg:ml-72.5">
          {/** <!-- Header start --> */}
          <Header sidebarIsOpen={sidebarOpen} setIsSidebarOpen={setSidebarOpen} />
          {/** <!-- Header end --> */}

          {/** <!-- Main content start --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>

          {/** <!-- Main content start --> */}
        </div>
        {/** <!-- Content end --> */}
      </div>
      </div>
    </>
  );
}
