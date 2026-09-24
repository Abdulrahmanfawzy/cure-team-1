import { Outlet } from "react-router-dom";

import SidebarInPC from "../components/SidebarInPC";
import SidebarInMobile from "../components/SidebarInMobile";

function ProfileLayout() {
  return (
    <div className="main_container my-16">
      <div className="grid grid-cols-12 items-start min-h-screen gap-6">
        {/* Sidebar In PC */}
        <div className="hidden lg:col-span-4 lg:block">
          <SidebarInPC />
        </div>

        <div className="col-span-12 lg:col-span-8">
          {/*  Sidebar In Mobile */}
          <SidebarInMobile />
          {/* Content */}
          <div className="mt-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileLayout;
