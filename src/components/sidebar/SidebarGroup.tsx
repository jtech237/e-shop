import React from "react"
import { MenuItem } from "./routes"

const SidebarGroup = ({
    name,
    children,
}: {name: string, children: React.ReactNode}) => {
    return (
        
        <>
        <div>
        <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
          {name}
        </h3>

        <ul className="mb-6 flex flex-col gap-1.5">
          {children}
        </ul>
      </div></>
    )
}

export default SidebarGroup